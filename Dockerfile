# 1 Этап: Cборка проекта
FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .
RUN npm install --legacy-peer-deps
# Устанавливаем http-server глобально для использования в production
RUN npm install -g http-server

COPY . .
RUN npm run build
RUN npm run minify || echo "minify skipped"

# 2 Этап: Запуск сервера
FROM node:22-alpine AS product

WORKDIR /client

# Копируем только собранные файлы
COPY --from=builder /client/dist ./dist
# Копируем простой Node.js сервер
COPY server.js ./

EXPOSE 4178

# Запускаем простой Node.js сервер
CMD ["node", "server.js"]
