import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jobCategory = pgTable(
  "job_category",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull().unique(),
    imageUrl: text("image_url").notNull(),
    availableJobs: integer("available_jobs").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("job_category_title_idx").on(table.title)],
);

export const jobPosting = pgTable(
  "job_posting",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    company: text("company").notNull(),
    location: text("location").notNull(),
    category: text("category").notNull(),
    imageUrl: text("image_url").notNull(),
    employmentType: text("employment_type").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("job_posting_category_idx").on(table.category),
    index("job_posting_location_idx").on(table.location),
    index("job_posting_created_at_idx").on(table.createdAt),
  ],
);

export const jobApplication = pgTable(
  "job_application",
  {
    id: text("id").primaryKey(),
    jobId: text("job_id")
      .notNull()
      .references(() => jobPosting.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    resumeLink: text("resume_link").notNull(),
    coverNote: text("cover_note").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("job_application_job_id_idx").on(table.jobId),
    index("job_application_created_at_idx").on(table.createdAt),
  ],
);
