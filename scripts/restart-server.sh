#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="apps/server/docker-compose.yml"
SERVICE_NAME="server"

echo "[quick-hire] Stopping existing containers..."
docker compose -f "$COMPOSE_FILE" down

echo "[quick-hire] Starting $SERVICE_NAME with rebuild..."
docker compose -f "$COMPOSE_FILE" up -d --build "$SERVICE_NAME"

echo "[quick-hire] Restart complete."
