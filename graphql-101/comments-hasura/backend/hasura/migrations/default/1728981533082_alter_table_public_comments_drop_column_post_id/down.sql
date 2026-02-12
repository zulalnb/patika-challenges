alter table "public"."comments" alter column "post_id" drop not null;
alter table "public"."comments" add column "post_id" int4;
