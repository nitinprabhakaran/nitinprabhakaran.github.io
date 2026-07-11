FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run yaml-to-json && node scripts/copy-assets.js && npm run build -- --emptyOutDir

FROM scratch
COPY --from=builder /app/dist /dist
