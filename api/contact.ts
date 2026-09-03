import pg from "pg";
import { insertContactSchema } from "../shared/schema";

const { Pool } = pg;
const MAX_BODY_BYTES = 16 * 1024;

let pool: pg.Pool | null = null;

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return requestUrl.protocol === originUrl.protocol && requestUrl.host === originUrl.host;
  } catch {
    return false;
  }
}

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 1,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: 2_000,
      allowExitOnIdle: true,
    });
  }

  return pool;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json(
        { message: "Method Not Allowed" },
        405,
        { Allow: "POST" },
      );
    }

    if (!sameOrigin(request)) {
      return json({ message: "Cross-origin submissions are not allowed" }, 403);
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return json({ message: "Content-Type must be application/json" }, 415);
    }

    const declaredLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return json({ message: "Request body too large" }, 413);
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return json({ message: "Invalid request body" }, 400);
    }

    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return json({ message: "Request body too large" }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json({ message: "Invalid JSON" }, 400);
    }

    const parsed = insertContactSchema.safeParse(payload);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return json(
        {
          message: issue?.message || "Invalid contact submission",
          field: issue?.path?.join(".") || undefined,
        },
        400,
      );
    }

    const db = getPool();
    if (!db) {
      return json({ message: "Contact service is not configured" }, 503);
    }

    try {
      const { name, whatsapp, service, needs } = parsed.data;
      const result = await db.query(
        `INSERT INTO contacts (name, whatsapp, service, needs)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, whatsapp, service, needs, created_at AS "createdAt"`,
        [name, whatsapp, service ?? null, needs],
      );

      return json(result.rows[0], 201);
    } catch (error) {
      console.error("[contact] insert failed", {
        name: error instanceof Error ? error.name : "UnknownError",
      });
      return json({ message: "Internal Server Error" }, 500);
    }
  },
};
