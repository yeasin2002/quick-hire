# Docker Commands Guide (Current Setup)

Simple Docker workflow for both backend (`apps/server`) and web (`apps/web`) using Task + Docker Compose.

## Files Used

- `Taskfile.yml`
- `apps/server/Dockerfile`
- `apps/server/docker-compose.yml`
- `apps/web/Dockerfile`
- `apps/web/docker-compose.yml`
- `apps/server/.env`
- `apps/web/.env`

## Available Task Commands

List commands:

```bash
task
```

Server tasks:

- `task docker:build`
- `task docker:up`
- `task docker:down`
- `task docker:logs`
- `task docker:ps`



## Basic Usage

### Backend (`apps/server`)

1. Build:

```bash
task docker:build
```

2. Start:

```bash
task docker:up
```

3. Check status:

```bash
task docker:ps
```

4. Watch logs:

```bash
task docker:logs
```

5. Stop:

```bash
task docker:down
```

## Ports

- Backend: `8000`
- Web: `3001`

## Health Checks

Backend:

```bash
curl http://localhost:8000/
```


## Notes

- Run all task commands from repo root: `C:\Yeasin\experiment\quick-hire`.
- Server compose loads env from `apps/server/.env`.
- Web compose loads env from `apps/web/.env`.

## Common Issues

- Docker daemon not running:
  - Start Docker Desktop/service and retry.

- Missing env files:
  - Ensure `apps/server/.env` and `apps/web/.env` exist.

- Port conflict on `8000` or `3001`:
  - Stop conflicting process/container, then restart related service:

```bash
task docker:down
task docker:up
```

