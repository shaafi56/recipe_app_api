import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5001, // Default port if not specified
  DATABASE_URL: process.env.DATABASE_URL, // Database connection string
  NODE_ENV: process.env.NODE_ENV // Environment (development, production, etc.)
}