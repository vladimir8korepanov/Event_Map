"use client";

import React, { useEffect, useState } from "react";
import { SetupWorkerApi } from "msw/browser";
import { initMocks } from "../api/initMocks";

declare global {
    interface Window {
        worker: SetupWorkerApi;
    }
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    initMocks().then(() => {
      setIsMSWReady(true);
      console.log('MSW инициализирован в провайдере')
    })
    .catch((error) => console.error("Ошибка инициализации MSW:", error));

    return () => {
      //Очистка MSW при размонтировании
      if (typeof window !== "undefined" && "worker" in window) {
        window.worker.stop();
        console.log("MSW остановлен")
      }
    };
  }, []);

  //пока MSW не готов, не рендерим дочкерние компоненты
  if (!isMSWReady && process.env.NODE_ENV === "development") {
    return <div>Инициализация MSW...</div>;
  }

  return <>{children}</>;
}