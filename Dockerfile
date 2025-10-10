# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app/frontend

FROM base AS deps
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM base AS builder
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend .
COPY assets /app/assets
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/next.config.js ./next.config.js
COPY --from=builder /app/frontend/next-env.d.ts ./next-env.d.ts
COPY --from=builder /app/frontend/postcss.config.js ./postcss.config.js
COPY --from=builder /app/frontend/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/frontend/tsconfig.json ./tsconfig.json
COPY --from=builder /app/assets /app/assets

EXPOSE 3000
CMD ["npm", "run", "start"]
