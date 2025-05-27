'use client' 

import React from 'react'
import dynamic from 'next/dynamic'

const EventMapClient = dynamic(
  () => import('@/widgets/EventMap/EventMapClient'),
  {
    ssr: false,
    loading: () => <div className="h-map bg-gray-100 animate-pulse rounded-xl" />
  }
)

export default function EventMap() {
  return <EventMapClient />
}
