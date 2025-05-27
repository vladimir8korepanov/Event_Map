This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
event_map
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ default-marker.png
│  ├─ eventImg
│  │  ├─ 1.png
│  │  ├─ 10.png
│  │  ├─ 11.png
│  │  ├─ 12.png
│  │  ├─ 13.png
│  │  ├─ 14.png
│  │  ├─ 15.png
│  │  ├─ 2.png
│  │  ├─ 3.png
│  │  ├─ 4.png
│  │  ├─ 5.png
│  │  ├─ 6.png
│  │  ├─ 7.png
│  │  ├─ 8.png
│  │  └─ 9.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ image
│  │  ├─ favorite_marker_icon.png
│  │  ├─ gps.png
│  │  └─ marker_icon.png
│  ├─ mock
│  │  └─ events.json
│  ├─ mockServiceWorker.js
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ privacy-policy
│  │  │  └─ page.tsx
│  │  └─ terms-of-use
│  │     └─ page.tsx
│  ├─ components
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ Footer.tsx
│  │     ├─ Header.tsx
│  │     ├─ input.tsx
│  │     └─ Switch.tsx
│  ├─ entities
│  │  └─ event
│  │     ├─ api
│  │     │  ├─ useEvents.test.tsx
│  │     │  └─ useEvents.ts
│  │     ├─ model
│  │     │  ├─ eventStore.ts
│  │     │  └─ types.ts
│  │     └─ ui
│  │        ├─ EventCard.tsx
│  │        └─ EventList.tsx
│  ├─ features
│  │  ├─ favorite
│  │  │  ├─ model
│  │  │  │  └─ favoriteStore.ts
│  │  │  └─ ui
│  │  │     ├─ FavoriteToggleButton.tsx
│  │  │     └─ ToggleFavoritesButton.tsx
│  │  ├─ geolocation
│  │  │  └─ model
│  │  │     └─ geolocation.ts
│  │  └─ search
│  │     ├─ model
│  │     │  └─ searchStore.tsx
│  │     └─ ui
│  │        └─ SearchInput.tsx
│  ├─ lib
│  │  └─ utils.ts
│  ├─ pages
│  │  └─ map
│  │     └─ ui
│  │        └─ EventMap.tsx
│  ├─ setupTests.ts
│  ├─ shared
│  │  ├─ api
│  │  │  ├─ handlers
│  │  │  │  └─ eventHandlers.tsx
│  │  │  ├─ initMocks.ts
│  │  │  ├─ msw-server.ts
│  │  │  ├─ msw.ts
│  │  │  ├─ MSWProvider.tsx
│  │  │  └─ QueryProvider.tsx
│  │  ├─ config
│  │  │  └─ queryClient.ts
│  │  ├─ lib
│  │  │  └─ debounce.ts
│  │  ├─ providers
│  │  │  └─ Providers.tsx
│  │  └─ ui
│  └─ widgets
│     ├─ EventMap
│     │  └─ EventMapClient.tsx
│     └─ EventSidebar.tsx
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.ts
├─ vitest.config.ts
└─ vitest.setup.ts

```