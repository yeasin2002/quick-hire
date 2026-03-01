import "server-only";
import type { AdminCategory, AdminJob, AdminJobCreateInput } from "./constants";
export type {
  AdminCategory,
  AdminJob,
  AdminJobCategory,
  AdminJobCreateInput,
} from "./constants";

export type UploadedAdminImage = {
  fileId: string;
  height?: number;
  name: string;
  thumbnailUrl?: string;
  url: string;
  width?: number;
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
    const payload = raw
      ? (JSON.parse(raw) as ApiSuccessResponse<T> | ApiErrorResponse)
      : undefined;

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

const requestFormData = async <T>(
  path: string,
  body: FormData,
): Promise<AdminApiResult<T>> => {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");

    if (ADMIN_API_KEY) {
      headers.set("x-admin-key", ADMIN_API_KEY);
    }

    const response = await fetch(toApiUrl(path), {
      body,
      cache: "no-store",
      headers,
      method: "POST",
    });

    const raw = await response.text();
    const payload = raw
      ? (JSON.parse(raw) as ApiSuccessResponse<T> | ApiErrorResponse)
      : undefined;

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
    method: "PATCH",
  });
};

export const uploadAdminImage = async (
  file: File,
  folder = "/quick-hire/author-companies",
): Promise<AdminApiResult<UploadedAdminImage>> => {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("folder", folder);

  return requestFormData<UploadedAdminImage>(
    "/api/admin/uploads/image",
    formData,
  );
};

export const deleteAdminJob = async (
  jobId: string,
): Promise<AdminApiResult<AdminJob>> => {
  return request<AdminJob>(`/api/admin/jobs/${jobId}`, {
    method: "DELETE",
  });
};
