FROM node:20-bullseye-slim

# Install git for cloning upstream repo
RUN apt-get update && apt-get install -y git ca-certificates --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone the upstream repository (public)
ARG UPSTREAM_REPO=https://github.com/Ajay-paka/YAZA-DeepVision.git
RUN git clone --depth 1 $UPSTREAM_REPO src
WORKDIR /app/src

# Install dependencies (including dev deps so tsx is available)
RUN npm ci

# Build frontend
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

# Start server using tsx to run TypeScript directly (matches upstream behavior)
CMD ["npx", "tsx", "backend/src/index.ts"]
