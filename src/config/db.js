import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"; // Updated import path
import { ENV } from "./env.js"; // Import environment variables
import * as schema from "../db/schema.js"; // Import your schema

const sql = neon(ENV.DATABASE_URL.replace("psql ", "").replace(/'/g, "")); // Initialize Neon client with the connection string
export const db = drizzle(sql, { schema });