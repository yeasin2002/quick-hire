import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "@/lib/auth";
import { openApiDocument, renderSwaggerUi } from "@/docs/openapi";
import { env } from "@/lib/env";
import { errorHandler, notFoundHandler } from "@/lib/http/errors";
import { jobBoardRouter } from "@/modules/job-board/router";
import { uploadsRouter } from "@/modules/uploads/router";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/auth{/*path}", toNodeHandler(auth));
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
    docs: "http://localhost:4000/api/docs",
    openapi: "http://localhost:4000/api/openapi.json",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
