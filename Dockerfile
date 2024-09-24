# Используем образ с Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт, который будет открыт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
