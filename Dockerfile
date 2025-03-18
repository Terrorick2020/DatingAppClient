# Используем Node.js 20 на Alpine Linux
FROM node:20-alpine AS deps
WORKDIR /client

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --legacy-peer-deps --omit=dev --prefer-offline

# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY . . 

# Кешируем Vite
ENV VITE_CACHE_DIR=/tmp/.vite
RUN npm install -g typescript
RUN rm -rf ./dist && npm run build

# Финальный образ
FROM node:20-alpine
WORKDIR /client
COPY --from=builder /client/dist ./dist
COPY --from=builder /client/node_modules ./node_modules
COPY package.json ./

EXPOSE 4173
CMD ["npm", "run", "preview"]
