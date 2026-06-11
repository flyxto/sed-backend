# ─── Stage 1: Build ───────────────────────────────────────────────────────────
# Install only production dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (leverages Docker layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# ─── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user/group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy production node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY src ./src

# Copy package.json (needed for metadata & "main" field)
COPY package.json ./

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
