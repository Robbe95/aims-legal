import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'nl');
  CREATE TYPE "public"."link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."cta_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."cta_type" AS ENUM('link', 'event');
  CREATE TYPE "public"."cta_event" AS ENUM('some_form');
  CREATE TYPE "public"."heroVariant" AS ENUM('fullScreen', 'partialScreen');
  CREATE TYPE "public"."imageTextVariant" AS ENUM('imageLeftSmall', 'imageRightSmall', 'imageLeftBig', 'fullImage');
  CREATE TYPE "public"."carouselVariant" AS ENUM('big', 'small');
  CREATE TYPE "public"."uspsVariant" AS ENUM('gray', 'white');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'nl');
  CREATE TYPE "public"."enum_users_tenants_roles" AS ENUM('tenant-admin', 'tenant-viewer');
  CREATE TYPE "public"."enum_users_dark_mode" AS ENUM('dark', 'light', 'system');
  CREATE TYPE "public"."enum_user_role" AS ENUM('super-admin', 'user', 'admin', 'editor');
  CREATE TYPE "public"."enum_addresses_type" AS ENUM('billing', 'shipping');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('en', 'nl');
  CREATE TYPE "public"."nav_link_type" AS ENUM('link', 'event', 'dropdown');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'exampleTask', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_workflow_slug" AS ENUM('exampleWorkflow');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'exampleTask', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('pages', 'articles', 'images');
  CREATE TYPE "public"."enum_payload_query_presets_access_read_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_update_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_delete_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('pages', 'form-hubspot', 'users', 'articles', 'images');
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_breadcrumbs_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"variant" "heroVariant" DEFAULT 'fullScreen',
  	"background_image_id" uuid,
  	"background_video" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_column_multiple_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "pages_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_text_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "pages_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"image_id" uuid,
  	"variant" "imageTextVariant" DEFAULT 'imageLeftSmall',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"variant" "carouselVariant" DEFAULT 'small',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_image_only" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"variant" "carouselVariant" DEFAULT 'small',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_double_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first_image_id" uuid,
  	"second_image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_usps_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"variant" "uspsVariant" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"richtext" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_articles_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hubspot_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hubspot_form_id" uuid,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"slug_lock" boolean DEFAULT true,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"articles_id" uuid,
  	"images_id" uuid
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"variant" "heroVariant" DEFAULT 'fullScreen',
  	"background_image_id" uuid,
  	"background_video" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"subtitle" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_text_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"image_id" uuid,
  	"variant" "imageTextVariant" DEFAULT 'imageLeftSmall',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"variant" "carouselVariant" DEFAULT 'small',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_image_only" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"variant" "carouselVariant" DEFAULT 'small',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_double_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"first_image_id" uuid,
  	"second_image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usps_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"variant" "uspsVariant" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"richtext" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_articles_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hubspot_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"hubspot_form_id" uuid,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_tenant_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_folder_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"articles_id" uuid,
  	"images_id" uuid
  );
  
  CREATE TABLE "form_hubspot" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "form_hubspot_locales" (
  	"title" varchar NOT NULL,
  	"form_id" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "users_tenants_roles" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_users_tenants_roles",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" uuid NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"email" varchar NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"dark_mode" "enum_users_dark_mode" DEFAULT 'light' NOT NULL,
  	"role" "enum_user_role" DEFAULT 'user' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"addresses_id" uuid
  );
  
  CREATE TABLE "addresses_type" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_addresses_type",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "addresses" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar NOT NULL,
  	"street" varchar NOT NULL,
  	"number" varchar NOT NULL,
  	"box" varchar,
  	"postal_code" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"region" varchar,
  	"country" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tenants" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tenants_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "articles_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "articles_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"variant" "heroVariant" DEFAULT 'fullScreen',
  	"background_image_id" uuid,
  	"background_video" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "articles_blocks_column_multiple_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "articles_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_column_text_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "articles_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_image_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "articles_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"image_id" uuid,
  	"variant" "imageTextVariant" DEFAULT 'imageLeftSmall',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "articles_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"variant" "carouselVariant" DEFAULT 'small',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_carousel_image_only" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"variant" "carouselVariant" DEFAULT 'small',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_banner_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "articles_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_double_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first_image_id" uuid,
  	"second_image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_usps_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "articles_blocks_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"variant" "uspsVariant" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"richtext" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_card_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "articles_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_articles_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_hubspot_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hubspot_form_id" uuid,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"slug_lock" boolean DEFAULT true,
  	"preview_image_id" uuid,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"preview_title" varchar,
  	"preview_description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "articles_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"articles_id" uuid,
  	"images_id" uuid
  );
  
  CREATE TABLE "_articles_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"variant" "heroVariant" DEFAULT 'fullScreen',
  	"background_image_id" uuid,
  	"background_video" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"subtitle" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_multiple_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_text_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_image_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"richtext" jsonb,
  	"image_id" uuid,
  	"variant" "imageTextVariant" DEFAULT 'imageLeftSmall',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"variant" "carouselVariant" DEFAULT 'small',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_carousel_image_only" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"variant" "carouselVariant" DEFAULT 'small',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_banner_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_double_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"first_image_id" uuid,
  	"second_image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_usps_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_usps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"variant" "uspsVariant" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"richtext" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_card_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_articles_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_hubspot_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"hubspot_form_id" uuid,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_tenant_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_preview_image_id" uuid,
  	"version_folder_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articles_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_preview_title" varchar,
  	"version_preview_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_articles_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" uuid,
  	"articles_id" uuid,
  	"images_id" uuid
  );
  
  CREATE TABLE "images" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"alt" varchar,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar,
  	"sizes_background_url" varchar,
  	"sizes_background_width" numeric,
  	"sizes_background_height" numeric,
  	"sizes_background_mime_type" varchar,
  	"sizes_background_filesize" numeric,
  	"sizes_background_filename" varchar
  );
  
  CREATE TABLE "settings_home_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"home_page_type" "link_type" DEFAULT 'reference' NOT NULL,
  	"home_page_new_tab" boolean DEFAULT false NOT NULL,
  	"home_page_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "settings_header_links_nav_link_links_link_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_type" "link_type" DEFAULT 'reference',
  	"category_new_tab" boolean DEFAULT false,
  	"category_url" varchar
  );
  
  CREATE TABLE "settings_header_links_nav_link_links_link_categories_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_header_links_nav_link_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "settings_header_links_nav_link_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nav_link_nav_type" "nav_link_type" DEFAULT 'link' NOT NULL,
  	"nav_link_link_type" "link_type" DEFAULT 'reference',
  	"nav_link_link_new_tab" boolean DEFAULT false,
  	"nav_link_link_url" varchar,
  	"nav_link_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "settings_header_links_locales" (
  	"nav_link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_header" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "settings_footer_links_nav_link_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "settings_footer_links_nav_link_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nav_link_nav_type" "nav_link_type" DEFAULT 'link' NOT NULL,
  	"nav_link_link_type" "link_type" DEFAULT 'reference',
  	"nav_link_link_new_tab" boolean DEFAULT false,
  	"nav_link_link_url" varchar,
  	"nav_link_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "settings_footer_links_locales" (
  	"nav_link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "settings_footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "settings_socials" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"facebook" varchar,
  	"instagram" varchar,
  	"linkedin" varchar,
  	"youtube" varchar,
  	"pinterest" varchar,
  	"tiktok" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_hubspot" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tenant_id" uuid,
  	"portal_id" varchar,
  	"access_token" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"workflow_slug" "enum_payload_jobs_workflow_slug",
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"form_hubspot_id" uuid,
  	"users_id" uuid,
  	"addresses_id" uuid,
  	"tenants_id" uuid,
  	"articles_id" uuid,
  	"images_id" uuid,
  	"settings_home_page_id" uuid,
  	"settings_header_id" uuid,
  	"settings_footer_id" uuid,
  	"settings_socials_id" uuid,
  	"settings_hubspot_id" uuid,
  	"payload_folders_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_query_presets" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"is_shared" boolean DEFAULT false,
  	"access_read_constraint" "enum_payload_query_presets_access_read_constraint" DEFAULT 'onlyMe',
  	"access_update_constraint" "enum_payload_query_presets_access_update_constraint" DEFAULT 'onlyMe',
  	"access_delete_constraint" "enum_payload_query_presets_access_delete_constraint" DEFAULT 'onlyMe',
  	"where" jsonb,
  	"columns" jsonb,
  	"related_collection" "enum_payload_query_presets_related_collection" NOT NULL,
  	"is_temp" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_query_presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs_locales" ADD CONSTRAINT "pages_breadcrumbs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_breadcrumbs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_images_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text_texts" ADD CONSTRAINT "pages_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text_ctas" ADD CONSTRAINT "pages_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text" ADD CONSTRAINT "pages_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_text_cta_ctas" ADD CONSTRAINT "pages_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_text_cta" ADD CONSTRAINT "pages_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_columns" ADD CONSTRAINT "pages_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column" ADD CONSTRAINT "pages_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_ctas" ADD CONSTRAINT "pages_blocks_image_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_items" ADD CONSTRAINT "pages_blocks_carousel_items_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_items" ADD CONSTRAINT "pages_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_image_only" ADD CONSTRAINT "pages_blocks_carousel_image_only_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_ctas" ADD CONSTRAINT "pages_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_double_image" ADD CONSTRAINT "pages_blocks_double_image_first_image_id_images_id_fk" FOREIGN KEY ("first_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_double_image" ADD CONSTRAINT "pages_blocks_double_image_second_image_id_images_id_fk" FOREIGN KEY ("second_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_double_image" ADD CONSTRAINT "pages_blocks_double_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_usps_usps" ADD CONSTRAINT "pages_blocks_usps_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_usps" ADD CONSTRAINT "pages_blocks_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_cards" ADD CONSTRAINT "pages_blocks_card_list_cards_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_cards" ADD CONSTRAINT "pages_blocks_card_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list" ADD CONSTRAINT "pages_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_index" ADD CONSTRAINT "pages_blocks_article_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_articles_carousel" ADD CONSTRAINT "pages_blocks_articles_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hubspot_form" ADD CONSTRAINT "pages_blocks_hubspot_form_hubspot_form_id_form_hubspot_id_fk" FOREIGN KEY ("hubspot_form_id") REFERENCES "public"."form_hubspot"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hubspot_form" ADD CONSTRAINT "pages_blocks_hubspot_form_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hubspot_form" ADD CONSTRAINT "pages_blocks_hubspot_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_seo_image_id_images_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs_locales" ADD CONSTRAINT "_pages_v_version_breadcrumbs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_breadcrumbs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_images_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_texts" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_ctas" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_text_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_text_cta" ADD CONSTRAINT "_pages_v_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_columns" ADD CONSTRAINT "_pages_v_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column" ADD CONSTRAINT "_pages_v_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_ctas" ADD CONSTRAINT "_pages_v_blocks_image_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD CONSTRAINT "_pages_v_blocks_carousel_items_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD CONSTRAINT "_pages_v_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_image_only" ADD CONSTRAINT "_pages_v_blocks_carousel_image_only_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_ctas" ADD CONSTRAINT "_pages_v_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_double_image" ADD CONSTRAINT "_pages_v_blocks_double_image_first_image_id_images_id_fk" FOREIGN KEY ("first_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_double_image" ADD CONSTRAINT "_pages_v_blocks_double_image_second_image_id_images_id_fk" FOREIGN KEY ("second_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_double_image" ADD CONSTRAINT "_pages_v_blocks_double_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usps_usps" ADD CONSTRAINT "_pages_v_blocks_usps_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usps" ADD CONSTRAINT "_pages_v_blocks_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_cards" ADD CONSTRAINT "_pages_v_blocks_card_list_cards_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_cards" ADD CONSTRAINT "_pages_v_blocks_card_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list" ADD CONSTRAINT "_pages_v_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_index" ADD CONSTRAINT "_pages_v_blocks_article_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_articles_carousel" ADD CONSTRAINT "_pages_v_blocks_articles_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hubspot_form" ADD CONSTRAINT "_pages_v_blocks_hubspot_form_hubspot_form_id_form_hubspot_id_fk" FOREIGN KEY ("hubspot_form_id") REFERENCES "public"."form_hubspot"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hubspot_form" ADD CONSTRAINT "_pages_v_blocks_hubspot_form_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hubspot_form" ADD CONSTRAINT "_pages_v_blocks_hubspot_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_seo_image_id_images_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_hubspot_locales" ADD CONSTRAINT "form_hubspot_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_hubspot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants_roles" ADD CONSTRAINT "users_tenants_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users_tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "addresses_type" ADD CONSTRAINT "addresses_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenants_locales" ADD CONSTRAINT "tenants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_ctas" ADD CONSTRAINT "articles_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero" ADD CONSTRAINT "articles_blocks_hero_background_image_id_images_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero" ADD CONSTRAINT "articles_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text" ADD CONSTRAINT "articles_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_multiple_text_texts" ADD CONSTRAINT "articles_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_multiple_text_ctas" ADD CONSTRAINT "articles_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_multiple_text" ADD CONSTRAINT "articles_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_text_cta_ctas" ADD CONSTRAINT "articles_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_text_cta" ADD CONSTRAINT "articles_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column_columns" ADD CONSTRAINT "articles_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_column" ADD CONSTRAINT "articles_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_image_text_ctas" ADD CONSTRAINT "articles_blocks_image_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_image_text" ADD CONSTRAINT "articles_blocks_image_text_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_image_text" ADD CONSTRAINT "articles_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_carousel_items" ADD CONSTRAINT "articles_blocks_carousel_items_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_carousel_items" ADD CONSTRAINT "articles_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_carousel" ADD CONSTRAINT "articles_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_carousel_image_only" ADD CONSTRAINT "articles_blocks_carousel_image_only_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_banner_ctas" ADD CONSTRAINT "articles_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_banner" ADD CONSTRAINT "articles_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_double_image" ADD CONSTRAINT "articles_blocks_double_image_first_image_id_images_id_fk" FOREIGN KEY ("first_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_double_image" ADD CONSTRAINT "articles_blocks_double_image_second_image_id_images_id_fk" FOREIGN KEY ("second_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_double_image" ADD CONSTRAINT "articles_blocks_double_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_usps_usps" ADD CONSTRAINT "articles_blocks_usps_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_usps" ADD CONSTRAINT "articles_blocks_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_rich_text" ADD CONSTRAINT "articles_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_list_cards" ADD CONSTRAINT "articles_blocks_card_list_cards_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_list_cards" ADD CONSTRAINT "articles_blocks_card_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_list" ADD CONSTRAINT "articles_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_index" ADD CONSTRAINT "articles_blocks_article_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_articles_carousel" ADD CONSTRAINT "articles_blocks_articles_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hubspot_form" ADD CONSTRAINT "articles_blocks_hubspot_form_hubspot_form_id_form_hubspot_id_fk" FOREIGN KEY ("hubspot_form_id") REFERENCES "public"."form_hubspot"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hubspot_form" ADD CONSTRAINT "articles_blocks_hubspot_form_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hubspot_form" ADD CONSTRAINT "articles_blocks_hubspot_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_preview_image_id_images_id_fk" FOREIGN KEY ("preview_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_seo_image_id_images_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_texts" ADD CONSTRAINT "articles_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_ctas" ADD CONSTRAINT "_articles_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero" ADD CONSTRAINT "_articles_v_blocks_hero_background_image_id_images_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero" ADD CONSTRAINT "_articles_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text" ADD CONSTRAINT "_articles_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_multiple_text_texts" ADD CONSTRAINT "_articles_v_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_multiple_text_ctas" ADD CONSTRAINT "_articles_v_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_multiple_text" ADD CONSTRAINT "_articles_v_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_text_cta_ctas" ADD CONSTRAINT "_articles_v_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_text_cta" ADD CONSTRAINT "_articles_v_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column_columns" ADD CONSTRAINT "_articles_v_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_column" ADD CONSTRAINT "_articles_v_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image_text_ctas" ADD CONSTRAINT "_articles_v_blocks_image_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image_text" ADD CONSTRAINT "_articles_v_blocks_image_text_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image_text" ADD CONSTRAINT "_articles_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_carousel_items" ADD CONSTRAINT "_articles_v_blocks_carousel_items_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_carousel_items" ADD CONSTRAINT "_articles_v_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_carousel" ADD CONSTRAINT "_articles_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_carousel_image_only" ADD CONSTRAINT "_articles_v_blocks_carousel_image_only_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_banner_ctas" ADD CONSTRAINT "_articles_v_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_banner" ADD CONSTRAINT "_articles_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_double_image" ADD CONSTRAINT "_articles_v_blocks_double_image_first_image_id_images_id_fk" FOREIGN KEY ("first_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_double_image" ADD CONSTRAINT "_articles_v_blocks_double_image_second_image_id_images_id_fk" FOREIGN KEY ("second_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_double_image" ADD CONSTRAINT "_articles_v_blocks_double_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_usps_usps" ADD CONSTRAINT "_articles_v_blocks_usps_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_usps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_usps" ADD CONSTRAINT "_articles_v_blocks_usps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_rich_text" ADD CONSTRAINT "_articles_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_list_cards" ADD CONSTRAINT "_articles_v_blocks_card_list_cards_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_list_cards" ADD CONSTRAINT "_articles_v_blocks_card_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_list" ADD CONSTRAINT "_articles_v_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_index" ADD CONSTRAINT "_articles_v_blocks_article_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_articles_carousel" ADD CONSTRAINT "_articles_v_blocks_articles_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hubspot_form" ADD CONSTRAINT "_articles_v_blocks_hubspot_form_hubspot_form_id_form_hubspot_id_fk" FOREIGN KEY ("hubspot_form_id") REFERENCES "public"."form_hubspot"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hubspot_form" ADD CONSTRAINT "_articles_v_blocks_hubspot_form_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hubspot_form" ADD CONSTRAINT "_articles_v_blocks_hubspot_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_preview_image_id_images_id_fk" FOREIGN KEY ("version_preview_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_version_seo_image_id_images_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_texts" ADD CONSTRAINT "_articles_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "images" ADD CONSTRAINT "images_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "images" ADD CONSTRAINT "images_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_home_page" ADD CONSTRAINT "settings_home_page_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_home_page_rels" ADD CONSTRAINT "settings_home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings_home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_home_page_rels" ADD CONSTRAINT "settings_home_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_home_page_rels" ADD CONSTRAINT "settings_home_page_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links_nav_link_links_link_categories" ADD CONSTRAINT "settings_header_links_nav_link_links_link_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header_links_nav_link_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links_nav_link_links_link_categories_locales" ADD CONSTRAINT "settings_header_links_nav_link_links_link_categories_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header_links_nav_link_links_link_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links_nav_link_links" ADD CONSTRAINT "settings_header_links_nav_link_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links_nav_link_links_locales" ADD CONSTRAINT "settings_header_links_nav_link_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header_links_nav_link_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links" ADD CONSTRAINT "settings_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_links_locales" ADD CONSTRAINT "settings_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header" ADD CONSTRAINT "settings_header_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_header_rels" ADD CONSTRAINT "settings_header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_rels" ADD CONSTRAINT "settings_header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_header_rels" ADD CONSTRAINT "settings_header_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links_nav_link_links" ADD CONSTRAINT "settings_footer_links_nav_link_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links_nav_link_links_locales" ADD CONSTRAINT "settings_footer_links_nav_link_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_footer_links_nav_link_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links" ADD CONSTRAINT "settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_links_locales" ADD CONSTRAINT "settings_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer" ADD CONSTRAINT "settings_footer_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_footer_rels" ADD CONSTRAINT "settings_footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_rels" ADD CONSTRAINT "settings_footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_rels" ADD CONSTRAINT "settings_footer_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_socials" ADD CONSTRAINT "settings_socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_hubspot" ADD CONSTRAINT "settings_hubspot_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_hubspot_fk" FOREIGN KEY ("form_hubspot_id") REFERENCES "public"."form_hubspot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_home_page_fk" FOREIGN KEY ("settings_home_page_id") REFERENCES "public"."settings_home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_header_fk" FOREIGN KEY ("settings_header_id") REFERENCES "public"."settings_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_footer_fk" FOREIGN KEY ("settings_footer_id") REFERENCES "public"."settings_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_socials_fk" FOREIGN KEY ("settings_socials_id") REFERENCES "public"."settings_socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_hubspot_fk" FOREIGN KEY ("settings_hubspot_id") REFERENCES "public"."settings_hubspot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_query_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_breadcrumbs_locales_locale_parent_id_unique" ON "pages_breadcrumbs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_locale_idx" ON "pages_blocks_hero_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_locale_idx" ON "pages_blocks_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_order_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_parent_id_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_locale_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_order_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_parent_id_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_locale_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_order_idx" ON "pages_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_parent_id_idx" ON "pages_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_path_idx" ON "pages_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_multiple_text_locale_idx" ON "pages_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_order_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_parent_id_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_locale_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_text_cta_order_idx" ON "pages_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_text_cta_parent_id_idx" ON "pages_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_text_cta_path_idx" ON "pages_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_text_cta_locale_idx" ON "pages_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_columns_order_idx" ON "pages_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_columns_parent_id_idx" ON "pages_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_columns_locale_idx" ON "pages_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_order_idx" ON "pages_blocks_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_parent_id_idx" ON "pages_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_path_idx" ON "pages_blocks_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_locale_idx" ON "pages_blocks_column" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_ctas_order_idx" ON "pages_blocks_image_text_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_ctas_parent_id_idx" ON "pages_blocks_image_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_ctas_locale_idx" ON "pages_blocks_image_text_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_locale_idx" ON "pages_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_carousel_items_order_idx" ON "pages_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_items_parent_id_idx" ON "pages_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_items_locale_idx" ON "pages_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_carousel_items_image_idx" ON "pages_blocks_carousel_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_carousel_order_idx" ON "pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_parent_id_idx" ON "pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_path_idx" ON "pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_locale_idx" ON "pages_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_carousel_image_only_order_idx" ON "pages_blocks_carousel_image_only" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_image_only_parent_id_idx" ON "pages_blocks_carousel_image_only" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_image_only_path_idx" ON "pages_blocks_carousel_image_only" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_image_only_locale_idx" ON "pages_blocks_carousel_image_only" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_ctas_order_idx" ON "pages_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_ctas_parent_id_idx" ON "pages_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_ctas_locale_idx" ON "pages_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_locale_idx" ON "pages_blocks_banner" USING btree ("_locale");
  CREATE INDEX "pages_blocks_double_image_order_idx" ON "pages_blocks_double_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_double_image_parent_id_idx" ON "pages_blocks_double_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_double_image_path_idx" ON "pages_blocks_double_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_double_image_locale_idx" ON "pages_blocks_double_image" USING btree ("_locale");
  CREATE INDEX "pages_blocks_double_image_first_image_idx" ON "pages_blocks_double_image" USING btree ("first_image_id");
  CREATE INDEX "pages_blocks_double_image_second_image_idx" ON "pages_blocks_double_image" USING btree ("second_image_id");
  CREATE INDEX "pages_blocks_usps_usps_order_idx" ON "pages_blocks_usps_usps" USING btree ("_order");
  CREATE INDEX "pages_blocks_usps_usps_parent_id_idx" ON "pages_blocks_usps_usps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usps_usps_locale_idx" ON "pages_blocks_usps_usps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_usps_order_idx" ON "pages_blocks_usps" USING btree ("_order");
  CREATE INDEX "pages_blocks_usps_parent_id_idx" ON "pages_blocks_usps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usps_path_idx" ON "pages_blocks_usps" USING btree ("_path");
  CREATE INDEX "pages_blocks_usps_locale_idx" ON "pages_blocks_usps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_card_list_cards_order_idx" ON "pages_blocks_card_list_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_cards_parent_id_idx" ON "pages_blocks_card_list_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_cards_locale_idx" ON "pages_blocks_card_list_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_card_list_cards_image_idx" ON "pages_blocks_card_list_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_list_order_idx" ON "pages_blocks_card_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_parent_id_idx" ON "pages_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_path_idx" ON "pages_blocks_card_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_list_locale_idx" ON "pages_blocks_card_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_article_index_order_idx" ON "pages_blocks_article_index" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_index_parent_id_idx" ON "pages_blocks_article_index" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_index_path_idx" ON "pages_blocks_article_index" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_index_locale_idx" ON "pages_blocks_article_index" USING btree ("_locale");
  CREATE INDEX "pages_blocks_articles_carousel_order_idx" ON "pages_blocks_articles_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_articles_carousel_parent_id_idx" ON "pages_blocks_articles_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_articles_carousel_path_idx" ON "pages_blocks_articles_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_articles_carousel_locale_idx" ON "pages_blocks_articles_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hubspot_form_order_idx" ON "pages_blocks_hubspot_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_hubspot_form_parent_id_idx" ON "pages_blocks_hubspot_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hubspot_form_path_idx" ON "pages_blocks_hubspot_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_hubspot_form_locale_idx" ON "pages_blocks_hubspot_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hubspot_form_hubspot_form_idx" ON "pages_blocks_hubspot_form" USING btree ("hubspot_form_id");
  CREATE INDEX "pages_blocks_hubspot_form_image_idx" ON "pages_blocks_hubspot_form" USING btree ("image_id");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE INDEX "pages_folder_idx" ON "pages" USING btree ("folder_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_texts_locale_parent" ON "pages_texts" USING btree ("locale","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id","locale");
  CREATE INDEX "pages_rels_images_id_idx" ON "pages_rels" USING btree ("images_id","locale");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_breadcrumbs_locales_locale_parent_id_unique" ON "_pages_v_version_breadcrumbs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_locale_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_locale_idx" ON "_pages_v_blocks_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_order_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_parent_id_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_locale_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_order_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_parent_id_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_locale_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_order_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_parent_id_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_path_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_locale_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_order_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_parent_id_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_locale_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_text_cta_order_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_text_cta_parent_id_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_text_cta_path_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_text_cta_locale_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_columns_order_idx" ON "_pages_v_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_columns_parent_id_idx" ON "_pages_v_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_columns_locale_idx" ON "_pages_v_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_order_idx" ON "_pages_v_blocks_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_parent_id_idx" ON "_pages_v_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_path_idx" ON "_pages_v_blocks_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_locale_idx" ON "_pages_v_blocks_column" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_text_ctas_order_idx" ON "_pages_v_blocks_image_text_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_ctas_parent_id_idx" ON "_pages_v_blocks_image_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_ctas_locale_idx" ON "_pages_v_blocks_image_text_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_locale_idx" ON "_pages_v_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_carousel_items_order_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_items_parent_id_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_items_locale_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_items_image_idx" ON "_pages_v_blocks_carousel_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_carousel_order_idx" ON "_pages_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_parent_id_idx" ON "_pages_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_path_idx" ON "_pages_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_locale_idx" ON "_pages_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_image_only_order_idx" ON "_pages_v_blocks_carousel_image_only" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_image_only_parent_id_idx" ON "_pages_v_blocks_carousel_image_only" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_image_only_path_idx" ON "_pages_v_blocks_carousel_image_only" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_image_only_locale_idx" ON "_pages_v_blocks_carousel_image_only" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_ctas_order_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_ctas_parent_id_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_ctas_locale_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_locale_idx" ON "_pages_v_blocks_banner" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_double_image_order_idx" ON "_pages_v_blocks_double_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_double_image_parent_id_idx" ON "_pages_v_blocks_double_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_double_image_path_idx" ON "_pages_v_blocks_double_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_double_image_locale_idx" ON "_pages_v_blocks_double_image" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_double_image_first_image_idx" ON "_pages_v_blocks_double_image" USING btree ("first_image_id");
  CREATE INDEX "_pages_v_blocks_double_image_second_image_idx" ON "_pages_v_blocks_double_image" USING btree ("second_image_id");
  CREATE INDEX "_pages_v_blocks_usps_usps_order_idx" ON "_pages_v_blocks_usps_usps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usps_usps_parent_id_idx" ON "_pages_v_blocks_usps_usps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usps_usps_locale_idx" ON "_pages_v_blocks_usps_usps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_usps_order_idx" ON "_pages_v_blocks_usps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usps_parent_id_idx" ON "_pages_v_blocks_usps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usps_path_idx" ON "_pages_v_blocks_usps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_usps_locale_idx" ON "_pages_v_blocks_usps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_card_list_cards_order_idx" ON "_pages_v_blocks_card_list_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_cards_parent_id_idx" ON "_pages_v_blocks_card_list_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_cards_locale_idx" ON "_pages_v_blocks_card_list_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_card_list_cards_image_idx" ON "_pages_v_blocks_card_list_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_list_order_idx" ON "_pages_v_blocks_card_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_parent_id_idx" ON "_pages_v_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_path_idx" ON "_pages_v_blocks_card_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_list_locale_idx" ON "_pages_v_blocks_card_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_article_index_order_idx" ON "_pages_v_blocks_article_index" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_index_parent_id_idx" ON "_pages_v_blocks_article_index" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_index_path_idx" ON "_pages_v_blocks_article_index" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_index_locale_idx" ON "_pages_v_blocks_article_index" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_articles_carousel_order_idx" ON "_pages_v_blocks_articles_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_articles_carousel_parent_id_idx" ON "_pages_v_blocks_articles_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_articles_carousel_path_idx" ON "_pages_v_blocks_articles_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_articles_carousel_locale_idx" ON "_pages_v_blocks_articles_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hubspot_form_order_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hubspot_form_parent_id_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hubspot_form_path_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hubspot_form_locale_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hubspot_form_hubspot_form_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("hubspot_form_id");
  CREATE INDEX "_pages_v_blocks_hubspot_form_image_idx" ON "_pages_v_blocks_hubspot_form" USING btree ("image_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_tenant_idx" ON "_pages_v" USING btree ("version_tenant_id");
  CREATE INDEX "_pages_v_version_version_folder_idx" ON "_pages_v" USING btree ("version_folder_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v_locales" USING btree ("version_seo_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_texts_order_parent" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_texts_locale_parent" ON "_pages_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id","locale");
  CREATE INDEX "_pages_v_rels_images_id_idx" ON "_pages_v_rels" USING btree ("images_id","locale");
  CREATE INDEX "form_hubspot_updated_at_idx" ON "form_hubspot" USING btree ("updated_at");
  CREATE INDEX "form_hubspot_created_at_idx" ON "form_hubspot" USING btree ("created_at");
  CREATE INDEX "form_hubspot_deleted_at_idx" ON "form_hubspot" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "form_hubspot_locales_locale_parent_id_unique" ON "form_hubspot_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_tenants_roles_order_idx" ON "users_tenants_roles" USING btree ("order");
  CREATE INDEX "users_tenants_roles_parent_idx" ON "users_tenants_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_addresses_id_idx" ON "users_rels" USING btree ("addresses_id");
  CREATE INDEX "addresses_type_order_idx" ON "addresses_type" USING btree ("order");
  CREATE INDEX "addresses_type_parent_idx" ON "addresses_type" USING btree ("parent_id");
  CREATE INDEX "addresses_updated_at_idx" ON "addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "addresses" USING btree ("created_at");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "tenants_deleted_at_idx" ON "tenants" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "tenants_locales_locale_parent_id_unique" ON "tenants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_hero_ctas_order_idx" ON "articles_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_ctas_parent_id_idx" ON "articles_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_ctas_locale_idx" ON "articles_blocks_hero_ctas" USING btree ("_locale");
  CREATE INDEX "articles_blocks_hero_order_idx" ON "articles_blocks_hero" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_parent_id_idx" ON "articles_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_path_idx" ON "articles_blocks_hero" USING btree ("_path");
  CREATE INDEX "articles_blocks_hero_locale_idx" ON "articles_blocks_hero" USING btree ("_locale");
  CREATE INDEX "articles_blocks_hero_background_image_idx" ON "articles_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "articles_blocks_text_order_idx" ON "articles_blocks_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_parent_id_idx" ON "articles_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_path_idx" ON "articles_blocks_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_text_locale_idx" ON "articles_blocks_text" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_multiple_text_texts_order_idx" ON "articles_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_multiple_text_texts_parent_id_idx" ON "articles_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_multiple_text_texts_locale_idx" ON "articles_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_multiple_text_ctas_order_idx" ON "articles_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_multiple_text_ctas_parent_id_idx" ON "articles_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_multiple_text_ctas_locale_idx" ON "articles_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_multiple_text_order_idx" ON "articles_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_multiple_text_parent_id_idx" ON "articles_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_multiple_text_path_idx" ON "articles_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_column_multiple_text_locale_idx" ON "articles_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_text_cta_ctas_order_idx" ON "articles_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_text_cta_ctas_parent_id_idx" ON "articles_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_text_cta_ctas_locale_idx" ON "articles_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_text_cta_order_idx" ON "articles_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_text_cta_parent_id_idx" ON "articles_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_text_cta_path_idx" ON "articles_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "articles_blocks_column_text_cta_locale_idx" ON "articles_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_columns_order_idx" ON "articles_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_columns_parent_id_idx" ON "articles_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_columns_locale_idx" ON "articles_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "articles_blocks_column_order_idx" ON "articles_blocks_column" USING btree ("_order");
  CREATE INDEX "articles_blocks_column_parent_id_idx" ON "articles_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_column_path_idx" ON "articles_blocks_column" USING btree ("_path");
  CREATE INDEX "articles_blocks_column_locale_idx" ON "articles_blocks_column" USING btree ("_locale");
  CREATE INDEX "articles_blocks_image_text_ctas_order_idx" ON "articles_blocks_image_text_ctas" USING btree ("_order");
  CREATE INDEX "articles_blocks_image_text_ctas_parent_id_idx" ON "articles_blocks_image_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_image_text_ctas_locale_idx" ON "articles_blocks_image_text_ctas" USING btree ("_locale");
  CREATE INDEX "articles_blocks_image_text_order_idx" ON "articles_blocks_image_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_image_text_parent_id_idx" ON "articles_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_image_text_path_idx" ON "articles_blocks_image_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_image_text_locale_idx" ON "articles_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "articles_blocks_image_text_image_idx" ON "articles_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "articles_blocks_carousel_items_order_idx" ON "articles_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_carousel_items_parent_id_idx" ON "articles_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_carousel_items_locale_idx" ON "articles_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "articles_blocks_carousel_items_image_idx" ON "articles_blocks_carousel_items" USING btree ("image_id");
  CREATE INDEX "articles_blocks_carousel_order_idx" ON "articles_blocks_carousel" USING btree ("_order");
  CREATE INDEX "articles_blocks_carousel_parent_id_idx" ON "articles_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_carousel_path_idx" ON "articles_blocks_carousel" USING btree ("_path");
  CREATE INDEX "articles_blocks_carousel_locale_idx" ON "articles_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "articles_blocks_carousel_image_only_order_idx" ON "articles_blocks_carousel_image_only" USING btree ("_order");
  CREATE INDEX "articles_blocks_carousel_image_only_parent_id_idx" ON "articles_blocks_carousel_image_only" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_carousel_image_only_path_idx" ON "articles_blocks_carousel_image_only" USING btree ("_path");
  CREATE INDEX "articles_blocks_carousel_image_only_locale_idx" ON "articles_blocks_carousel_image_only" USING btree ("_locale");
  CREATE INDEX "articles_blocks_banner_ctas_order_idx" ON "articles_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "articles_blocks_banner_ctas_parent_id_idx" ON "articles_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_banner_ctas_locale_idx" ON "articles_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "articles_blocks_banner_order_idx" ON "articles_blocks_banner" USING btree ("_order");
  CREATE INDEX "articles_blocks_banner_parent_id_idx" ON "articles_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_banner_path_idx" ON "articles_blocks_banner" USING btree ("_path");
  CREATE INDEX "articles_blocks_banner_locale_idx" ON "articles_blocks_banner" USING btree ("_locale");
  CREATE INDEX "articles_blocks_double_image_order_idx" ON "articles_blocks_double_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_double_image_parent_id_idx" ON "articles_blocks_double_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_double_image_path_idx" ON "articles_blocks_double_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_double_image_locale_idx" ON "articles_blocks_double_image" USING btree ("_locale");
  CREATE INDEX "articles_blocks_double_image_first_image_idx" ON "articles_blocks_double_image" USING btree ("first_image_id");
  CREATE INDEX "articles_blocks_double_image_second_image_idx" ON "articles_blocks_double_image" USING btree ("second_image_id");
  CREATE INDEX "articles_blocks_usps_usps_order_idx" ON "articles_blocks_usps_usps" USING btree ("_order");
  CREATE INDEX "articles_blocks_usps_usps_parent_id_idx" ON "articles_blocks_usps_usps" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_usps_usps_locale_idx" ON "articles_blocks_usps_usps" USING btree ("_locale");
  CREATE INDEX "articles_blocks_usps_order_idx" ON "articles_blocks_usps" USING btree ("_order");
  CREATE INDEX "articles_blocks_usps_parent_id_idx" ON "articles_blocks_usps" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_usps_path_idx" ON "articles_blocks_usps" USING btree ("_path");
  CREATE INDEX "articles_blocks_usps_locale_idx" ON "articles_blocks_usps" USING btree ("_locale");
  CREATE INDEX "articles_blocks_rich_text_order_idx" ON "articles_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_rich_text_parent_id_idx" ON "articles_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_rich_text_path_idx" ON "articles_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_rich_text_locale_idx" ON "articles_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "articles_blocks_card_list_cards_order_idx" ON "articles_blocks_card_list_cards" USING btree ("_order");
  CREATE INDEX "articles_blocks_card_list_cards_parent_id_idx" ON "articles_blocks_card_list_cards" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_card_list_cards_locale_idx" ON "articles_blocks_card_list_cards" USING btree ("_locale");
  CREATE INDEX "articles_blocks_card_list_cards_image_idx" ON "articles_blocks_card_list_cards" USING btree ("image_id");
  CREATE INDEX "articles_blocks_card_list_order_idx" ON "articles_blocks_card_list" USING btree ("_order");
  CREATE INDEX "articles_blocks_card_list_parent_id_idx" ON "articles_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_card_list_path_idx" ON "articles_blocks_card_list" USING btree ("_path");
  CREATE INDEX "articles_blocks_card_list_locale_idx" ON "articles_blocks_card_list" USING btree ("_locale");
  CREATE INDEX "articles_blocks_article_index_order_idx" ON "articles_blocks_article_index" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_index_parent_id_idx" ON "articles_blocks_article_index" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_index_path_idx" ON "articles_blocks_article_index" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_index_locale_idx" ON "articles_blocks_article_index" USING btree ("_locale");
  CREATE INDEX "articles_blocks_articles_carousel_order_idx" ON "articles_blocks_articles_carousel" USING btree ("_order");
  CREATE INDEX "articles_blocks_articles_carousel_parent_id_idx" ON "articles_blocks_articles_carousel" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_articles_carousel_path_idx" ON "articles_blocks_articles_carousel" USING btree ("_path");
  CREATE INDEX "articles_blocks_articles_carousel_locale_idx" ON "articles_blocks_articles_carousel" USING btree ("_locale");
  CREATE INDEX "articles_blocks_hubspot_form_order_idx" ON "articles_blocks_hubspot_form" USING btree ("_order");
  CREATE INDEX "articles_blocks_hubspot_form_parent_id_idx" ON "articles_blocks_hubspot_form" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hubspot_form_path_idx" ON "articles_blocks_hubspot_form" USING btree ("_path");
  CREATE INDEX "articles_blocks_hubspot_form_locale_idx" ON "articles_blocks_hubspot_form" USING btree ("_locale");
  CREATE INDEX "articles_blocks_hubspot_form_hubspot_form_idx" ON "articles_blocks_hubspot_form" USING btree ("hubspot_form_id");
  CREATE INDEX "articles_blocks_hubspot_form_image_idx" ON "articles_blocks_hubspot_form" USING btree ("image_id");
  CREATE INDEX "articles_tenant_idx" ON "articles" USING btree ("tenant_id");
  CREATE INDEX "articles_preview_preview_image_idx" ON "articles" USING btree ("preview_image_id");
  CREATE INDEX "articles_folder_idx" ON "articles" USING btree ("folder_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_deleted_at_idx" ON "articles" USING btree ("deleted_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_slug_idx" ON "articles_locales" USING btree ("slug","_locale");
  CREATE INDEX "articles_seo_seo_image_idx" ON "articles_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_texts_order_parent" ON "articles_texts" USING btree ("order","parent_id");
  CREATE INDEX "articles_texts_locale_parent" ON "articles_texts" USING btree ("locale","parent_id");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_locale_idx" ON "articles_rels" USING btree ("locale");
  CREATE INDEX "articles_rels_pages_id_idx" ON "articles_rels" USING btree ("pages_id","locale");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id","locale");
  CREATE INDEX "articles_rels_images_id_idx" ON "articles_rels" USING btree ("images_id","locale");
  CREATE INDEX "_articles_v_blocks_hero_ctas_order_idx" ON "_articles_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hero_ctas_parent_id_idx" ON "_articles_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_hero_ctas_locale_idx" ON "_articles_v_blocks_hero_ctas" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_hero_order_idx" ON "_articles_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hero_parent_id_idx" ON "_articles_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_hero_path_idx" ON "_articles_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_hero_locale_idx" ON "_articles_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_hero_background_image_idx" ON "_articles_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_articles_v_blocks_text_order_idx" ON "_articles_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_parent_id_idx" ON "_articles_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_path_idx" ON "_articles_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_text_locale_idx" ON "_articles_v_blocks_text" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_texts_order_idx" ON "_articles_v_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_texts_parent_id_idx" ON "_articles_v_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_texts_locale_idx" ON "_articles_v_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_ctas_order_idx" ON "_articles_v_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_ctas_parent_id_idx" ON "_articles_v_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_ctas_locale_idx" ON "_articles_v_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_order_idx" ON "_articles_v_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_parent_id_idx" ON "_articles_v_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_path_idx" ON "_articles_v_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_column_multiple_text_locale_idx" ON "_articles_v_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_text_cta_ctas_order_idx" ON "_articles_v_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_text_cta_ctas_parent_id_idx" ON "_articles_v_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_text_cta_ctas_locale_idx" ON "_articles_v_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_text_cta_order_idx" ON "_articles_v_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_text_cta_parent_id_idx" ON "_articles_v_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_text_cta_path_idx" ON "_articles_v_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_column_text_cta_locale_idx" ON "_articles_v_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_columns_order_idx" ON "_articles_v_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_columns_parent_id_idx" ON "_articles_v_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_columns_locale_idx" ON "_articles_v_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_column_order_idx" ON "_articles_v_blocks_column" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_column_parent_id_idx" ON "_articles_v_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_column_path_idx" ON "_articles_v_blocks_column" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_column_locale_idx" ON "_articles_v_blocks_column" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_image_text_ctas_order_idx" ON "_articles_v_blocks_image_text_ctas" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_image_text_ctas_parent_id_idx" ON "_articles_v_blocks_image_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_image_text_ctas_locale_idx" ON "_articles_v_blocks_image_text_ctas" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_image_text_order_idx" ON "_articles_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_image_text_parent_id_idx" ON "_articles_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_image_text_path_idx" ON "_articles_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_image_text_locale_idx" ON "_articles_v_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_image_text_image_idx" ON "_articles_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_carousel_items_order_idx" ON "_articles_v_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_carousel_items_parent_id_idx" ON "_articles_v_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_carousel_items_locale_idx" ON "_articles_v_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_carousel_items_image_idx" ON "_articles_v_blocks_carousel_items" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_carousel_order_idx" ON "_articles_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_carousel_parent_id_idx" ON "_articles_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_carousel_path_idx" ON "_articles_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_carousel_locale_idx" ON "_articles_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_carousel_image_only_order_idx" ON "_articles_v_blocks_carousel_image_only" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_carousel_image_only_parent_id_idx" ON "_articles_v_blocks_carousel_image_only" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_carousel_image_only_path_idx" ON "_articles_v_blocks_carousel_image_only" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_carousel_image_only_locale_idx" ON "_articles_v_blocks_carousel_image_only" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_banner_ctas_order_idx" ON "_articles_v_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_banner_ctas_parent_id_idx" ON "_articles_v_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_banner_ctas_locale_idx" ON "_articles_v_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_banner_order_idx" ON "_articles_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_banner_parent_id_idx" ON "_articles_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_banner_path_idx" ON "_articles_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_banner_locale_idx" ON "_articles_v_blocks_banner" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_double_image_order_idx" ON "_articles_v_blocks_double_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_double_image_parent_id_idx" ON "_articles_v_blocks_double_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_double_image_path_idx" ON "_articles_v_blocks_double_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_double_image_locale_idx" ON "_articles_v_blocks_double_image" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_double_image_first_image_idx" ON "_articles_v_blocks_double_image" USING btree ("first_image_id");
  CREATE INDEX "_articles_v_blocks_double_image_second_image_idx" ON "_articles_v_blocks_double_image" USING btree ("second_image_id");
  CREATE INDEX "_articles_v_blocks_usps_usps_order_idx" ON "_articles_v_blocks_usps_usps" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_usps_usps_parent_id_idx" ON "_articles_v_blocks_usps_usps" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_usps_usps_locale_idx" ON "_articles_v_blocks_usps_usps" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_usps_order_idx" ON "_articles_v_blocks_usps" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_usps_parent_id_idx" ON "_articles_v_blocks_usps" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_usps_path_idx" ON "_articles_v_blocks_usps" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_usps_locale_idx" ON "_articles_v_blocks_usps" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_rich_text_order_idx" ON "_articles_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_rich_text_parent_id_idx" ON "_articles_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_rich_text_path_idx" ON "_articles_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_rich_text_locale_idx" ON "_articles_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_card_list_cards_order_idx" ON "_articles_v_blocks_card_list_cards" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_card_list_cards_parent_id_idx" ON "_articles_v_blocks_card_list_cards" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_card_list_cards_locale_idx" ON "_articles_v_blocks_card_list_cards" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_card_list_cards_image_idx" ON "_articles_v_blocks_card_list_cards" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_card_list_order_idx" ON "_articles_v_blocks_card_list" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_card_list_parent_id_idx" ON "_articles_v_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_card_list_path_idx" ON "_articles_v_blocks_card_list" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_card_list_locale_idx" ON "_articles_v_blocks_card_list" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_article_index_order_idx" ON "_articles_v_blocks_article_index" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_index_parent_id_idx" ON "_articles_v_blocks_article_index" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_index_path_idx" ON "_articles_v_blocks_article_index" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_index_locale_idx" ON "_articles_v_blocks_article_index" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_articles_carousel_order_idx" ON "_articles_v_blocks_articles_carousel" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_articles_carousel_parent_id_idx" ON "_articles_v_blocks_articles_carousel" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_articles_carousel_path_idx" ON "_articles_v_blocks_articles_carousel" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_articles_carousel_locale_idx" ON "_articles_v_blocks_articles_carousel" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_hubspot_form_order_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hubspot_form_parent_id_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_hubspot_form_path_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_hubspot_form_locale_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_hubspot_form_hubspot_form_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("hubspot_form_id");
  CREATE INDEX "_articles_v_blocks_hubspot_form_image_idx" ON "_articles_v_blocks_hubspot_form" USING btree ("image_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_tenant_idx" ON "_articles_v" USING btree ("version_tenant_id");
  CREATE INDEX "_articles_v_version_preview_version_preview_image_idx" ON "_articles_v" USING btree ("version_preview_image_id");
  CREATE INDEX "_articles_v_version_version_folder_idx" ON "_articles_v" USING btree ("version_folder_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version_deleted_at_idx" ON "_articles_v" USING btree ("version_deleted_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_articles_v_version_seo_version_seo_image_idx" ON "_articles_v_locales" USING btree ("version_seo_image_id","_locale");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_texts_order_parent" ON "_articles_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_articles_v_texts_locale_parent" ON "_articles_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_locale_idx" ON "_articles_v_rels" USING btree ("locale");
  CREATE INDEX "_articles_v_rels_pages_id_idx" ON "_articles_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id","locale");
  CREATE INDEX "_articles_v_rels_images_id_idx" ON "_articles_v_rels" USING btree ("images_id","locale");
  CREATE INDEX "images_tenant_idx" ON "images" USING btree ("tenant_id");
  CREATE INDEX "images_folder_idx" ON "images" USING btree ("folder_id");
  CREATE INDEX "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX "images_filename_idx" ON "images" USING btree ("filename");
  CREATE INDEX "images_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "images_sizes_card_sizes_card_filename_idx" ON "images" USING btree ("sizes_card_filename");
  CREATE INDEX "images_sizes_tablet_sizes_tablet_filename_idx" ON "images" USING btree ("sizes_tablet_filename");
  CREATE INDEX "images_sizes_desktop_sizes_desktop_filename_idx" ON "images" USING btree ("sizes_desktop_filename");
  CREATE INDEX "images_sizes_background_sizes_background_filename_idx" ON "images" USING btree ("sizes_background_filename");
  CREATE UNIQUE INDEX "settings_home_page_tenant_idx" ON "settings_home_page" USING btree ("tenant_id");
  CREATE INDEX "settings_home_page_updated_at_idx" ON "settings_home_page" USING btree ("updated_at");
  CREATE INDEX "settings_home_page_created_at_idx" ON "settings_home_page" USING btree ("created_at");
  CREATE INDEX "settings_home_page_rels_order_idx" ON "settings_home_page_rels" USING btree ("order");
  CREATE INDEX "settings_home_page_rels_parent_idx" ON "settings_home_page_rels" USING btree ("parent_id");
  CREATE INDEX "settings_home_page_rels_path_idx" ON "settings_home_page_rels" USING btree ("path");
  CREATE INDEX "settings_home_page_rels_pages_id_idx" ON "settings_home_page_rels" USING btree ("pages_id");
  CREATE INDEX "settings_home_page_rels_articles_id_idx" ON "settings_home_page_rels" USING btree ("articles_id");
  CREATE INDEX "settings_header_links_nav_link_links_link_categories_order_idx" ON "settings_header_links_nav_link_links_link_categories" USING btree ("_order");
  CREATE INDEX "settings_header_links_nav_link_links_link_categories_parent_id_idx" ON "settings_header_links_nav_link_links_link_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_header_links_nav_link_links_link_categories_local_1" ON "settings_header_links_nav_link_links_link_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_header_links_nav_link_links_order_idx" ON "settings_header_links_nav_link_links" USING btree ("_order");
  CREATE INDEX "settings_header_links_nav_link_links_parent_id_idx" ON "settings_header_links_nav_link_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_header_links_nav_link_links_locales_locale_parent_i" ON "settings_header_links_nav_link_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_header_links_order_idx" ON "settings_header_links" USING btree ("_order");
  CREATE INDEX "settings_header_links_parent_id_idx" ON "settings_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_header_links_locales_locale_parent_id_unique" ON "settings_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "settings_header_tenant_idx" ON "settings_header" USING btree ("tenant_id");
  CREATE INDEX "settings_header_updated_at_idx" ON "settings_header" USING btree ("updated_at");
  CREATE INDEX "settings_header_created_at_idx" ON "settings_header" USING btree ("created_at");
  CREATE INDEX "settings_header_rels_order_idx" ON "settings_header_rels" USING btree ("order");
  CREATE INDEX "settings_header_rels_parent_idx" ON "settings_header_rels" USING btree ("parent_id");
  CREATE INDEX "settings_header_rels_path_idx" ON "settings_header_rels" USING btree ("path");
  CREATE INDEX "settings_header_rels_pages_id_idx" ON "settings_header_rels" USING btree ("pages_id");
  CREATE INDEX "settings_header_rels_articles_id_idx" ON "settings_header_rels" USING btree ("articles_id");
  CREATE INDEX "settings_footer_links_nav_link_links_order_idx" ON "settings_footer_links_nav_link_links" USING btree ("_order");
  CREATE INDEX "settings_footer_links_nav_link_links_parent_id_idx" ON "settings_footer_links_nav_link_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_footer_links_nav_link_links_locales_locale_parent_i" ON "settings_footer_links_nav_link_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_footer_links_order_idx" ON "settings_footer_links" USING btree ("_order");
  CREATE INDEX "settings_footer_links_parent_id_idx" ON "settings_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_footer_links_locales_locale_parent_id_unique" ON "settings_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "settings_footer_tenant_idx" ON "settings_footer" USING btree ("tenant_id");
  CREATE INDEX "settings_footer_updated_at_idx" ON "settings_footer" USING btree ("updated_at");
  CREATE INDEX "settings_footer_created_at_idx" ON "settings_footer" USING btree ("created_at");
  CREATE INDEX "settings_footer_rels_order_idx" ON "settings_footer_rels" USING btree ("order");
  CREATE INDEX "settings_footer_rels_parent_idx" ON "settings_footer_rels" USING btree ("parent_id");
  CREATE INDEX "settings_footer_rels_path_idx" ON "settings_footer_rels" USING btree ("path");
  CREATE INDEX "settings_footer_rels_pages_id_idx" ON "settings_footer_rels" USING btree ("pages_id");
  CREATE INDEX "settings_footer_rels_articles_id_idx" ON "settings_footer_rels" USING btree ("articles_id");
  CREATE UNIQUE INDEX "settings_socials_tenant_idx" ON "settings_socials" USING btree ("tenant_id");
  CREATE INDEX "settings_socials_updated_at_idx" ON "settings_socials" USING btree ("updated_at");
  CREATE INDEX "settings_socials_created_at_idx" ON "settings_socials" USING btree ("created_at");
  CREATE UNIQUE INDEX "settings_hubspot_tenant_idx" ON "settings_hubspot" USING btree ("tenant_id");
  CREATE INDEX "settings_hubspot_updated_at_idx" ON "settings_hubspot" USING btree ("updated_at");
  CREATE INDEX "settings_hubspot_created_at_idx" ON "settings_hubspot" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_workflow_slug_idx" ON "payload_jobs" USING btree ("workflow_slug");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_form_hubspot_id_idx" ON "payload_locked_documents_rels" USING btree ("form_hubspot_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX "payload_locked_documents_rels_settings_home_page_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_home_page_id");
  CREATE INDEX "payload_locked_documents_rels_settings_header_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_header_id");
  CREATE INDEX "payload_locked_documents_rels_settings_footer_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_footer_id");
  CREATE INDEX "payload_locked_documents_rels_settings_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_socials_id");
  CREATE INDEX "payload_locked_documents_rels_settings_hubspot_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_hubspot_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "payload_query_presets_updated_at_idx" ON "payload_query_presets" USING btree ("updated_at");
  CREATE INDEX "payload_query_presets_created_at_idx" ON "payload_query_presets" USING btree ("created_at");
  CREATE INDEX "payload_query_presets_rels_order_idx" ON "payload_query_presets_rels" USING btree ("order");
  CREATE INDEX "payload_query_presets_rels_parent_idx" ON "payload_query_presets_rels" USING btree ("parent_id");
  CREATE INDEX "payload_query_presets_rels_path_idx" ON "payload_query_presets_rels" USING btree ("path");
  CREATE INDEX "payload_query_presets_rels_users_id_idx" ON "payload_query_presets_rels" USING btree ("users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages_breadcrumbs_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text" CASCADE;
  DROP TABLE "pages_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "pages_blocks_column_text_cta" CASCADE;
  DROP TABLE "pages_blocks_column_columns" CASCADE;
  DROP TABLE "pages_blocks_column" CASCADE;
  DROP TABLE "pages_blocks_image_text_ctas" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_carousel_items" CASCADE;
  DROP TABLE "pages_blocks_carousel" CASCADE;
  DROP TABLE "pages_blocks_carousel_image_only" CASCADE;
  DROP TABLE "pages_blocks_banner_ctas" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_double_image" CASCADE;
  DROP TABLE "pages_blocks_usps_usps" CASCADE;
  DROP TABLE "pages_blocks_usps" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_card_list_cards" CASCADE;
  DROP TABLE "pages_blocks_card_list" CASCADE;
  DROP TABLE "pages_blocks_article_index" CASCADE;
  DROP TABLE "pages_blocks_articles_carousel" CASCADE;
  DROP TABLE "pages_blocks_hubspot_form" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text" CASCADE;
  DROP TABLE "_pages_v_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_column_text_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_column_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_column" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_items" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_image_only" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_double_image" CASCADE;
  DROP TABLE "_pages_v_blocks_usps_usps" CASCADE;
  DROP TABLE "_pages_v_blocks_usps" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_card_list_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_list" CASCADE;
  DROP TABLE "_pages_v_blocks_article_index" CASCADE;
  DROP TABLE "_pages_v_blocks_articles_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_hubspot_form" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "form_hubspot" CASCADE;
  DROP TABLE "form_hubspot_locales" CASCADE;
  DROP TABLE "users_tenants_roles" CASCADE;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "addresses_type" CASCADE;
  DROP TABLE "addresses" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "tenants_locales" CASCADE;
  DROP TABLE "articles_blocks_hero_ctas" CASCADE;
  DROP TABLE "articles_blocks_hero" CASCADE;
  DROP TABLE "articles_blocks_text" CASCADE;
  DROP TABLE "articles_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "articles_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "articles_blocks_column_multiple_text" CASCADE;
  DROP TABLE "articles_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "articles_blocks_column_text_cta" CASCADE;
  DROP TABLE "articles_blocks_column_columns" CASCADE;
  DROP TABLE "articles_blocks_column" CASCADE;
  DROP TABLE "articles_blocks_image_text_ctas" CASCADE;
  DROP TABLE "articles_blocks_image_text" CASCADE;
  DROP TABLE "articles_blocks_carousel_items" CASCADE;
  DROP TABLE "articles_blocks_carousel" CASCADE;
  DROP TABLE "articles_blocks_carousel_image_only" CASCADE;
  DROP TABLE "articles_blocks_banner_ctas" CASCADE;
  DROP TABLE "articles_blocks_banner" CASCADE;
  DROP TABLE "articles_blocks_double_image" CASCADE;
  DROP TABLE "articles_blocks_usps_usps" CASCADE;
  DROP TABLE "articles_blocks_usps" CASCADE;
  DROP TABLE "articles_blocks_rich_text" CASCADE;
  DROP TABLE "articles_blocks_card_list_cards" CASCADE;
  DROP TABLE "articles_blocks_card_list" CASCADE;
  DROP TABLE "articles_blocks_article_index" CASCADE;
  DROP TABLE "articles_blocks_articles_carousel" CASCADE;
  DROP TABLE "articles_blocks_hubspot_form" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "articles_texts" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_articles_v_blocks_hero" CASCADE;
  DROP TABLE "_articles_v_blocks_text" CASCADE;
  DROP TABLE "_articles_v_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "_articles_v_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "_articles_v_blocks_column_multiple_text" CASCADE;
  DROP TABLE "_articles_v_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "_articles_v_blocks_column_text_cta" CASCADE;
  DROP TABLE "_articles_v_blocks_column_columns" CASCADE;
  DROP TABLE "_articles_v_blocks_column" CASCADE;
  DROP TABLE "_articles_v_blocks_image_text_ctas" CASCADE;
  DROP TABLE "_articles_v_blocks_image_text" CASCADE;
  DROP TABLE "_articles_v_blocks_carousel_items" CASCADE;
  DROP TABLE "_articles_v_blocks_carousel" CASCADE;
  DROP TABLE "_articles_v_blocks_carousel_image_only" CASCADE;
  DROP TABLE "_articles_v_blocks_banner_ctas" CASCADE;
  DROP TABLE "_articles_v_blocks_banner" CASCADE;
  DROP TABLE "_articles_v_blocks_double_image" CASCADE;
  DROP TABLE "_articles_v_blocks_usps_usps" CASCADE;
  DROP TABLE "_articles_v_blocks_usps" CASCADE;
  DROP TABLE "_articles_v_blocks_rich_text" CASCADE;
  DROP TABLE "_articles_v_blocks_card_list_cards" CASCADE;
  DROP TABLE "_articles_v_blocks_card_list" CASCADE;
  DROP TABLE "_articles_v_blocks_article_index" CASCADE;
  DROP TABLE "_articles_v_blocks_articles_carousel" CASCADE;
  DROP TABLE "_articles_v_blocks_hubspot_form" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "_articles_v_texts" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "images" CASCADE;
  DROP TABLE "settings_home_page" CASCADE;
  DROP TABLE "settings_home_page_rels" CASCADE;
  DROP TABLE "settings_header_links_nav_link_links_link_categories" CASCADE;
  DROP TABLE "settings_header_links_nav_link_links_link_categories_locales" CASCADE;
  DROP TABLE "settings_header_links_nav_link_links" CASCADE;
  DROP TABLE "settings_header_links_nav_link_links_locales" CASCADE;
  DROP TABLE "settings_header_links" CASCADE;
  DROP TABLE "settings_header_links_locales" CASCADE;
  DROP TABLE "settings_header" CASCADE;
  DROP TABLE "settings_header_rels" CASCADE;
  DROP TABLE "settings_footer_links_nav_link_links" CASCADE;
  DROP TABLE "settings_footer_links_nav_link_links_locales" CASCADE;
  DROP TABLE "settings_footer_links" CASCADE;
  DROP TABLE "settings_footer_links_locales" CASCADE;
  DROP TABLE "settings_footer" CASCADE;
  DROP TABLE "settings_footer_rels" CASCADE;
  DROP TABLE "settings_socials" CASCADE;
  DROP TABLE "settings_hubspot" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_query_presets" CASCADE;
  DROP TABLE "payload_query_presets_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."link_type";
  DROP TYPE "public"."cta_variant";
  DROP TYPE "public"."cta_type";
  DROP TYPE "public"."cta_event";
  DROP TYPE "public"."heroVariant";
  DROP TYPE "public"."imageTextVariant";
  DROP TYPE "public"."carouselVariant";
  DROP TYPE "public"."uspsVariant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_users_tenants_roles";
  DROP TYPE "public"."enum_users_dark_mode";
  DROP TYPE "public"."enum_user_role";
  DROP TYPE "public"."enum_addresses_type";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."nav_link_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_workflow_slug";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_payload_query_presets_access_read_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_update_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_delete_constraint";
  DROP TYPE "public"."enum_payload_query_presets_related_collection";`)
}
