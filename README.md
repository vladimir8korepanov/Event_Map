# Event Map — Интерактивная карта мероприятий

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-%2361DAFB.svg)](https://react.dev/)

Приложение для поиска событий на интерактивной карте с поддержкой геолокации и системой избранного.

## Основные возможности

- **Поиск событий** с фильтрацией в реальном времени
- **Система избранного** с сохранением в локальное хранилище
- **Интерактивная карта** на базе Leaflet
- **Автоматический центр карты** по вашей геолокации
- **Мокированный API** через MSW
- **Адаптивный интерфейс** с Tailwind CSS

## Технологии

**Frontend:**
- Next.js 14 (App Router)
- React 19 + TypeScript
- Zustand (стейт-менеджмент)
- TanStack Query (запросы к API)
- Leaflet (карты)
- MSW (мокинг API)

**Тестирование:**
- Vitest + Testing Library
- MSW для моков API

## Запуск проекта

### Предварительные требования
    - Node.js 18+
    - npm 9+


### 1. Клонировать репозиторий
    git clone https://github.com/your-username/event-map.git
    cd event-map

### 2. Установить зависимости
    npm install

### 3. Инициализировать сервис-воркер для MSW
    npx msw init public/ --save

### 4. Запустить в режиме разработки:

    npm run dev


**Приложение будет доступно по адресу:**
    `http://localhost:3000`

## Тестирование

### Запуск всех тестов
    npm test

### Запуск в watch-режиме
    npm run test:watch

### Покрытие кода тестами
    npm run test:coverage 


## Структура проекта

```
event-map/
├── public/            # Статические ресурсы
│   └── mock/          
│       └── events.json  # Моковые данные
├── src/
│   ├── app/           # Роутинг Next.js
│   ├── entities/      # Бизнес-логика
│   ├── features/      # Функциональные модули
│   ├── shared/        # Общие ресурсы
│   └── widgets/       # Составные компоненты

```

## Автор: 
**Владимир Корепанов**
