#!/bin/bash
set -e

# Получаем текущее имя ветки Git
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Установка соответствующего URL бэкенда в зависимости от ветки
if [ "$BRANCH_NAME" = "main" ]; then
  export DATABASE_URL="postgres://postgres:qwaswestenter@localhost:5432/postgres"
elif [ "$BRANCH_NAME" = "develop" ]; then
  export DATABASE_URL="postgres://postgres:qwaswestenter@localhost:5432/postgres"
fi

echo "Running in branch: $BRANCH_NAME"
echo "$DATABASE_URL is set to: $DATABASE_URL"

# Запуск установки
echo "Starting install..."
npm install && echo "install complete."

# Запуск сборки
echo "Starting build..."
rm -rf dist

#npx prisma migrate dev
#npx prisma db pull
#npx prisma generate

npm run build && echo "Build complete."

# После завершения сборки запускаем приложение через PM2
echo "Starting application with PM"

pm2 start ecosystem.config.cjs