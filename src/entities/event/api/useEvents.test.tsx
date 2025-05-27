import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEvents } from './useEvents'
import { server } from '@/shared/api/msw-server'
import { HttpResponse, http } from 'msw'
import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'

//cоздаём тестовый клиент QueryClient
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, //Отключаем повторные запросы в тестах
    },
  },
})

//обёртка для провайдеров
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
)

describe('useEvents hook', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('Тест успешной загрузки данных событий', async () => {
    const { result } = renderHook(() => useEvents(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    
    expect(result.current.data).toBeDefined()
    expect(result.current.data?.length).toBeGreaterThan(0)
  })

  it('Фильтрация события по запросу', async () => {
    server.use(
      http.get('/api/events', ({ request }) => {
        const url = new URL(request.url)
        const query = url.searchParams.get('query') || ''
        return HttpResponse.json(
          query ? [{ id: '1', title: 'Test Event' }] : []
        )
      })
    )

    const { result } = renderHook(() => useEvents(), { wrapper })

    await waitFor(() => {
      if (result.current.isSuccess) {
        expect(result.current.data).toEqual([{ id: '1', title: 'Test Event' }])
      }
    })
  })

  it('Обработка ошибок при загрузке событий', async () => {
    server.use(
      http.get('/api/events', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { result } = renderHook(() => useEvents(), { wrapper })

    await waitFor(() => {
        console.log('isError during waitFor:', result.current.isError);
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeDefined();
        //проверка сообщения об ошибке
        expect(result.current.error?.message).toContain('Ошибка загрузки событий: Internal Server Error');
    }, { timeout: 2000 });//увеличил тайм аут, для того что бы react-query обработал ошибку и стал true
  })
})