FROM node:16-slim as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install
COPY --from=builder /app/dist ./dist
EXPOSE 3333
CMD npm run start:prod
