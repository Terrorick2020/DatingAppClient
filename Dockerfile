# Базовый образ с зависимостями
FROM node:20-alpine AS deps
WORKDIR /client

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps --prefer-offline --audit=false --fund=false

# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY . . 

# Указываем кеш для Vite
ENV VITE_CACHE_DIR=/tmp/.vite
RUN rm -rf ./dist && npm run build

# Финальный образ
FROM node:20-alpine
WORKDIR /client
COPY --from=builder /client/dist ./dist
COPY --from=builder /client/node_modules ./node_modules
COPY package.json ./

EXPOSE 4173
CMD ["npm", "run", "preview"]
