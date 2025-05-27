import { create } from "zustand";
import { Event } from "./types";

interface EventStore {
    events: Event[]
    setEvents: (events: Event[]) => void
    loadEvents: () => Promise<void>;
}

export const useEventStore = create<EventStore>((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
    loadEvents: async () => {
        try{
            const response = await fetch("/mock/events.json");

            if (!response.ok) {
                throw new Error(`Не удалось загрузить события: ${response.status} ${response.statusText}`);
            }
            const events: Event[] = await response.json();
            set({ events });
        } catch (error) { 
            console.error("Ошибка загрузки событий:", error);
            set({ events: [] });
        }
    },
}));
