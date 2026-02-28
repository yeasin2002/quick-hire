# QuickHire - Job Board Application

A modern job board application built with Next.js 16, React 19, and TypeScript. QuickHire allows users to browse job listings, search and filter jobs, view job details, and submit applications. Includes an admin panel for managing job postings.

## Features

- 📋 Job listings with search and filter (by category/location)
- 🔍 Job detail pages with application forms
- 👨‍💼 Admin interface for job management
- 📱 Fully responsive UI following Figma design specifications
- ✅ Form validation with Zod
- 🎨 Modern UI with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Build System**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm 10.4.1
- **Node Version**: >=20

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 10.4.1

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start specific app
pnpm dev --filter web
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm build --filter web
```

### Other Commands

```bash
# Lint all packages
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Type checking
pnpm typecheck

# Format code with Prettier
pnpm format
```

## Project Structure

This is a Turborepo monorepo with the following structure:

```
apps/
  web/                    # Next.js application
packages/
  ui/                     # Shared UI component library
  eslint-config/          # Shared ESLint configurations
  typescript-config/      # Shared TypeScript configurations
```

## Adding shadcn/ui Components

To add components to your app:

```bash
pnpm dlx shadcn@latest add <component-name> -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using Components

Import components from the `ui` package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## API Endpoints

### Jobs
- `GET /api/jobs` – List all jobs
- `GET /api/jobs/{id}` – Get single job details
- `POST /api/jobs` – Create a job (Admin)
- `DELETE /api/jobs/{id}` – Delete a job (Admin)

### Applications
- `POST /api/applications` – Submit job application

## Environment Variables

Create a `.env.local` file in `apps/web/`:

```env
# Add your environment variables here
```

## Design

UI implementation follows the Figma design:
https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer
