# Этап зависимостей
FROM node:20-alpine AS deps
WORKDIR /client
COPY package*.json ./
RUN npm ci --legacy-peer-deps --prefer-offline --audit=false --fund=false

# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY . .
ENV VITE_CACHE_DIR=/tmp/.vite
RUN rm -rf ./dist && npm run build

# Финальный образ
FROM nginx:alpine
COPY --from=builder /client/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's/sendfile.*/sendfile on;\n\tadd_header Cache-Control "no-store, no-cache, must-revalidate";/' /etc/nginx/nginx.conf