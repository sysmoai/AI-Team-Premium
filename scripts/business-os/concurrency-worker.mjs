// Worker thread for the real-concurrency test: its own SQLite connection to the
// same database file, released together with the other worker by a barrier.
import { workerData, parentPort } from "node:worker_threads";
import { openSqlite } from "./sqlite-adapter.mjs";
import { createBusinessOs, grantsFrom } from "../../lib/business-os/orders.js";
import { issueSession, resolveActor } from "../../lib/business-os/identity.js";
import { fromHex } from "../../lib/business-os/crypto.js";

const { file, quoteKeyHex, sessionKeyHex, quoteId, idempotencyKey, barrier } = workerData;
const adapter = openSqlite(file, { wal: false });
const sessionKey = fromHex(sessionKeyHex);
const os = createBusinessOs({ adapter, keys: { quoteKey: fromHex(quoteKeyHex) }, synthetic: true });
const actor = await resolveActor(await issueSession(sessionKey, { subject: "syn-sales_support" }), { sessionKey, grants: grantsFrom(adapter) });
const flag = new Int32Array(barrier);
Atomics.add(flag, 0, 1);
while (Atomics.load(flag, 0) < 2) Atomics.wait(flag, 0, Atomics.load(flag, 0), 5);
try {
  const o = await os.createOrder(actor, { quoteId, idempotencyKey });
  parentPort.postMessage({ ok: true, id: o.id });
} catch (e) {
  parentPort.postMessage({ ok: false, code: e.code ?? String(e.message), message: String(e.message).slice(0, 160) });
}
adapter.close();
