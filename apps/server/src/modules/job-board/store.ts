import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { jobApplication, jobCategory, jobPosting } from "@/lib/db/schema/job-board";

export const CATEGORY_TITLES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
] as const;

export type JobCategory = (typeof CATEGORY_TITLES)[number];
export type JobEmploymentType = "Full Time";

export type Category = {
  available_jobs: number;
  image_url: string;
  title: JobCategory;
};

export type Job = {
  category: JobCategory;
  company: string;
  created_at: string;
  description: string;
  employment_type: JobEmploymentType;
  id: string;
  image_url: string;
  location: string;
  title: string;
};

export type Application = {
  cover_note: string;
  created_at: string;
  email: string;
  id: string;
  job_id: string;
  name: string;
  resume_link: string;
};

type CreateJobInput = Omit<Job, "created_at" | "id">;
type CreateApplicationInput = Omit<Application, "created_at" | "id">;

type JobFilters = {
  category: string;
  location: string;
  search: string;
};

const categorySeedData: Array<{
  available_jobs: number;
  id: string;
  image_url: string;
  title: JobCategory;
}> = [
  {
    id: "category_design",
    title: "Design",
    available_jobs: 235,
    image_url: "/assets/categories/Icon.png",
  },
  {
    id: "category_sales",
    title: "Sales",
    available_jobs: 756,
    image_url: "/assets/categories/Icon-1.png",
  },
  {
    id: "category_marketing",
    title: "Marketing",
    available_jobs: 140,
    image_url: "/assets/categories/Icon-2.png",
  },
  {
    id: "category_finance",
    title: "Finance",
    available_jobs: 325,
    image_url: "/assets/categories/Icon-3.png",
  },
  {
    id: "category_technology",
    title: "Technology",
    available_jobs: 436,
    image_url: "/assets/categories/Icon-4.png",
  },
  {
    id: "category_engineering",
    title: "Engineering",
    available_jobs: 542,
    image_url: "/assets/categories/Icon-5.png",
  },
  {
    id: "category_business",
    title: "Business",
    available_jobs: 211,
    image_url: "/assets/categories/Icon-6.png",
  },
  {
    id: "category_human_resource",
    title: "Human Resource",
    available_jobs: 346,
    image_url: "/assets/categories/Icon-7.png",
  },
];

const jobSeedData: Array<{
  category: JobCategory;
  company: string;
  description: string;
  employment_type: JobEmploymentType;
  id: string;
  image_url: string;
  location: string;
  title: string;
}> = [
  {
    id: "job_01",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    image_url: "/assets/author-companies/R.png",
    employment_type: "Full Time",
    description:
      "Revolut is looking for Email Marketing to help team market products...",
  },
  {
    id: "job_02",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    category: "Design",
    image_url: "/assets/author-companies/company-logo.png",
    employment_type: "Full Time",
    description:
      "Dropbox is looking for Brand Designer to help the team think creatively...",
  },
  {
    id: "job_03",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    category: "Marketing",
    image_url: "/assets/author-companies/company-logo-1.png",
    employment_type: "Full Time",
    description:
      "Pitch is looking for Customer Manager to join marketing team...",
  },
  {
    id: "job_04",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    category: "Design",
    image_url: "/assets/author-companies/company-logo-2.png",
    employment_type: "Full Time",
    description:
      "Blinklist is looking for Visual Designer to help team design assets...",
  },
  {
    id: "job_05",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    category: "Design",
    image_url: "/assets/author-companies/company-logo-3.png",
    employment_type: "Full Time",
    description:
      "ClassPass is looking for Product Designer to help us build better UX...",
  },
  {
    id: "job_06",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    category: "Design",
    image_url: "/assets/author-companies/company-logo-4.png",
    employment_type: "Full Time",
    description:
      "Canva is looking for Lead Engineer to help develop new experiences...",
  },
  {
    id: "job_07",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    image_url: "/assets/author-companies/company-logo-5.png",
    employment_type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
  },
  {
    id: "job_08",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Technology",
    image_url: "/assets/author-companies/company-logo-6.png",
    employment_type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team design...",
  },
];

let isSeeded = false;

const toIsoString = (value: Date | string): string => {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
};

const mapCategory = (row: typeof jobCategory.$inferSelect): Category => {
  return {
    title: row.title as JobCategory,
    available_jobs: row.availableJobs,
    image_url: row.imageUrl,
  };
};

const mapJob = (row: typeof jobPosting.$inferSelect): Job => {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    category: row.category as JobCategory,
    image_url: row.imageUrl,
    employment_type: row.employmentType as JobEmploymentType,
    description: row.description,
    created_at: toIsoString(row.createdAt),
  };
};

