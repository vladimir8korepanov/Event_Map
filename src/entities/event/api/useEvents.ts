import { useQuery } from "@tanstack/react-query";
import { useEventStore } from "../model/eventStore";
import { Event } from "../model/types";
import { useSearchStore } from "@/features/search/model/searchStore";
import { useFavoriteStore } from "@/features/favorite/model/favoriteStore";
import { useEffect } from "react";

export const useEvents = () => {
  const setEvents = useEventStore((state) => state.setEvents);
  const query = useSearchStore((state) => state.query);
  const actualQuery = typeof query === "string" ? query.trim() : undefined;
  const showOnlyFavorites = useFavoriteStore((state) => state.showOnlyFavorites);
  const favorites = useFavoriteStore((state) => state.favorites);

  const result = useQuery<Event[], Error>({
    queryKey: ["events", actualQuery, showOnlyFavorites],
    queryFn: async () => {
      const url = `/api/events${actualQuery ? `?query=${encodeURIComponent(actualQuery)}` : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Ошибка загрузки событий: ${res.statusText}`);
      const data = await res.json();
      return showOnlyFavorites ? data.filter((event: Event) => favorites.has(event.id)) : data;
    },
    enabled: true,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (result.data) {
      setEvents(result.data);
    }
  }, [result.data, setEvents]);

  return result;
};