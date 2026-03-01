"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .min(6, "Password should be at least 6 characters."),
});

export function LoginForm() {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof LoginFormValues, {
            message: issue.message,
            type: "manual",
          });
        }
      }
      return;
    }

    router.push("/dashboard");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
      <div>
        <Label htmlFor="login-email" className="text-[14px] text-[#25324B]">
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com"
          disabled={isSubmitting}
          className="mt-2 h-11 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <Label
            htmlFor="login-password"
            className="text-[14px] text-[#25324B]"
          >
            Password
          </Label>
          <Link
            href="#"
            className="text-[13px] font-semibold text-[#4640DE] hover:text-[#5B56E8]"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          className="mt-2 h-11 border-[#D6DDEB] bg-white text-[#25324B] placeholder:text-[#7C8493]"
          aria-invalid={errors.password ? true : undefined}
          {...register("password")}
        />
        {errors.password ? (
          <p className="mt-1 text-[12px] font-medium text-[#C03F3F]">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-[12px] bg-[#4640DE] text-[15px] font-semibold text-white hover:bg-[#5752E9]"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn aria-hidden="true" className="size-4" />
            Login
          </>
        )}
      </Button>
    </form>
  );
}
