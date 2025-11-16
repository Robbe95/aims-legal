import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "payload"."users" ADD COLUMN "reset_password_token" varchar;
  ALTER TABLE "payload"."users" ADD COLUMN "reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "payload"."users" ADD COLUMN "salt" varchar;
  ALTER TABLE "payload"."users" ADD COLUMN "hash" varchar;
  ALTER TABLE "payload"."users" ADD COLUMN "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "payload"."users" ADD COLUMN "lock_until" timestamp(3) with time zone;
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."users_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."users_sessions" CASCADE;
  DROP INDEX "payload"."users_email_idx";
  ALTER TABLE "payload"."users" DROP COLUMN "reset_password_token";
  ALTER TABLE "payload"."users" DROP COLUMN "reset_password_expiration";
  ALTER TABLE "payload"."users" DROP COLUMN "salt";
  ALTER TABLE "payload"."users" DROP COLUMN "hash";
  ALTER TABLE "payload"."users" DROP COLUMN "login_attempts";
  ALTER TABLE "payload"."users" DROP COLUMN "lock_until";`)
}
