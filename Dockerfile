# EMON CORTEX OS — AI Team Premium BD
# Full-stack Express + React container for Cloud Run
# Target: GCP Cloud Run, port 8080
#
# Build:
#   docker build -t ai-team-premium-bd:latest .
# Run locally:
#   docker run -p 8080:8080 -e DATABASE_URL=postgresql://... ai-team-premium-bd:latest

# ---------- Stage 1: Builder ----------
FROM node:20-slim AS builder

WORKDIR /build

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci --include=optional

# Copy source
COPY . .

# Build client + server
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:20-slim AS runtime

WORKDIR /app

# Create non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy built artifacts and dependencies
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/migrations ./migrations
COPY --from=builder /build/package.json ./

# Change ownership
RUN chown -R appuser:appgroup /app
USER appuser

# Cloud Run injects PORT; default 8080
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/api/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "dist/index.cjs"]
