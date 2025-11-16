# 1 Этап: Cборка проекта
FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build
RUN npm run minify || echo "minify skipped"

# 2 Этап: Запуск сервера
FROM oven/bun:latest AS product

WORKDIR /client

COPY package.json .

RUN bun install --production
COPY --from=builder /client/dist ./dist

RUN bun install -g http-server

EXPOSE 4178

CMD ["http-server", "dist", "-p", "4178", "-a", "0.0.0.0", "--cors"]
