CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cookTime" text,
	"created_at" timestamp DEFAULT now(),
	"severings" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
