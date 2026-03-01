import { openApiDocument, renderSwaggerUi } from "@/docs/openapi";
import { env } from "@/lib/env";
import { errorHandler, notFoundHandler } from "@/lib/http/errors";
import { jobBoardRouter } from "@/modules/job-board/router";
import { uploadsRouter } from "@/modules/uploads/router";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();
const port = env.PORT;

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", jobBoardRouter);
app.use("/api", uploadsRouter);

app.get("/api/openapi.json", (_req, res) => {
  res.status(200).json(openApiDocument);
});

app.get("/api/docs", (_req, res) => {
  res.status(200).type("html").send(renderSwaggerUi("/api/openapi.json"));
});

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "QuickHire API is running",
    docs: `http://localhost:${port}/api/docs`,
    openapi: `http://localhost:${port}/api/openapi.json`,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
