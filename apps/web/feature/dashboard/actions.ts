"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_JOB_CATEGORIES, type AdminJobCategory } from "./constants";
import {
  createAdminJob,
  deleteAdminJob,
  uploadAdminImage,
} from "./admin-api";

const toRedirectUrl = (
  path: string,
  params: Record<string, string | undefined>,
): string => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      search.set(key, value);
    }
  }

  const query = search.toString();
  return query ? `${path}?${query}` : path;
};

const normalizeString = (value: FormDataEntryValue | null): string => {
  return typeof value === "string" ? value.trim() : "";
};

const isValidCategory = (value: string): value is (typeof ADMIN_JOB_CATEGORIES)[number] => {
  return (ADMIN_JOB_CATEGORIES as readonly string[]).includes(value);
};

export async function deleteJobAction(formData: FormData): Promise<void> {
  const jobId = normalizeString(formData.get("job_id"));

  if (!jobId) {
    redirect(
      toRedirectUrl("/dashboard", {
        error: "Could not delete the job. Missing job ID.",
      }),
    );
  }

  const result = await deleteAdminJob(jobId);
  if (!result.ok) {
    redirect(
      toRedirectUrl("/dashboard", {
        error: result.message,
      }),
    );
  }

  revalidatePath("/dashboard");
  redirect(
    toRedirectUrl("/dashboard", {
      notice: "Job deleted successfully.",
    }),
  );
}

export async function createJobAction(formData: FormData): Promise<void> {
  const title = normalizeString(formData.get("title"));
  const company = normalizeString(formData.get("company"));
  const location = normalizeString(formData.get("location"));
  const category = normalizeString(formData.get("category"));
  const description = normalizeString(formData.get("description"));
  const companyLogo = formData.get("company_logo");

  if (!title || !company || !location || !description) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: "Please fill in all required fields.",
      }),
    );
  }

  if (!(companyLogo instanceof File) || companyLogo.size === 0) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: "Company logo is required.",
      }),
    );
  }

  if (!companyLogo.type.startsWith("image/")) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: "Company logo must be an image file.",
      }),
    );
  }

  if (!isValidCategory(category)) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: "Please select a valid category.",
      }),
    );
  }
  const validCategory = category as AdminJobCategory;

  if (description.length < 10) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: "Description should be at least 10 characters long.",
      }),
    );
  }

  const uploadResult = await uploadAdminImage(
    companyLogo,
    "/quick-hire/author-companies",
  );

  if (!uploadResult.ok) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: uploadResult.message,
      }),
    );
  }

  const result = await createAdminJob({
    category: validCategory,
    company,
    description,
    employment_type: "Full Time",
    image_url: uploadResult.data.url,
    location,
    title,
  });

  if (!result.ok) {
    redirect(
      toRedirectUrl("/dashboard/new-job", {
        error: result.message,
      }),
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/new-job");
  redirect(
    toRedirectUrl("/dashboard", {
      notice: "Job added successfully.",
    }),
  );
}
