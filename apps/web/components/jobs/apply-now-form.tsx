"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Loader2, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";

type ApplyNowFormProps = {
  jobId: string;
};

type FormValues = {
  coverNote: string;
  email: string;
  name: string;
  resumeLink: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type ApiErrorPayload = {
  error?: {
    message?: string;
  };
  message?: string;
};

const applyFormSchema = z.object({
  coverNote: z.string().trim().min(1, "Cover note is required."),
  email: z.string().trim().email("Enter a valid email address."),
  name: z.string().trim().min(1, "Name is required."),
  resumeLink: z.string().trim().url("Resume link must be a valid URL."),
});

const DEFAULT_VALUES: FormValues = {
  coverNote: "",
  email: "",
  name: "",
  resumeLink: "",
};

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    return (
      payload.error?.message?.trim() ||
      payload.message?.trim() ||
      `Submission failed with status ${response.status}`
    );
  } catch {
    return `Submission failed with status ${response.status}`;
  }
};

const getFieldErrors = (
  issues: z.ZodIssue[],
): Partial<Record<keyof FormValues, string>> => {
  const errors: FieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field === "string") {
      errors[field as keyof FormValues] = issue.message;
    }
  }

  return errors;
};

export function ApplyNowForm({ jobId }: ApplyNowFormProps) {
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
      setSubmitError(null);
      setSubmitSuccess(null);
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const parsed = applyFormSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error.issues));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        body: JSON.stringify({
          cover_note: parsed.data.coverNote,
          email: parsed.data.email,
          job_id: jobId,
          name: parsed.data.name,
          resume_link: parsed.data.resumeLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        setSubmitError(await getErrorMessage(response));
        return;
      }

      setValues(DEFAULT_VALUES);
      setSubmitSuccess("Application submitted successfully.");
    } catch {
      setSubmitError("Could not submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="apply-name" className="text-[13px] text-[#25324B]">
          Name
        </Label>
        <Input
          id="apply-name"
          name="name"
          value={values.name}
          onChange={onChange("name")}
          autoComplete="name"
          disabled={isSubmitting}
          placeholder="Your full name…"
          className="mt-2 h-10 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="apply-email" className="text-[13px] text-[#25324B]">
          Email
        </Label>
        <Input
          id="apply-email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange("email")}
          autoComplete="email"
          spellCheck={false}
          disabled={isSubmitting}
          placeholder="you@example.com"
          className="mt-2 h-10 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">{errors.email}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="apply-resume-link" className="text-[13px] text-[#25324B]">
          Resume Link
        </Label>
        <Input
          id="apply-resume-link"
          name="resume_link"
          type="url"
          value={values.resumeLink}
          onChange={onChange("resumeLink")}
          autoComplete="url"
          spellCheck={false}
          disabled={isSubmitting}
          placeholder="https://example.com/resume"
          className="mt-2 h-10 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.resumeLink ? true : undefined}
        />
        {errors.resumeLink ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
            {errors.resumeLink}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="apply-cover-note" className="text-[13px] text-[#25324B]">
          Cover Note
        </Label>
        <Textarea
          id="apply-cover-note"
          name="cover_note"
          value={values.coverNote}
          onChange={onChange("coverNote")}
          autoComplete="off"
          disabled={isSubmitting}
          placeholder="Share why you're a great fit for this role…"
          className="mt-2 min-h-30 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.coverNote ? true : undefined}
        />
        {errors.coverNote ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
            {errors.coverNote}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p
          aria-live="polite"
          className="rounded-lg border border-[#F7CFCF] bg-[#FFF1F1] px-3 py-2 text-[12px] font-medium text-[#C03F3F]"
        >
          {submitError}
        </p>
      ) : null}

      {submitSuccess ? (
        <p
          aria-live="polite"
          className="rounded-lg border border-[#CFEADD] bg-[#EBFFF4] px-3 py-2 text-[12px] font-medium text-[#16774F]"
        >
          {submitSuccess}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-[12px] bg-[#4640DE] text-[14px] font-semibold text-white hover:bg-[#5752E9]"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-4" />
            Apply Now
          </>
        )}
      </Button>
    </form>
  );
}
