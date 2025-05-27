export const initMocks = async () => {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    console.log("Запуск MSW...");
    const { worker } = await import("./msw"); //динамический импорт

    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
    console.log("MSW запущен");
  }
};