# Stage 1: build
FROM node:22 AS builder
WORKDIR /usr/src/app

COPY package*.json ./

# Устанавливаем все зависимости, включая dev
RUN npm install

COPY . .

# Сборка TypeScript
RUN npm run build

# Stage 2: production
FROM node:22
WORKDIR /usr/src/app

COPY package*.json ./

# Только production зависимости
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]
