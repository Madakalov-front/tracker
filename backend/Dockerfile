# Используем официальный Node.js образ
FROM node:22

# Рабочая директория
WORKDIR /usr/src/app

# Копируем package.json и lock-файл отдельно (чтобы кешировались зависимости)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем TypeScript → dist
RUN npm run build

# Пробрасываем порт
EXPOSE 5000

# Запуск приложения
CMD ["npm", "start"]