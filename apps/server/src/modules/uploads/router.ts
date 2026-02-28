import { requireAdmin } from "@/lib/http/admin";
import { asyncHandler, HttpError } from "@/lib/http/errors";
import { uploadImageToImageKit } from "@/lib/uploads/imagekit";
import multer from "multer";
import { Router } from "express";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.post(
  "/admin/uploads/image",
  requireAdmin,
  upload.single("file"),
  asyncHandler(async (req, res, next) => {
    const file = req.file;

    if (!file) {
      next(new HttpError(400, "FILE_REQUIRED", "Image file is required"));
      return;
    }

    if (!file.mimetype.startsWith("image/")) {
      next(
        new HttpError(
          400,
          "INVALID_FILE_TYPE",
          "Only image files are allowed for this upload endpoint",
        ),
      );
      return;
    }

    const folder =
      typeof req.body.folder === "string" && req.body.folder.trim()
        ? req.body.folder.trim()
        : "/quickhire";

    const uploadedFile = await uploadImageToImageKit({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      folder,
    });

    res.status(201).json({
      success: true,
      data: uploadedFile,
    });
  }),
);

export const uploadsRouter: Router = router;

