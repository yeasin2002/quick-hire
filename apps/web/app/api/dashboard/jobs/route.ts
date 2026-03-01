import { ADMIN_JOB_CATEGORIES } from "@/feature/dashboard/constants";
import { NextResponse } from "next/server";
import { z } from "zod";

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};

type ApiSuccessResponse<T> = {
  data?: T;
};

type UploadedImage = {
  url: string;
};

type BackendResult<T> = {
  ok: boolean;
  payload?: ApiSuccessResponse<T> | ApiErrorResponse;
  status: number;
};

const createJobSchema = z.object({
  category: z.enum(ADMIN_JOB_CATEGORIES),
  company: z.string().trim().min(1, "Company is required"),
  description: z.string().trim().min(10, "Description should be at least 10 characters long"),
  location: z.string().trim().min(1, "Location is required"),
  title: z.string().trim().min(1, "Title is required"),
});

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000";

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
  return payload?.error?.message?.trim() || payload?.message?.trim() || fallback;
};

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const companyLogo = formData.get("company_logo");

  const parsed = createJobSchema.safeParse({
    category,
    company,
    description,
    location,
    title,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message ?? "Validation failed",
        },
      },
      { status: 422 },
    );
  }

  if (!(companyLogo instanceof File) || companyLogo.size === 0) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Company logo is required.",
        },
      },
      { status: 422 },
    );
  }

  if (!companyLogo.type.startsWith("image/")) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Company logo must be an image file.",
        },
      },
      { status: 422 },
    );
  }

  try {
    const uploadPayload = new FormData();
    uploadPayload.set("file", companyLogo);
    uploadPayload.set("folder", "/quick-hire/author-companies");

    const uploadHeaders = new Headers();
    uploadHeaders.set("Accept", "application/json");
    if (ADMIN_API_KEY) {
      uploadHeaders.set("x-admin-key", ADMIN_API_KEY);
    }

    const uploadResponse = await fetch(toApiUrl("/api/admin/uploads/image"), {
      body: uploadPayload,
      cache: "no-store",
      headers: uploadHeaders,
      method: "POST",
    });

    const uploadRaw = await uploadResponse.text();
    const uploadJson = uploadRaw
      ? (JSON.parse(uploadRaw) as ApiSuccessResponse<UploadedImage> | ApiErrorResponse)
      : undefined;

    if (!uploadResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPLOAD_FAILED",
            message: getErrorMessage(
              uploadJson as ApiErrorResponse | undefined,
              `Image upload failed with status ${uploadResponse.status}`,
            ),
          },
        },
        { status: uploadResponse.status },
      );
    }

    const imageUrl = (uploadJson as ApiSuccessResponse<UploadedImage> | undefined)?.data?.url;
    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPLOAD_FAILED",
            message: "Image upload failed. Missing uploaded image URL.",
          },
        },
        { status: 502 },
      );
    }

    const createHeaders = new Headers();
    createHeaders.set("Accept", "application/json");
    createHeaders.set("Content-Type", "application/json");
    if (ADMIN_API_KEY) {
      createHeaders.set("x-admin-key", ADMIN_API_KEY);
    }

    const jobCreatePayload = JSON.stringify({
      ...parsed.data,
      employment_type: "Full Time",
      image_url: imageUrl,
    });

    const callCreateJob = async (
      method: "PATCH" | "POST",
    ): Promise<BackendResult<unknown>> => {
      const response = await fetch(toApiUrl("/api/admin/jobs"), {
        body: jobCreatePayload,
        cache: "no-store",
        headers: createHeaders,
        method,
      });
      const raw = await response.text();
      const payload = raw
        ? (JSON.parse(raw) as ApiSuccessResponse<unknown> | ApiErrorResponse)
        : undefined;
      return {
        ok: response.ok,
        payload,
        status: response.status,
      };
    };

    let createResult = await callCreateJob("PATCH");
    const routeMessage = getErrorMessage(
      createResult.payload as ApiErrorResponse | undefined,
      "",
    ).toLowerCase();
    if (!createResult.ok && (createResult.status === 404 || routeMessage.includes("route not found"))) {
      createResult = await callCreateJob("POST");
    }

    if (!createResult.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CREATE_JOB_FAILED",
            message: getErrorMessage(
              createResult.payload as ApiErrorResponse | undefined,
              `Create job failed with status ${createResult.status}`,
            ),
          },
        },
        { status: createResult.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: (createResult.payload as ApiSuccessResponse<unknown> | undefined)?.data,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not connect to the backend service.",
        },
      },
      { status: 500 },
    );
  }
}
