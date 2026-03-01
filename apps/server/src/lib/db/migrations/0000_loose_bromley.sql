CREATE TABLE "job_application" (
	"id" text PRIMARY KEY NOT NULL,
	"job_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"resume_link" text NOT NULL,
	"cover_note" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_category" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image_url" text NOT NULL,
	"available_jobs" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "job_category_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "job_posting" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text NOT NULL,
	"category" text NOT NULL,
	"image_url" text NOT NULL,
	"employment_type" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_job_id_job_posting_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_posting"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_application_job_id_idx" ON "job_application" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "job_application_created_at_idx" ON "job_application" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "job_category_title_idx" ON "job_category" USING btree ("title");--> statement-breakpoint
CREATE INDEX "job_posting_category_idx" ON "job_posting" USING btree ("category");--> statement-breakpoint
CREATE INDEX "job_posting_location_idx" ON "job_posting" USING btree ("location");--> statement-breakpoint
CREATE INDEX "job_posting_created_at_idx" ON "job_posting" USING btree ("created_at");