'use client'

import React from 'react';
import { useEventStore } from '../model/eventStore';
import { useSearchStore } from "@/features/search/model/searchStore";
import { Card } from '@/components/ui/card';
import { useFavoriteStore } from "@/features/favorite/model/favoriteStore";
// import { FavoriteToggleButton } from "@/features/favorite/ui/FavoriteToggleButton";
import { EventCard } from "./EventCard";

export function EventList() {
    const events = useEventStore((state) => state.events);
    const query = useSearchStore((state) => state.query.toLowerCase());
    const { favorites, showOnlyFavorites } = useFavoriteStore()

    const filtered = events
        .filter((e) => 
        e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)
    )
        .filter((e) => (showOnlyFavorites ? favorites.has(e.id) : true))

    // if (events.length === 0) {
    //     return <p className="p-4 text-gray-500">Нет доступных событий</p>
    // }

    if (filtered.length === 0) {
        return <p className="p-2 sm:p-4 text-gray-500 text-xs sm:text-base">Ничего не найдено</p>
    }

    return (
        <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 overflow-y-auto max-h-screen">
            {filtered.map((event) => (
                <Card key={event.id} className="p-2 sm:p-4 shadow-md hover:bg-gray-50 cursor-pointer transition">
                    {/* <h3 className="text-base sm:text-lg font-semibold">{event.title}</h3>
                    {/* <FavoriteToggleButton eventId={event.id} /> */}
                    {/* <p className="text-xs sm:text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
                    <p className="text-xs sm:text-sm">{event.description}</p> */}
                    <EventCard key={event.id} event={event} />
                </Card>
            ))}
        </div>
    )
}