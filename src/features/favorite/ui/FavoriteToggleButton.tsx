'use client'

import React from 'react'
import { Star, StarOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoriteStore } from '../model/favoriteStore'

interface FavoriteToggleButtonProps {
    eventId: string
}

export function FavoriteToggleButton({ eventId }: FavoriteToggleButtonProps) {
    const favorites = useFavoriteStore((s) => s.favorites)
    const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite)

    const isFavorite = favorites.has(eventId)

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => toggleFavorite(eventId)}
            className="ml-auto transition-transform duration-200 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            {isFavorite ? <Star className='text-red-400' /> : <StarOff />}
        </Button>
    )
}