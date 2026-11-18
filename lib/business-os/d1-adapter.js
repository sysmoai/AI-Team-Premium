// lib/business-os/d1-adapter.js — the persistence contract on Cloudflare D1.
//
// Contract (implemented identically by scripts/business-os/sqlite-adapter.mjs):
//   batch([{sql, params}])  atomic: all statements commit or none do
//   first(sql, params)      one row or null
//   all(sql, params)        array of rows
// D1 has no interactive transactions; `db.batch()` is an implicit transaction,
// which is why every state change in orders.js is expressed as ONE batch and the
// guards live in SQL triggers (compare-and-set), not in read-then-write code.

export function d1Adapter(db) {
  if (!db || typeof db.prepare !== "function" || typeof db.batch !== "function") throw new Error("D1_BINDING_REQUIRED");
  const bind = (sql, params = []) => db.prepare(sql).bind(...params);
  return {
    async batch(stmts) {
      const res = await db.batch(stmts.map((s) => bind(s.sql, s.params)));
      return res.map((r) => ({ changes: r?.meta?.changes ?? 0 }));
    },
    async first(sql, params) {
      return (await bind(sql, params).first()) ?? null;
    },
    async all(sql, params) {
      return (await bind(sql, params).all()).results ?? [];
    },
  };
}
