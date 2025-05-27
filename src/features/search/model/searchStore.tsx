//zustand хранилище для поиска
import { create } from "zustand";

interface SearchState {
    query: string;
    setQuery: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    query: '',
    setQuery: (query) => set({ query }),
}));