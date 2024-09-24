# Проект NestJS с аутентификацией

## Описание

Это приложение на основе NestJS, которое предоставляет API для аутентификации пользователей с использованием JWT. Пользователи могут регистрироваться и входить в систему, а также получать свою информацию профиля.

## Установка и запуск проекта с использованием Docker

### Шаги установки

1. Создайте файл .env
   ```bash
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=redis
   REDIS_PORT=6379

2. Запуск через докер
   ```bash
   docker-compose up -d --build
   
## Примеры использования API

### Регистрация пользователя
/auth/register

{
"email": "example@example.com",
"password": "your_password"
}

### Вход пользователя

{
"email": "example@example.com",
"password": "your_password"
}