FROM oven/bun:1.0.25-alpine

WORKDIR /client

COPY package.json ./

RUN bun install --no-progress

COPY . .

RUN bun run build

EXPOSE 4173

CMD ["bun", "run", "preview"]
