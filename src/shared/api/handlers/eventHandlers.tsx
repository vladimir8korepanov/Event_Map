import { http, HttpResponse } from "msw";
import events from "@/../public/mock/events.json";
import { Event } from "@/entities/event/model/types";

export const eventHandlers = [
  http.get("/api/events", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.toLowerCase() || "";
    const filteredEvents = query
      ? events.filter(
          (event) =>
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query)
        )
      : (events as Event[]); //явно указываем, что events это массив
    return HttpResponse.json(filteredEvents);
  }),
];