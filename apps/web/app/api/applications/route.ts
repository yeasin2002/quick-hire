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
  success?: boolean;
};

const createApplicationSchema = z.object({
  cover_note: z.string().trim().min(1, "Cover note is required."),
  email: z.string().trim().email("Enter a valid email address."),
  job_id: z.string().trim().min(1, "Job id is required."),
  name: z.string().trim().min(1, "Name is required."),
  resume_link: z.string().trim().url("Resume link must be a valid URL."),
});

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

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

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "Invalid JSON payload.",
        },
      },
      { status: 400 },
    );
  }

  const parsed = createApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message ?? "Validation failed.",
        },
      },
      { status: 422 },
    );
  }

  try {
    const response = await fetch(toApiUrl("/api/applications"), {
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const raw = await response.text();
    const payload = raw
      ? (JSON.parse(raw) as ApiSuccessResponse<unknown> | ApiErrorResponse)
      : undefined;

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SUBMIT_APPLICATION_FAILED",
            message: getErrorMessage(
              payload as ApiErrorResponse | undefined,
              `Request failed with status ${response.status}`,
            ),
          },
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: (payload as ApiSuccessResponse<unknown> | undefined)?.data,
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
