import { requireAdmin } from "@/lib/http/admin";
import { asyncHandler, HttpError } from "@/lib/http/errors";
import { Router } from "express";
import { createApplicationSchema, createJobSchema } from "./schemas";
import {
  createApplication,
  createJob,
  deleteJob,
  getApplications,
  getCategories,
  getJobById,
  getJobs,
} from "./store";

const router = Router();

const filterJobs = (
  rawSearch: string,
  rawCategory: string,
  rawLocation: string,
) => {
  const normalizedSearch = rawSearch.trim().toLowerCase();
  const normalizedCategory = rawCategory.trim().toLowerCase();
  const normalizedLocation = rawLocation.trim().toLowerCase();

  return getJobs().filter((job) => {
    if (normalizedSearch) {
      const matchSearch = [
        job.title,
        job.company,
        job.description,
        job.location,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));
      if (!matchSearch) {
        return false;
      }
    }

    if (normalizedCategory && job.category.toLowerCase() !== normalizedCategory) {
      return false;
    }

    if (normalizedLocation && !job.location.toLowerCase().includes(normalizedLocation)) {
      return false;
    }

    return true;
  });
};

router.get("/categories", (_req, res) => {
  res.status(200).json({
    success: true,
    data: getCategories(),
  });
});

router.get("/jobs", (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const category = typeof req.query.category === "string" ? req.query.category : "";
  const location = typeof req.query.location === "string" ? req.query.location : "";

  const jobs = filterJobs(search || q, category, location);

  res.status(200).json({
    success: true,
    meta: {
      count: jobs.length,
    },
    data: jobs,
  });
});

router.get("/jobs/:id", (req, res, next) => {
  const jobId = String(req.params.id ?? "");
  const job = getJobById(jobId);
  if (!job) {
    next(new HttpError(404, "JOB_NOT_FOUND", "Job not found"));
    return;
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

const createJobHandler = asyncHandler(async (req, res) => {
  const payload = createJobSchema.parse(req.body);
  const job = createJob(payload);

  res.status(201).json({
    success: true,
    data: job,
  });
});

const deleteJobHandler = asyncHandler(async (req, res, next) => {
  const jobId = String(req.params.id ?? "");
  const job = deleteJob(jobId);
  if (!job) {
    next(new HttpError(404, "JOB_NOT_FOUND", "Job not found"));
    return;
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

router.post("/jobs", requireAdmin, createJobHandler);
router.delete("/jobs/:id", requireAdmin, deleteJobHandler);

router.post(
  "/applications",
  asyncHandler(async (req, res, next) => {
    const payload = createApplicationSchema.parse(req.body);

    const job = getJobById(payload.job_id);
    if (!job) {
      next(new HttpError(404, "JOB_NOT_FOUND", "Cannot apply to a missing job"));
      return;
    }

    const application = createApplication(payload);
    res.status(201).json({
      success: true,
      data: application,
    });
  }),
);

router.get("/admin/jobs", requireAdmin, (_req, res) => {
  res.status(200).json({
    success: true,
    data: getJobs(),
  });
});

router.post("/admin/jobs", requireAdmin, createJobHandler);
router.delete("/admin/jobs/:id", requireAdmin, deleteJobHandler);

router.get("/admin/applications", requireAdmin, (_req, res) => {
  res.status(200).json({
    success: true,
    data: getApplications(),
  });
});

export const jobBoardRouter: Router = router;
