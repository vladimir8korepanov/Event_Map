"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEvents } from "@/entities/event/api/useEvents";
import { useFavoriteStore } from "@/features/favorite/model/favoriteStore";
import { FavoriteToggleButton } from "@/features/favorite/ui/FavoriteToggleButton";
import { useGeolocationStore } from "@/features/geolocation/model/geolocation";
import React, { useEffect, useState } from "react";

//кастомная иконка с анимацией
const createAnimatedIcon = (iconUrl: string) => {
  const icon = L.divIcon({
    className: "custom-marker",
    html: `<div style="background-image: url(${iconUrl}); width: 40px; height: 40px; sm:width: 35px; sm:height: 35px; background-size: cover; transform-origin: center bottom;" class="transition-transform duration-200 hover:scale-110"></div>`,
    iconSize: [30, 30],
    iconAnchor: [22.5, 45],
    popupAnchor: [0, -40],
  });
  return icon;
};

const customIcon = createAnimatedIcon("/image/marker_icon.png");
const favoriteIcon = createAnimatedIcon("/image/favorite_marker_icon.png");

export default function EventMapClient() {
  const { userLocation, setUserLocation } = useGeolocationStore();
  const { data: events, isLoading, error } = useEvents();
  const favorites = useFavoriteStore((state) => state.favorites);
  const [isMounted, setIsMounted] = useState(false);

  console.log("favorites:", favorites, "typeof favorites:", typeof favorites);

  //убедимся, что компонент рендерится только на клиенте
  useEffect(() => {
    setIsMounted(true);
    setUserLocation();
  }, [setUserLocation]);

  console.log("EventMapClient rendering", { isLoading, error, events, userLocation });

  if (!isMounted) return <div className="p-4">Загрузка карты...</div>;
  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка: {error.message}</div>;

  if (!(favorites instanceof Set)) {
    console.error("favorites is not a Set:", favorites);
    return <div className="p-4 text-red-500">Ошибка: Некорректное состояние избранного</div>;
  }

  return (
    <MapContainer
      center={userLocation || [56.8389, 53.2115]}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full shadow-lg"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {events?.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.lat, event.location.lng]}
          icon={favorites.has(event.id) ? favoriteIcon : customIcon}
        >
          <Popup>
            <div className="relative p-2 sm:p-4 bg-white bg-opacity-80 min-h-[100px] sm:min-h-[200px] min-w-[150px] sm:min-w-[250px] rounded-lg overflow-hidden">  
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: event.image
                    ? `url(${event.image})`
                    : `url(/default-event.png)`,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>
              <div className="relative z-10 text-white flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-xs sm:text-sm">{event.description}</p>
                  <p className="text-[10px] sm:text-xs">
                    {new Date(event.date).toLocaleString()}
                  </p>
                    <FavoriteToggleButton eventId={event.id} />
                  </div>
              </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <Marker position={userLocation} icon={customIcon}>
          <Popup>Вы здесь!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}