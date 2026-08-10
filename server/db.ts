import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Database construction should depend only on database configuration.
// PORT belongs to the HTTP server, and ADMIN_SECRET belongs to admin-route
// authentication. Requiring either here made unrelated imports fail and hid a
// dependency on tracked .env files in CI. Keep those concerns at their owners.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required but not set");
}

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
export const db = drizzle(pool, { schema });
