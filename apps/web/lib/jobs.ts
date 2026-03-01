import { jobs as localJobs } from "@/data/job.data";
import type { StaticImageData } from "next/image";
import { cache } from "react";
import { getJobByIdApi, getJobsApi, type ApiJob } from "./job-board-api";

export type JobRecord = {
  category: string;
  company: string;
  createdAt?: string;
  description: string;
  employmentType: string;
  id: string;
  imageUrl: string | StaticImageData;
  location: string;
  title: string;
};

const toApiJobRecord = (job: ApiJob): JobRecord => {
  return {
    category: job.category,
    company: job.company,
    createdAt: job.created_at,
    description: job.description,
    employmentType: job.employment_type,
    id: job.id,
    imageUrl: job.image_url,
    location: job.location,
    title: job.title,
  };
};

const LOCAL_FALLBACK_JOBS: JobRecord[] = localJobs.map((job, index) => {
  return {
    category: job.tags[0] ?? "Design",
    company: job.company,
    description: job.description,
    employmentType: job.job_type,
    id: `local-${index + 1}`,
    imageUrl: job.logo,
    location: `${job.location}, ${job.country}`,
    title: job.title,
  };
});

const getLocalFallbackJobById = (jobId: string): JobRecord | null => {
  return LOCAL_FALLBACK_JOBS.find((job) => job.id === jobId) ?? null;
};

export const getJobsWithFallback = cache(async (): Promise<JobRecord[]> => {
  const jobs = await getJobsApi();
  if (jobs.length > 0) {
    return jobs.map(toApiJobRecord);
  }

  return LOCAL_FALLBACK_JOBS;
});

export const getJobWithFallbackById = cache(
  async (jobId: string): Promise<JobRecord | null> => {
    if (jobId.startsWith("local-")) {
      return getLocalFallbackJobById(jobId);
    }

    const apiJob = await getJobByIdApi(jobId);
    if (apiJob) {
      return toApiJobRecord(apiJob);
    }

    return getLocalFallbackJobById(jobId);
  },
);
