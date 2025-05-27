"use client";

import React from "react";
import { EventCard } from "@/entities/event/ui/EventCard";
import { useEventStore } from "@/entities/event/model/eventStore";
import { ToggleFavoritesButton } from "@/features/favorite/ui/ToggleFavoritesButton";
import { useFavoriteStore } from "@/features/favorite/model/favoriteStore";
import { Switch } from "@/components/ui/Switch";

interface EventSidebarProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (value: boolean) => void;
}

export function EventSidebar({ showFavoritesOnly, setShowFavoritesOnly }: EventSidebarProps) {
  const events = useEventStore((state) => state.events);
  const favorites = useFavoriteStore((state) => state.favorites);
  
  console.log("EventSidebar rendering", { events, showFavoritesOnly, favorites });

  const filteredEvents = showFavoritesOnly ? events.filter((event) => favorites.has(event.id)) : events;

  return (
    <div className="h-full p-2 sm:p-4 bg-[#83c5be] overflow-y-auto">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <ToggleFavoritesButton />
        <div className="flex items-center space-x-2">
          <Switch
            checked={showFavoritesOnly}
            onCheckedChange={setShowFavoritesOnly}
            className="bg-[#edf6f9]"
          />
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {filteredEvents.length ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="text-[#006d77] text-sm sm:text-base">Нет событий</p>
        )}
      </div>
    </div>
  );
}