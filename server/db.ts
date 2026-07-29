import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Validate critical environment variables
const requiredEnvVars = [
  "DATABASE_URL",
  "NODE_ENV",
  "PORT",
  "ADMIN_SECRET",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is required but not set`);
  }
}

// Validate ADMIN_SECRET is secure (at least 32 characters in production)
if (
  process.env.NODE_ENV === "production" &&
  (!process.env.ADMIN_SECRET || process.env.ADMIN_SECRET.length < 32)
) {
  throw new Error(
    "ADMIN_SECRET must be at least 32 characters in production. Generate a secure secret using: openssl rand -base64 32"
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
export const db = drizzle(pool, { schema });