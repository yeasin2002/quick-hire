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

router.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    const categories = await getCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  }),
);

router.get(
  "/jobs",
  asyncHandler(async (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const category = typeof req.query.category === "string" ? req.query.category : "";
    const location = typeof req.query.location === "string" ? req.query.location : "";

    const jobs = await getJobs({
      search: search || q,
      category,
      location,
    });

    res.status(200).json({
      success: true,
      meta: {
        count: jobs.length,
      },
      data: jobs,
    });
  }),
);

router.get("/jobs/:id", asyncHandler(async (req, res, next) => {
  const jobId = String(req.params.id ?? "");
  const job = await getJobById(jobId);
  if (!job) {
    next(new HttpError(404, "JOB_NOT_FOUND", "Job not found"));
    return;
  }

  res.status(200).json({
    success: true,
    data: job,
  });
}));

const createJobHandler = asyncHandler(async (req, res) => {
  const payload = createJobSchema.parse(req.body);
  const job = await createJob(payload);

  res.status(201).json({
    success: true,
    data: job,
  });
});

const deleteJobHandler = asyncHandler(async (req, res, next) => {
  const jobId = String(req.params.id ?? "");
  const job = await deleteJob(jobId);
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

    const job = await getJobById(payload.job_id);
    if (!job) {
      next(new HttpError(404, "JOB_NOT_FOUND", "Cannot apply to a missing job"));
      return;
    }

    const application = await createApplication(payload);
    res.status(201).json({
      success: true,
      data: application,
    });
  }),
);

router.get(
  "/admin/jobs",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const jobs = await getJobs({
      search: "",
      category: "",
      location: "",
    });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  }),
);

router.post("/admin/jobs", requireAdmin, createJobHandler);
router.patch("/admin/jobs", requireAdmin, createJobHandler);
router.delete("/admin/jobs/:id", requireAdmin, deleteJobHandler);

router.get(
  "/admin/applications",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const applications = await getApplications();

    res.status(200).json({
      success: true,
      data: applications,
    });
  }),
);

export const jobBoardRouter: Router = router;
