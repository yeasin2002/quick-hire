import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { errorHandler, notFoundHandler } from "@/lib/http/errors";
import { jobBoardRouter } from "@/modules/job-board/router";

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

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "QuickHire API is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
