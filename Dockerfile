# Сборочный этап
FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . . 
RUN npm run build
RUN npm run minify

# # Этап продакшена — через nginx
# FROM nginx:stable-alpine
# COPY --from=builder /client/node_modules ./node_modules
# COPY --from=builder /client/dist /usr/share/nginx/html
# EXPOSE 4173
# CMD ["nginx", "-g", "daemon off;"]

# Пробная версия
EXPOSE 4173

CMD ["npm", "run", "preview"]