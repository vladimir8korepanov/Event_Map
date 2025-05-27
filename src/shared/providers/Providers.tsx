"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";
import { initMocks } from "../api/initMocks";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      if (process.env.NODE_ENV === "development") {
        await initMocks();
      }
      setMswReady(true);
    };

    initialize();
  }, []);

  if (!mswReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}