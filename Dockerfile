FROM oven/bun:1.0.25-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /client

COPY package.json .

RUN bun install --no-progress

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["bun", "run", "preview"]
