#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME=${IMAGE_NAME:-hatt-web}
CONTAINER_NAME=${CONTAINER_NAME:-hatt-web}
HOST_PORT=${HOST_PORT:-36678}
CONTAINER_PORT=${CONTAINER_PORT:-3000}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to deploy this application." >&2
  exit 1
fi

echo "Building Docker image '$IMAGE_NAME'..."
docker build -t "$IMAGE_NAME" .

if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "Container '$CONTAINER_NAME' already exists. Removing it before redeploying..."
  docker rm -f "$CONTAINER_NAME"
fi

echo "Starting container '$CONTAINER_NAME' on port ${HOST_PORT}..."
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "$IMAGE_NAME"

echo "Deployment complete. Application is available on port ${HOST_PORT}."
