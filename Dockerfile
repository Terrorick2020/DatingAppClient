# 1 Этап: Cборка проекта
FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .

RUN npm install --legacy-peer-deps

# Копируем .env файл если он существует
COPY .env* ./

# Копируем остальные файлы
COPY . .

# Передаем переменные окружения через ARG и ENV
# Vite использует переменные окружения с префиксом VITE_ во время сборки
ARG VITE_BASE_URL
ARG VITE_WS_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_WS_URL=$VITE_WS_URL

# Загружаем все переменные из .env файла если он существует
# Vite автоматически загрузит переменные из .env файла
RUN npm run build
RUN npm run minify || echo "minify skipped"

# 2 Этап: Запуск сервера
FROM oven/bun:latest AS product

WORKDIR /client

COPY package.json .

RUN bun install --production
COPY --from=builder /client/dist ./dist

RUN bun install -g serve

EXPOSE 4177

CMD ["serve", "-s", "dist", "-l", "4177"]
