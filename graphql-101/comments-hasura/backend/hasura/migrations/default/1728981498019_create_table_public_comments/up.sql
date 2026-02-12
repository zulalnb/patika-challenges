CREATE TABLE "public"."comments" ("id" serial NOT NULL, "text" text NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, PRIMARY KEY ("id") );
