import { env } from "@/lib/env";
import { HttpError } from "@/lib/http/errors";
import type { RequestHandler } from "express";

export const requireAdmin: RequestHandler = (req, _res, next) => {
  const configuredAdminKey = env.ADMIN_API_KEY;

  // Allow all requests when key is not configured (basic/local mode).
  if (!configuredAdminKey) {
    next();
    return;
  }

  const providedAdminKey = req.header("x-admin-key");
  if (providedAdminKey !== configuredAdminKey) {
    next(
      new HttpError(
        401,
        "UNAUTHORIZED",
        "Invalid or missing x-admin-key header for admin endpoint",
      ),
    );
    return;
  }

  next();
};

