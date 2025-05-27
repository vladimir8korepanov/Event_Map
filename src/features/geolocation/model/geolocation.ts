import { create } from "zustand";

interface GeolocationState {
  userLocation: [number, number] | null;
  setUserLocation: (coords?: [number, number]) => void;
}

export const useGeolocationStore = create<GeolocationState>((set) => ({
  userLocation: null, //начальное состояние = нет координат
  setUserLocation: (coords) => {
    if (coords) {
      // если координаты переданы вручную
      set({ userLocation: coords });
    } else if (navigator.geolocation) {
      //иначе пробуем получить координаты через браузерную API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            userLocation: [position.coords.latitude, position.coords.longitude],
          });
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          set({ userLocation: null });
        }
      );
    } else {
      console.error("Геолокация не поддерживается вашим браузером.");
      set({ userLocation: null });
    }
  },
}));