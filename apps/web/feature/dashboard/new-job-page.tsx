"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { ArrowLeft, FileImage, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";
import {
  ADMIN_JOB_CATEGORIES,
  type AdminCategory,
  type AdminJobCategory,
} from "./constants";

type NewJobPageProps = {
  categories: AdminCategory[];
  error?: string;
};

type NewJobFormValues = {
  category: AdminJobCategory;
  company: string;
  company_logo: FileList;
  description: string;
  location: string;
  title: string;
};

type ErrorPayload = {
  error?: {
    message?: string;
  };
  message?: string;
};

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z.string().trim().min(1, "Location is required"),
  category: z.enum(ADMIN_JOB_CATEGORIES),
  description: z
    .string()
    .trim()
    .min(10, "Description should be at least 10 characters long"),
  company_logo: z
    .custom<FileList>(
      (value) => value instanceof FileList && value.length > 0,
      { message: "Company logo is required" },
    )
    .refine((files) => files.item(0)?.type.startsWith("image/") ?? false, {
      message: "Company logo must be an image file",
    }),
});

const decodeMessage = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getSubmitErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as ErrorPayload;
    return (
      payload?.error?.message?.trim() ||
      payload?.message?.trim() ||
      `Request failed with status ${response.status}`
    );
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export function NewJobPage({ categories, error }: NewJobPageProps) {
  const router = useRouter();
  const options =
    categories.length > 0
      ? categories.map((category) => category.title)
      : [...ADMIN_JOB_CATEGORIES];
  const safeError = decodeMessage(error);
  const [submitError, setSubmitError] = useState<string | undefined>(safeError);

  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<NewJobFormValues>({
    defaultValues: {
      category: (options[0] ?? ADMIN_JOB_CATEGORIES[0]) as AdminJobCategory,
      company: "",
      description: "",
      location: "",
      title: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(undefined);
    clearErrors();

    const validation = formSchema.safeParse(values);
    if (!validation.success) {
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof NewJobFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      }
      return;
    }

    const companyLogoFile = validation.data.company_logo.item(0);
    if (!companyLogoFile) {
      setError("company_logo", {
        type: "manual",
        message: "Company logo is required",
      });
      return;
    }

    const payload = new FormData();
    payload.set("title", validation.data.title);
    payload.set("company", validation.data.company);
    payload.set("location", validation.data.location);
    payload.set("category", validation.data.category);
    payload.set("description", validation.data.description);
    payload.set("company_logo", companyLogoFile);

    const response = await fetch("/api/dashboard/jobs", {
      body: payload,
      method: "POST",
    });

    if (!response.ok) {
      setSubmitError(await getSubmitErrorMessage(response));
      return;
    }

    router.push("/dashboard?notice=Job%20added%20successfully.");
    router.refresh();
  });

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(960px_420px_at_8%_-10%,#E3E5FF_0%,transparent_64%)]"
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <header className="relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#4640DE] hover:text-[#5B56E8]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back To Dashboard
          </Link>

          <h1 className="mt-4 text-[34px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[44px]">
            Add New Job
          </h1>
          <p className="mt-3 max-w-185 text-[17px] leading-[1.45] text-[#515B6F] font-epilogue">
            Fill in the job details below and publish when ready.
          </p>
        </header>

        {submitError ? (
          <p className="relative z-10 mt-5 rounded-xl border border-[#F7CFCF] bg-[#FFF1F1] px-4 py-3 text-[14px] font-medium text-[#C03F3F]">
            {submitError}
          </p>
        ) : null}

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
            <form
              onSubmit={onSubmit}
              className="space-y-5"
              aria-busy={isSubmitting}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormControl
                  id="job-title"
                  label="Title"
                  placeholder="Senior Product Designer..."
                  registration={register("title")}
                  disabled={isSubmitting}
                  error={errors.title?.message}
                />

                <FormControl
                  id="job-company"
                  label="Company"
                  placeholder="QuickHire..."
                  registration={register("company")}
                  disabled={isSubmitting}
                  error={errors.company?.message}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormControl
                  id="job-location"
                  label="Location"
                  placeholder="Dhaka, Bangladesh..."
                  registration={register("location")}
                  disabled={isSubmitting}
                  error={errors.location?.message}
                />
                <div>
                  <label
                    htmlFor="job-category"
                    className="text-[14px] font-semibold text-[#25324B]"
                  >
                    Category
                  </label>
                  <select
                    id="job-category"
                    disabled={isSubmitting}
                    className="mt-2 h-10 w-full rounded-[11px] border border-[#D6DDEB] bg-white px-3 text-[14px] text-[#25324B] outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] disabled:cursor-not-allowed disabled:opacity-70"
                    {...register("category")}
                  >
                    {options.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category?.message ? (
                    <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
                      {errors.category.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="job-company-logo"
                  className="text-[14px] font-semibold text-[#25324B]"
                >
                  Company Logo
                </label>
                <Input
                  id="job-company-logo"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  {...register("company_logo")}
                  className="mt-2 h-10 rounded-[11px] border-[#D6DDEB] bg-white text-[#25324B] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#ECEBFF] file:px-3 file:py-1 file:text-[12px] file:font-semibold file:text-[#4640DE] hover:file:bg-[#E0DFFF] disabled:cursor-not-allowed disabled:opacity-70"
                />
                {errors.company_logo?.message ? (
                  <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
                    {errors.company_logo.message}
                  </p>
                ) : null}
              </div>

              <div className="rounded-xl border border-[#E6E9F3] bg-[#FAFBFF] p-4">
                <div className="flex items-start gap-3">
                  <FileImage
                    aria-hidden="true"
                    className="mt-0.5 size-5 text-[#4640DE]"
                  />
                  <p className="text-[14px] text-[#515B6F]">
                    Upload a logo image.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="job-description"
                  className="text-[14px] font-semibold text-[#25324B]"
                >
                  Description
                </label>
                <textarea
                  id="job-description"
                  rows={6}
                  disabled={isSubmitting}
                  placeholder="Write role responsibilities, required skills, and key expectations..."
                  className="mt-2 w-full rounded-[11px] border border-[#D6DDEB] bg-white px-3 py-2.5 text-[14px] text-[#25324B] outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] disabled:cursor-not-allowed disabled:opacity-70"
                  {...register("description")}
                />
                {errors.description?.message ? (
                  <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
                    {errors.description.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="job-employment-type"
                  className="text-[14px] font-semibold text-[#25324B]"
                >
                  Employment Type
                </label>
                <Input
                  id="job-employment-type"
                  defaultValue="Full Time"
                  readOnly
                  className="mt-2 h-10 rounded-[11px] border-[#D6DDEB] bg-[#F9FAFD] text-[#25324B]"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link href="/dashboard">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    className="h-11 rounded-[12px] border-[#D6DDEB] bg-white px-5 text-[#25324B] hover:bg-[#F6F7FB]"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-[12px] bg-[#4640DE] px-5 text-white hover:bg-[#5651EA]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="size-4 animate-spin"
                      />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Plus aria-hidden="true" className="size-4" />
                      Add Job
                    </>
                  )}
                </Button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Before You Publish
              </h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-[1.45] text-[#515B6F]">
                <li>Use a clear and specific job title.</li>
                <li>Choose the most relevant category.</li>
                <li>Add a short but complete job description.</li>
                <li>Upload a clear company logo image before saving.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Category Guide
              </h2>
              <p className="mt-2 text-[14px] text-[#515B6F]">
                Pick the category that best describes the role.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {options.map((category) => (
                  <span
                    key={category}
                    className="inline-flex h-8 items-center rounded-full bg-[#ECEBFF] px-3 text-[12px] font-semibold text-[#4640DE]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FormControl({
  id,
  label,
  placeholder,
  registration,
  disabled = false,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-[#25324B]">
        {label}
      </label>
      <Input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-2 h-10 rounded-[11px] border-[#D6DDEB] bg-white text-[#25324B] disabled:cursor-not-allowed disabled:opacity-70"
        {...registration}
      />
      {error ? (
        <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">{error}</p>
      ) : null}
    </div>
  );
}
