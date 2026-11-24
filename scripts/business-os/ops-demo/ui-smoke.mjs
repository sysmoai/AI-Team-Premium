// Headless click-through of the LOCAL synthetic ops UI (Playwright Chromium).
// Run: node scripts/business-os/ops-demo/ui-smoke.mjs
import { chromium } from "@playwright/test";
import { startDemo } from "./server.mjs";

const d = await startDemo({ port: 0 });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
try {
  await page.goto(`${d.url}/ops`);
  const click = async (label) => { await page.getByRole("button", { name: label }).click(); await page.waitForTimeout(150); };
  const asSubject = async (s) => { await page.selectOption("#subject", s); await click("Sign in (synthetic)"); };
  await asSubject("syn-sales_support");
  await click("Prepare quote");
  await click("Ask customer to accept");
  await click("Customer opens link and accepts");
  await click("Create order");
  await click("Record customer payment report");
  await asSubject("syn-finance_reviewer");
  await click("Import signed bank line");
  await click("Verify payment");
  await asSubject("syn-fulfillment_operator");
  for (const to of ["ASSIGNED", "FULFILLING", "DELIVERED", "CLOSED"]) { await page.selectOption("#to", to); await click("Transition"); }
  await click("Customer tracks order");
  await asSubject("syn-finance_reviewer");
  await click("Finance (UNKNOWN-aware)");
  await asSubject("syn-auditor");
  await click("Verify event chain");
  const log = await page.locator("#log").innerText();
  const lines = log.split("\n").filter(Boolean);
  const bad = lines.filter((l) => /"status":(4|5)\d\d/.test(l));
  const checks = {
    banner: await page.getByText("LOCAL SYNTHETIC DEMO — not production").isVisible(),
    verified: /"state":"PAYMENT_VERIFIED"/.test(log),
    closed: /"state":"CLOSED"/.test(log),
    trackedOwnOrder: /"orderId":"O-[0-9a-f]+","state":"CLOSED"|"state":"CLOSED".*"orderId"/.test(log) || /\/c\/api\/track/.test(log),
    financeSyntheticExcluded: /"ordersCounted":0/.test(log),
    chainOk: /"path":"\/ops\/api\/audit\/chain","ok":true/.test(log),
    httpErrors: bad.length,
    consoleErrors: errors.length,
  };
  console.log(JSON.stringify(checks, null, 1));
  if (!checks.banner || !checks.verified || !checks.closed || !checks.financeSyntheticExcluded || !checks.chainOk || bad.length || errors.length) {
    console.log(bad.slice(0, 5).join("\n"), errors.slice(0, 5).join("\n"));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  await d.close();
}
