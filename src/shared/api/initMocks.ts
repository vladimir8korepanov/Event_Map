export const initMocks = async () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined') {
      const { worker } = await import("./msw"); //динамический импорт
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    }
  }
};