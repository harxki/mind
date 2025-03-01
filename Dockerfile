FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS installer
COPY . /app
WORKDIR /app
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm deploy --filter=server --prod ./pruned
RUN ls -la
RUN cat ./pruned/package.json

FROM base AS runner
WORKDIR /app
RUN corepack enable
COPY --from=installer /app/pruned ./
RUN ls -la
RUN cat ./package.json
RUN pnpm run db:generate
CMD ["pnpm", "run", "start"]

# COPY . .
# RUN turbo prune server --docker

# FROM base AS installer
# WORKDIR /app
# COPY --from=builder /app/out/json/ .
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# COPY --from=builder /app/out/full/ .
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run db:generate
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run start