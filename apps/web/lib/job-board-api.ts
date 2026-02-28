import { cache } from "react";

export type ApiCategory = {
  available_jobs: number;
  image_url: string;
  title: string;
};

export type ApiJob = {
  category: string;
  company: string;
  created_at: string;
  description: string;
  employment_type: string;
  id: string;
  image_url: string;
  location: string;
  title: string;
};

type ApiListResponse<T> = {
  data?: T;
  success?: boolean;
};

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

const getApiBaseUrl = (): string => {
  return API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
};

const toApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const fetchList = async <T>(path: string): Promise<T[]> => {
  try {
    const response = await fetch(toApiUrl(path), {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ApiListResponse<T[]>;
    if (!payload.success || !Array.isArray(payload.data)) {
      return [];
    }

    return payload.data;
  } catch {
    return [];
  }
};

export const getCategoriesApi = cache(async (): Promise<ApiCategory[]> => {
  return fetchList<ApiCategory>("/api/categories");
});

export const getJobsApi = cache(async (): Promise<ApiJob[]> => {
  return fetchList<ApiJob>("/api/jobs");
});
