# Stage 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app

# Package files copy karo
COPY package.json package-lock.json ./
RUN npm ci --silent

# Baaki code copy karo
COPY . .

# Build React App
RUN npm run build && ls -la /app/dist  # Ensure dist folder exists

# Stage 2: Nginx setup
FROM nginx:alpine

LABEL maintainer="Nikhil <nikhil.kumbhare@opstree.com>"
LABEL version="1.0"

# Build output copy karo
COPY --from=builder /app/dist /usr/share/nginx/html

# ✅ Correct location for nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Check files copied successfully
RUN ls -la /usr/share/nginx/html

# Install curl for healthcheck & cleanup unnecessary files
RUN apk add --no-cache curl && rm -rf /var/cache/apk/*

# Healthcheck setup
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

