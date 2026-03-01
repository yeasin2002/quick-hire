import "server-only";

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

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
  success?: boolean;
};

type ApiSuccessResponse<T> = {
  data?: T;
  success?: boolean;
};

export type AdminApiResult<T> =
  | {
      data: T;
      ok: true;
      status: number;
    }
  | {
      message: string;
      ok: false;
      status: number;
    };

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY ?? "";

const getApiBaseUrl = (): string => {
  return API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
};

const toApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const getErrorMessage = (
  payload: ApiErrorResponse | undefined,
  fallback: string,
): string => {
  return (
    payload?.error?.message?.trim() || payload?.message?.trim() || fallback
  );
};

const request = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<AdminApiResult<T>> => {
  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (ADMIN_API_KEY) {
      headers.set("x-admin-key", ADMIN_API_KEY);
    }

    const response = await fetch(toApiUrl(path), {
      ...init,
      cache: "no-store",
      headers,
    });

    const raw = await response.text();
    const payload = raw ? (JSON.parse(raw) as ApiSuccessResponse<T> | ApiErrorResponse) : undefined;

    if (!response.ok) {
      return {
        message: getErrorMessage(
          payload as ApiErrorResponse | undefined,
          `Request failed with status ${response.status}`,
        ),
        ok: false,
        status: response.status,
      };
    }

    return {
      data: (payload as ApiSuccessResponse<T> | undefined)?.data as T,
      ok: true,
      status: response.status,
    };
  } catch {
    return {
      message: "Could not connect to the backend service.",
      ok: false,
      status: 500,
    };
  }
};

export const getAdminJobs = async (): Promise<AdminApiResult<AdminJob[]>> => {
  return request<AdminJob[]>("/api/admin/jobs");
};

export const getAdminCategories = async (): Promise<
  AdminApiResult<AdminCategory[]>
> => {
  return request<AdminCategory[]>("/api/categories");
};

export const createAdminJob = async (
  input: AdminJobCreateInput,
): Promise<AdminApiResult<AdminJob>> => {
  return request<AdminJob>("/api/admin/jobs", {
    body: JSON.stringify(input),
    method: "POST",
  });
};

export const deleteAdminJob = async (
  jobId: string,
): Promise<AdminApiResult<AdminJob>> => {
  return request<AdminJob>(`/api/admin/jobs/${jobId}`, {
    method: "DELETE",
  });
};

