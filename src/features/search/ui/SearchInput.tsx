'use client'

import React from 'react';
import { Input } from '@/components/ui/input';
import { useSearchStore } from '../model/searchStore';
import { debounce } from '@/shared/lib/debounce';
import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

export function SearchInput() {
    const setQuery = useSearchStore((state) => state.setQuery)

    const handleChange = debounce((value: string) => {
        setQuery(value)
    }, 300)

    return (
        <div className='p-4'>
            <Search className='absolute left-6 top-6 w-4 text-gray-500' />
            <Input
                type="text"
                placeholder='Поиск события...'
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                className='w-full max-w-md rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring focus:ring-blue-200 transition'
            />
        </div>
    )
}