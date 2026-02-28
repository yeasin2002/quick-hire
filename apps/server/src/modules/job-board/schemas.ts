import { z } from "zod";
import { CATEGORY_TITLES } from "./store";

export const createJobSchema = z.object({
  title: z.string().trim().min(1),
  company: z.string().trim().min(1),
  location: z.string().trim().min(1),
  category: z.enum(CATEGORY_TITLES),
  description: z.string().trim().min(10),
  employment_type: z.literal("Full Time").default("Full Time"),
});

export const createApplicationSchema = z.object({
  job_id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  email: z.email(),
  resume_link: z.url(),
  cover_note: z.string().trim().min(10),
});

