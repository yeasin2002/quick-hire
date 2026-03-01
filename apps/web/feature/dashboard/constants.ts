export const ADMIN_JOB_CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
] as const;

export type AdminJobCategory = (typeof ADMIN_JOB_CATEGORIES)[number];

export type AdminJob = {
  category: AdminJobCategory;
  company: string;
  created_at: string;
  description: string;
  employment_type: "Full Time";
  id: string;
  image_url: string;
  location: string;
  title: string;
};

export type AdminCategory = {
  available_jobs: number;
  image_url: string;
  title: AdminJobCategory;
};

export type AdminJobCreateInput = {
  category: AdminJobCategory;
  company: string;
  description: string;
  employment_type: "Full Time";
  image_url: string;
  location: string;
  title: string;
};
