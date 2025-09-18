FROM node:22
WORKDIR /usr/src/app

# Копируем package.json и lock-файл отдельно
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm install --omit=dev

# Копируем весь проект
COPY . .

# Сборка TypeScript
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/server.js"]