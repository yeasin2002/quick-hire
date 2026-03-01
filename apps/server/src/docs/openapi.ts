export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "QuickHire API",
    version: "1.0.0",
    description:
      "Basic job board backend API with admin management endpoints for jobs and applications.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Health", description: "API health endpoints" },
    { name: "Jobs", description: "Public and admin job operations" },
    { name: "Applications", description: "Job application operations" },
    { name: "Categories", description: "Job categories" },
    { name: "Admin", description: "Admin-only endpoints" },
  ],
  components: {
    securitySchemes: {
      adminApiKey: {
        type: "apiKey",
        in: "header",
        name: "x-admin-key",
      },
    },
    schemas: {
      Category: {
        type: "object",
        properties: {
          title: { type: "string", example: "Design" },
          available_jobs: { type: "number", example: 235 },
          image_url: {
            type: "string",
            format: "uri",
            example: "https://ik.imagekit.io/quickhire/categories/design.png",
          },
        },
        required: ["title", "available_jobs", "image_url"],
      },
      Job: {
        type: "object",
        properties: {
          id: { type: "string", example: "job_01" },
          title: { type: "string", example: "Email Marketing" },
          company: { type: "string", example: "Revolut" },
          location: { type: "string", example: "Madrid, Spain" },
          category: { type: "string", example: "Marketing" },
          image_url: {
            type: "string",
            format: "uri",
            example: "https://ik.imagekit.io/quickhire/companies/revolut.png",
          },
          employment_type: { type: "string", example: "Full Time" },
          description: {
            type: "string",
            example:
              "Revolut is looking for Email Marketing to help team market products.",
          },
          created_at: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "title",
          "company",
          "location",
          "category",
          "image_url",
          "employment_type",
          "description",
          "created_at",
        ],
      },
      Application: {
        type: "object",
        properties: {
          id: { type: "string", example: "application_01" },
          job_id: { type: "string", example: "job_01" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", format: "email", example: "john@doe.com" },
          resume_link: {
            type: "string",
            format: "uri",
            example: "https://example.com/resume.pdf",
          },
          cover_note: { type: "string", example: "I would love to join your team." },
          created_at: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "job_id",
          "name",
          "email",
          "resume_link",
          "cover_note",
          "created_at",
        ],
      },
      CreateJobInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          category: {
            type: "string",
            enum: [
              "Design",
              "Sales",
              "Marketing",
              "Finance",
              "Technology",
              "Engineering",
              "Business",
              "Human Resource",
            ],
          },
          image_url: { type: "string", format: "uri" },
          description: { type: "string" },
          employment_type: { type: "string", enum: ["Full Time"], default: "Full Time" },
        },
        required: [
          "title",
          "company",
          "location",
          "category",
          "image_url",
          "description",
        ],
      },
      UploadedImage: {
        type: "object",
        properties: {
          fileId: { type: "string", example: "65f6a5f5d9b8f5bca8bc3b55" },
          name: { type: "string", example: "design-icon.png" },
          url: {
            type: "string",
            format: "uri",
            example: "https://ik.imagekit.io/quickhire/uploads/design-icon.png",
          },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://ik.imagekit.io/quickhire/tr:n-ik_ml_thumbnail/uploads/design-icon.png",
          },
          width: { type: "number", example: 512 },
          height: { type: "number", example: 512 },
        },
        required: ["fileId", "name", "url"],
      },
      CreateApplicationInput: {
        type: "object",
        properties: {
          job_id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          resume_link: { type: "string", format: "uri" },
          cover_note: { type: "string" },
        },
        required: ["job_id", "name", "email", "resume_link", "cover_note"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Request validation failed" },
            },
          },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "API status",
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          "200": {
            description: "List of categories",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Category" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/jobs": {
      get: {
        tags: ["Jobs"],
        summary: "List jobs with optional filtering",
        parameters: [
          {
            in: "query",
            name: "search",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "q",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "category",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "location",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Jobs list",
          },
        },
      },
      post: {
        tags: ["Jobs", "Admin"],
        summary: "Create job (admin)",
        security: [{ adminApiKey: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateJobInput" },
            },
          },
        },
        responses: {
          "201": { description: "Job created" },
          "422": {
            description: "Validation failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/jobs/{id}": {
      get: {
        tags: ["Jobs"],
        summary: "Get single job by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Job detail" },
          "404": { description: "Job not found" },
        },
      },
      delete: {
        tags: ["Jobs", "Admin"],
        summary: "Delete job by ID (admin)",
        security: [{ adminApiKey: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Job deleted" },
          "404": { description: "Job not found" },
        },
      },
    },
    "/api/applications": {
      post: {
        tags: ["Applications"],
        summary: "Submit a job application",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateApplicationInput" },
            },
          },
        },
        responses: {
          "201": { description: "Application created" },
          "404": { description: "Job not found" },
          "422": { description: "Validation failed" },
        },
      },
    },
    "/api/admin/jobs": {
      get: {
        tags: ["Admin", "Jobs"],
        summary: "Admin list jobs",
        security: [{ adminApiKey: [] }],
        responses: {
          "200": { description: "Admin jobs list" },
        },
      },
      post: {
        tags: ["Admin", "Jobs"],
        summary: "Admin create job",
        security: [{ adminApiKey: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateJobInput" },
            },
          },
        },
        responses: {
          "201": { description: "Job created" },
        },
      },
    },
    "/api/admin/jobs/{id}": {
      delete: {
        tags: ["Admin", "Jobs"],
        summary: "Admin delete job",
        security: [{ adminApiKey: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Job deleted" },
          "404": { description: "Job not found" },
        },
      },
    },
    "/api/admin/applications": {
      get: {
        tags: ["Admin", "Applications"],
        summary: "Admin list applications",
        security: [{ adminApiKey: [] }],
        responses: {
          "200": { description: "Applications list" },
        },
      },
    },
    "/api/admin/uploads/image": {
      post: {
        tags: ["Admin"],
        summary: "Upload image (admin)",
        description:
          "Upload an image file to ImageKit using multipart/form-data. Field name must be `file`.",
        security: [{ adminApiKey: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                  },
                  folder: {
                    type: "string",
                    example: "/quickhire",
                  },
                },
                required: ["file"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Image uploaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/UploadedImage" },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid file or missing file" },
          "401": { description: "Missing/invalid admin key" },
          "503": { description: "ImageKit not configured" },
        },
      },
    },
  },
} as const;

export const renderSwaggerUi = (openApiJsonPath: string): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QuickHire API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      html, body { margin: 0; padding: 0; background: #f8f8fd; }
      #swagger-ui { max-width: 1200px; margin: 0 auto; }
      .topbar { display: none; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: "${openApiJsonPath}",
        dom_id: "#swagger-ui",
        deepLinking: true,
        displayRequestDuration: true,
        defaultModelsExpandDepth: 1
      });
    </script>
  </body>
</html>`;
};
