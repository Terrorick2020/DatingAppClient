FROM node:22-alpine

WORKDIR /client

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
RUN npm run minify || echo "minify skipped"

EXPOSE 4173

CMD ["npm", "run", "preview"]