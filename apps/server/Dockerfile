# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json
COPY tooling/config/package.json tooling/config/package.json
RUN pnpm install --frozen-lockfile --filter ./apps/server...

FROM deps AS build
COPY apps/server apps/server
COPY tooling/config tooling/config
RUN pnpm --filter ./apps/server build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/server/dist ./apps/server/dist
COPY --from=build /app/apps/server/package.json ./apps/server/package.json

EXPOSE 4000

CMD ["node", "apps/server/dist/index.mjs"]
