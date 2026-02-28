QuickHire is a job board application that allows users to browse job listings, search and filter jobs, view job details, and submit applications. The system includes an admin panel for posting and managing job listings.

## UI Design Requirements

The UI must closely follow the Figma design template:
https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer

Implementation should match:

- Layout structure
- Typography
- Color scheme
- Spacing and alignment
- Overall look and feel

## Core Features

### Job Listings Page

- Display all jobs in a clean, responsive layout
- Search functionality across job listings
- Filter by category and location
- Proper loading states and UX enhancements

### Job Detail Page

- Full job description display
- "Apply Now" form with fields:
  - Name (required)
  - Email (required, validated format)
  - Resume link (required, valid URL)
  - Cover note (required)

### Admin Panel

- Add new job listings
- Delete existing job listings
- Clean, intuitive admin interface

## Data Models

### Job

- id, title, company, location, category, description, created_at

### Application

- id, job_id, name, email, resume_link, cover_note, created_at

## API Endpoints

### Jobs

- GET /api/jobs – List all jobs
- GET /api/jobs/{id} – Get single job details
- POST /api/jobs – Create a job (Admin)
- DELETE /api/jobs/{id} – Delete a job (Admin)

### Applications

- POST /api/applications – Submit job application

## Validation Requirements

- All required fields must be validated
- Email must be properly formatted
- Resume link must be a valid URL
- Input validation on all API endpoints

## Quality Standards

- Fully responsive design (mobile, tablet, desktop)
- Reusable component structure
- Clean naming conventions
- Modular and organized code
- Professional UX with proper error handling
- Clean API response formatting

<!-- ================================== Structure ========================================================== -->

## Monorepo Structure

This is a Turborepo monorepo using pnpm workspaces with the following organization:

```
apps/
  web/                    # Next.js application (main app)
    app/                  # Next.js App Router pages
    components/           # App-specific components
    hooks/                # App-specific hooks
    lib/                  # App-specific utilities

packages/
  ui/                     # Shared UI component library
    src/
      components/         # shadcn/ui components (shared)
      hooks/              # Shared React hooks
      lib/                # Shared utilities (e.g., cn helper)
      styles/             # Global CSS (globals.css)

  eslint-config/          # Shared ESLint configurations
  typescript-config/      # Shared TypeScript configurations
```

## Import Conventions

- **UI Components**: `import { Button } from "@workspace/ui/components/button"`
- **UI Utilities**: `import { cn } from "@workspace/ui/lib/utils"`
- **UI Styles**: `import "@workspace/ui/globals.css"`
- **App Internals**: `import { Component } from "@/components/component"`

## Component Organization

- Place **shared** components in `packages/ui/src/components/`
- Place **app-specific** components in `apps/web/components/`
- shadcn/ui components are added to the shared `ui` package for reuse across apps

## Configuration Files

- **Root**: Turborepo config, pnpm workspace, shared tooling
- **apps/web**: Next.js config, app-specific tsconfig
- **packages/ui**: Component library exports, PostCSS config

## Path Aliases

- `@/*` → Root of `apps/web/`
- `@workspace/ui/*` → `packages/ui/src/*`

## Workspace Dependencies

Use `workspace:*` or `workspace:^` protocol for internal package dependencies in package.json files.

<!-- ================================== tech ========================================================== -->

## Skills 
AI coding rules or Skills available in  `.agents\skills` folder, each skills have multiple file or folder and `.md` about specific skills for AI Agents

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Build System**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm 10.4.1
- **Node Version**: >=20

## Key Libraries

- **UI Components**: shadcn/ui, Radix UI, lucide-react
- **Styling Utilities**: clsx, tailwind-merge, class-variance-authority
- **Theme**: next-themes for dark/light mode support
- **Validation**: zod

## Common Commands

```bash
# Development
pnpm dev              # Start all apps in dev mode
pnpm dev --filter web # Start specific app

# Building
pnpm build            # Build all packages and apps
pnpm build --filter web

# Linting
pnpm lint             # Lint all packages
pnpm lint:fix         # Auto-fix linting issues (in apps/web)

# Type Checking
pnpm typecheck        # Run TypeScript type checking (in apps/web)

# Formatting
pnpm format           # Format code with Prettier
```

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add <component-name> -c apps/web
```

This places components in `packages/ui/src/components` for shared use across the monorepo.

## Environment Requirements

- Node.js 20 or higher
- pnpm 10.4.1 (specified in package.json)
