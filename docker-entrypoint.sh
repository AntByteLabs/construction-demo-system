#!/bin/sh
set -e

# Ensure persistent dirs exist (mounted volumes start empty on first boot).
mkdir -p /app/data /app/public/uploads

# Apply pending migrations against the SQLite file in the mounted volume.
echo "[entrypoint] Running prisma migrate deploy..."
npx prisma migrate deploy

# Optional one-shot seed: set SEED_DB=1 (e.g. on first boot) to populate demo data.
if [ "${SEED_DB:-0}" = "1" ]; then
  echo "[entrypoint] SEED_DB=1 set — running seed script..."
  npx tsx prisma/seed.ts
fi

echo "[entrypoint] Starting server on ${HOSTNAME:-0.0.0.0}:${PORT:-5000}..."
exec "$@"
