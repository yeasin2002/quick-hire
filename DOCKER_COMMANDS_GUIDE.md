# Docker Commands Guide (Current Setup)

Simple Docker workflow for backend server using Task and Docker Compose.

## Files Used

- `Taskfile.yml`
- `apps/server/docker-compose.yml`
- `apps/server/Dockerfile`
- `apps/server/.env`

## Available Task Commands

Run this to list commands:

```bash
task
```

Current Docker tasks:

- `task docker:build`
- `task docker:up`
- `task docker:down`
- `task docker:logs`
- `task docker:ps`

## Basic Usage

1. Build server image:

```bash
task docker:build
```

2. Start container:

```bash
task docker:up
```

3. Check running status:

```bash
task docker:ps
```

4. Watch logs:

```bash
task docker:logs
```

5. Stop container:

```bash
task docker:down
```

## Health Check

After `task docker:up`, test API:

```bash
curl http://localhost:8000/
```

Expected: JSON response from QuickHire API.

## Notes

- Compose maps port `8000:8000`.
- Compose loads env from `apps/server/.env` (`env_file: .env` inside `apps/server/docker-compose.yml`).
- Run task commands from repo root: `C:\Yeasin\experiment\quick-hire`.

## Common Issues

- Docker daemon not running:
  - Start Docker Desktop/service and retry.

- `apps/server/.env` missing:
  - Create it before `task docker:up`.

- Port `8000` already in use:
  - Stop the conflicting app/container, then run:

```bash
task docker:down
task docker:up
```
