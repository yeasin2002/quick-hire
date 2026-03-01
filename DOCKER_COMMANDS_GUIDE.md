# Docker Commands Guide (QuickHire Server)

This guide uses the Task runner commands defined in `Taskfile.yml` for production Docker operations of `apps/server`.

## Prerequisites

- Docker installed and running
- Docker Compose plugin available
- Task installed (`task --version`)
- Server env file exists: `apps/server/.env`
- Compose file exists: `apps/server/docker-compose.yml`

## First-Time Setup

1. Verify tools and Docker daemon:

```bash
task docker:check
```

2. Build backend image:

```bash
task docker:server:build
```

3. Start container:

```bash
task docker:server:up
```

4. Confirm service status:

```bash
task docker:server:ps
```

5. View logs:

```bash
task docker:server:logs
```

## Production Deploy (VPS)

Use this as your standard deployment command:

```bash
task docker:server:deploy
```

This command does:

- rebuild image
- pull latest base layers
- recreate container
- remove orphan containers

After deploy:

```bash
task docker:server:ps
task docker:server:logs
```

## Daily Operations

Restart backend service:

```bash
task docker:server:restart
```

Stop and remove service containers:

```bash
task docker:server:down
```

Pull image updates from compose references:

```bash
task docker:server:pull
```

Clean unused Docker resources:

```bash
task docker:server:clean
```

## Command Reference

- `task docker:check`  
  Checks Docker CLI, Compose plugin, and daemon readiness.

- `task docker:server:build`  
  Builds the server image from `apps/server/Dockerfile` through compose.

- `task docker:server:up`  
  Starts `server` container in detached mode.

- `task docker:server:down`  
  Stops/removes compose resources for project `quickhire-server`.

- `task docker:server:restart`  
  Restarts running `server` container without rebuilding.

- `task docker:server:deploy`  
  Full production rollout command.

- `task docker:server:logs`  
  Follows server logs (`tail=200`).

- `task docker:server:ps`  
  Shows container status.

- `task docker:server:pull`  
  Pulls configured image references for the service.

- `task docker:server:clean`  
  Runs `docker system prune -f`.

- `task` or `task default`  
  Lists available tasks.

## Health Check

If service is up and port `4000` is open:

```bash
curl http://localhost:4000/
```

Expected: JSON response from QuickHire API health endpoint.

## Common Issues

- `Env file not found at apps/server/.env`  
  Create/fix `apps/server/.env`.

- `Compose file not found at apps/server/docker-compose.yml`  
  Ensure repo structure is intact and run command from repo root.

- Docker daemon errors  
  Start Docker service/Desktop, then rerun:

```bash
task docker:check
```

- Port `4000` already in use  
  Stop conflicting process/container, then redeploy:

```bash
task docker:server:down
task docker:server:deploy
```
