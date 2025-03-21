# Этап установки зависимостей
FROM node:20-alpine AS deps
WORKDIR /client
COPY package*.json ./
RUN npm install --legacy-peer-deps --prefer-offline

# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY . .
ENV VITE_CACHE_DIR=/tmp/.vite
RUN npm run build

# Финальный образ
FROM node:20-alpine
WORKDIR /client
COPY --from=builder /client/dist ./dist
COPY --from=builder /client/node_modules ./node_modules
COPY package.json ./

EXPOSE 4173
CMD ["npm", "run", "preview"]