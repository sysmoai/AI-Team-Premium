// scripts/business-os/sqlite-adapter.mjs — LOCAL ONLY (node:sqlite).
// Same contract as lib/business-os/d1-adapter.js, used by tests and the local
// ops demo. Never imported by the Worker or the client bundle.

import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const MIGRATIONS_DIR = resolve(ROOT, "docs/business-os/migrations");

/**
 * @param {string} file  ":memory:" or a path
 * @param {{ faults?: { failBeforeStatement?: (sql:string, index:number) => boolean } }} [opts]
 */
export function openSqlite(file = ":memory:", opts = {}) {
  const db = new DatabaseSync(file);
  db.exec("PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  // Switching journal mode is not covered by the busy handler, so only the
  // connection that creates the database does it (opts.wal); others inherit WAL.
  if (file !== ":memory:" && opts.wal !== false) db.exec("PRAGMA journal_mode = WAL;");
  const begin = async () => {
    // BEGIN IMMEDIATE waits busy_timeout; under heavy local load retry a few
    // times (bounded). D1 serialises writes itself and never needs this.
    for (let i = 0; ; i++) {
      try { db.exec("BEGIN IMMEDIATE"); return; } catch (e) {
        if (!/database is locked|SQLITE_BUSY/i.test(String(e.message)) || i >= 5) throw e;
        await new Promise((r) => setTimeout(r, 20 * (i + 1)));
      }
    }
  };
  const adapter = {
    db,
    async batch(stmts) {
      await begin();
      try {
        const out = stmts.map((s, i) => {
          if (opts.faults?.failBeforeStatement?.(s.sql, i)) throw new Error(`INJECTED_FAULT at statement ${i}`);
          const r = db.prepare(s.sql).run(...(s.params ?? []));
          return { changes: Number(r.changes) };
        });
        db.exec("COMMIT");
        return out;
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
    },
    async first(sql, params = []) {
      return db.prepare(sql).get(...params) ?? null;
    },
    async all(sql, params = []) {
      return db.prepare(sql).all(...params);
    },
    close() { db.close(); },
  };
  return adapter;
}

/** Apply migrations once each, in order, each inside its own transaction. */
export function migrate(adapter, dir = MIGRATIONS_DIR) {
  const db = adapter.db;
  db.exec("CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL)");
  const done = new Set(db.prepare("SELECT version FROM schema_migrations").all().map((r) => r.version));
  const applied = [];
  for (const f of readdirSync(dir).filter((x) => /^\d{4}_.+\.sql$/.test(x)).sort()) {
    if (done.has(f)) continue;
    const sql = readFileSync(resolve(dir, f), "utf8");
    db.exec("BEGIN IMMEDIATE");
    try {
      db.exec(sql);
      db.prepare("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)").run(f, new Date().toISOString());
      db.exec("COMMIT");
      applied.push(f);
    } catch (e) {
      db.exec("ROLLBACK");
      throw new Error(`MIGRATION_FAILED ${f}: ${e.message}`);
    }
  }
  return applied;
}

/** A fake D1 binding over node:sqlite, so lib/business-os/d1-adapter.js is exercised locally. */
export function fakeD1(sqliteAdapter) {
  const db = sqliteAdapter.db;
  const stmt = (sql, params = []) => ({
    sql, params,
    bind: (...p) => stmt(sql, p),
    first: async () => db.prepare(sql).get(...params) ?? null,
    all: async () => ({ results: db.prepare(sql).all(...params) }),
  });
  return {
    prepare: (sql) => stmt(sql),
    batch: async (stmts) => (await sqliteAdapter.batch(stmts.map((s) => ({ sql: s.sql, params: s.params })))).map((r) => ({ meta: { changes: r.changes } })),
  };
}
