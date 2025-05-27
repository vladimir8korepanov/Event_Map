'use client'

import React from 'react'
import { Event } from '../model/types'
import { Card, CardContent } from '@/components/ui/card'
import { FavoriteToggleButton } from '@/features/favorite/ui/FavoriteToggleButton'
import Image from 'next/image'
 
interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Card className='w-full shadow-md rounded-xl'>
            <CardContent className='p-4 shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in zoom-in-95 space-y-2'>
                {event.image && (
                    <div className="relative w-full h-48">
                        <Image
                        src={event.image || "/default-event.png"}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-md"
                        style={{ objectFit: "cover" }}
                        priority
                        />
                    </div>
                )}
                <div className='flex items-start justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold'>{event.title}</h3>
                        <p className='text-gray-600'>{event.description}</p>
                        <p className='text-sm text-muted-foreground'>
                            {new Date(event.date).toLocaleString()}
                        </p>
                    </div>
                    <FavoriteToggleButton eventId={event.id} />
                </div>
                {/* <p className='text-sm'>{event.description}</p> */}
                {/* сюда изображние можно */}
            </CardContent>
        </Card>
    )
}