const mapApplication = (row: typeof jobApplication.$inferSelect): Application => {
  return {
    id: row.id,
    job_id: row.jobId,
    name: row.name,
    email: row.email,
    resume_link: row.resumeLink,
    cover_note: row.coverNote,
    created_at: toIsoString(row.createdAt),
  };
};

export const initializeJobBoardData = async (): Promise<void> => {
  if (isSeeded) {
    return;
  }

  const [categoryCountRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(jobCategory);

  if ((categoryCountRow?.count ?? 0) === 0) {
    await db.insert(jobCategory).values(
      categorySeedData.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        availableJobs: item.available_jobs,
      })),
    );
  }

  const [jobCountRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(jobPosting);

  if ((jobCountRow?.count ?? 0) === 0) {
    await db.insert(jobPosting).values(
      jobSeedData.map((item) => ({
        id: item.id,
        title: item.title,
        company: item.company,
        location: item.location,
        category: item.category,
        imageUrl: item.image_url,
        employmentType: item.employment_type,
        description: item.description,
      })),
    );
  }

  isSeeded = true;
};

export const getCategories = async (): Promise<Category[]> => {
  await initializeJobBoardData();
  const rows = await db.select().from(jobCategory).orderBy(jobCategory.title);
  return rows.map(mapCategory);
};

export const getJobs = async ({
  search,
  category,
  location,
}: JobFilters): Promise<Job[]> => {
  await initializeJobBoardData();

  const normalizedSearch = search.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedLocation = location.trim().toLowerCase();

  const conditions = [];

  if (normalizedSearch) {
    conditions.push(
      or(
        ilike(jobPosting.title, `%${normalizedSearch}%`),
        ilike(jobPosting.company, `%${normalizedSearch}%`),
        ilike(jobPosting.description, `%${normalizedSearch}%`),
        ilike(jobPosting.location, `%${normalizedSearch}%`),
      ),
    );
  }

  if (normalizedCategory) {
    conditions.push(ilike(jobPosting.category, normalizedCategory));
  }

  if (normalizedLocation) {
    conditions.push(ilike(jobPosting.location, `%${normalizedLocation}%`));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(jobPosting)
    .where(whereClause)
    .orderBy(desc(jobPosting.createdAt));

  return rows.map(mapJob);
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  await initializeJobBoardData();
  const [row] = await db.select().from(jobPosting).where(eq(jobPosting.id, id)).limit(1);
  return row ? mapJob(row) : undefined;
};

export const createJob = async (payload: CreateJobInput): Promise<Job> => {
  await initializeJobBoardData();

  const id = `job_${randomUUID()}`;
  await db.insert(jobPosting).values({
    id,
    title: payload.title,
    company: payload.company,
    location: payload.location,
    category: payload.category,
    imageUrl: payload.image_url,
    employmentType: payload.employment_type,
    description: payload.description,
  });

  await db
    .update(jobCategory)
    .set({
      availableJobs: sql`GREATEST(${jobCategory.availableJobs} + 1, 0)`,
    })
    .where(eq(jobCategory.title, payload.category));

  const [createdRow] = await db
    .select()
    .from(jobPosting)
    .where(eq(jobPosting.id, id))
    .limit(1);

  return mapJob(createdRow!);
};

export const deleteJob = async (id: string): Promise<Job | undefined> => {
  await initializeJobBoardData();

  const [existing] = await db
    .select()
    .from(jobPosting)
    .where(eq(jobPosting.id, id))
    .limit(1);

  if (!existing) {
    return undefined;
  }

  await db.delete(jobPosting).where(eq(jobPosting.id, id));

  await db
    .update(jobCategory)
    .set({
      availableJobs: sql`GREATEST(${jobCategory.availableJobs} - 1, 0)`,
    })
    .where(eq(jobCategory.title, existing.category));

  return mapJob(existing);
};

export const createApplication = async (
  payload: CreateApplicationInput,
): Promise<Application> => {
  await initializeJobBoardData();

  const id = `application_${randomUUID()}`;

  await db.insert(jobApplication).values({
    id,
    jobId: payload.job_id,
    name: payload.name,
    email: payload.email,
    resumeLink: payload.resume_link,
    coverNote: payload.cover_note,
  });

  const [createdRow] = await db
    .select()
    .from(jobApplication)
    .where(eq(jobApplication.id, id))
    .limit(1);

  return mapApplication(createdRow!);
};

export const getApplications = async (): Promise<Application[]> => {
  await initializeJobBoardData();
  const rows = await db.select().from(jobApplication).orderBy(desc(jobApplication.createdAt));
  return rows.map(mapApplication);
};

