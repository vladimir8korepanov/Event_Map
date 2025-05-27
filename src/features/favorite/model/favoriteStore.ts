import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

interface FavoriteState {
  favorites: Set<string>;
  showOnlyFavorites: boolean;
  toggleFavorite: (id: string) => void;
  toggleShowOnlyFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      showOnlyFavorites: false,
      toggleFavorite: (id) => {
        const newFavorites = new Set(get().favorites);
        if (newFavorites.has(id)) {
          newFavorites.delete(id);
        } else {
          newFavorites.add(id);
        }
        set({ favorites: newFavorites });
      },
      toggleShowOnlyFavorites: () => set((state) => ({ showOnlyFavorites: !state.showOnlyFavorites })),
    }),
    {
      name: "favorite-storage",
      //Настраиваем сериализацию и десериализацию для Set
      storage: {
        getItem: (name) : StorageValue<FavoriteState> | null => {
          const value = localStorage.getItem(name);
          if (!value) return null;
          const parsed = JSON.parse(value);
          if (!parsed || !parsed.state) return null;
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: new Set(parsed.state.favorites), //преобразуем массив обратно в Set
            },
          };
        },
        setItem: (name, value: StorageValue<FavoriteState>) => {
          const newValue = {
            ...value,
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites), //преобразуем Set в массив для хранения
            },
          };
          localStorage.setItem(name, JSON.stringify(newValue));
        },
        removeItem: (name) => localStorage.removeItem(name),
      } satisfies PersistStorage<FavoriteState>,
    }
  )
);