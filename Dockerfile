# syntax=docker/dockerfile:1.6

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- deps ----------
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ---------- builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# DATABASE_URL is required by `prisma generate` only as a placeholder.
ENV DATABASE_URL="file:/tmp/build.db"
RUN npx prisma generate
RUN npm run build

# ---------- runner ----------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=5000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001 \
 && mkdir -p /app/data /app/public/uploads \
 && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --chown=nextjs:nodejs docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 5000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npx", "next", "start", "-p", "5000", "-H", "0.0.0.0"]
