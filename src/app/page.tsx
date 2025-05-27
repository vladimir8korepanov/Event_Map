"use client";

import React from "react";
import EventMap from "@/pages/map/ui/EventMap";
import { EventSidebar } from "@/widgets/EventSidebar";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useState, useEffect } from "react";
import { useEventStore } from "@/entities/event/model/eventStore";

export default function Home() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { loadEvents } = useEventStore();

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row h-full">
        {/* на мобильных сначала карта, затем список */}
        <main className="w-full md:flex-1 h-[50vh] md:h-auto">
          <EventMap />
        </main>
        <div className="w-full md:w-1/3 bg-[#83c5be] overflow-y-auto md:h-[calc(100vh-9rem)]">
          <EventSidebar
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}