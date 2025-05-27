import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { server } from './src/shared/api/msw-server'

//расширяем expect с jest-dom матчрами
expect.extend(matchers)

//очистка после каждого теста
afterEach(() => {
  cleanup()
})

//глобальная настройка MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())