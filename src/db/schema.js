import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";


export const  favoritesTable = pgTable("favorites", { // Table name
  id: serial("id").primaryKey(), // Primary key
  userId: text("user_id", { length: 255 }).notNull(), // User ID
  recipeId: integer("recipe_id",).notNull(), // Recipe ID
  title: text("title", { length: 255 }).notNull(), // Recipe title
  image: text("image"),
  cookTime: text("cookTime"), // Cooking time in minutes
  createdAt: timestamp("created_at").defaultNow(), // Timestamp
  severings: text("severings"),
  updatedAt: timestamp("updated_at").defaultNow().notNull() // Timestamp

});

