"use client";

import React from "react";
import { useFavoriteStore } from "../model/favoriteStore";

export function ToggleFavoritesButton() {
  const showOnlyFavorites = useFavoriteStore((state) => state.showOnlyFavorites);
  const toggleShowOnlyFavorites = useFavoriteStore((state) => state.toggleShowOnlyFavorites);

  return (
    <button
      onClick={toggleShowOnlyFavorites}
      className="mb-4 px-4 py-2 rounded-md bg-[#edf6f9] text-[#006d77] hover:bg-[#8cd4cd] transition-colors"
    >
      {showOnlyFavorites ? "Показать все события" : "Показать только избранное"}
    </button>
  );
}