# Use a multi-stage build so the build step has access to source files (including tsconfig.json)
FROM node:20-alpine AS builder
RUN apk add curl
WORKDIR /usr/src/app

# Install dev dependencies for building
COPY package*.json ./
RUN npm ci

# Copy the rest of the source (tsconfig.json, src/, etc.) so the build can run
COPY . .

# Build the project (produces dist/)
RUN npm run build
# Final image: only production deps + built output
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Copy built output from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
