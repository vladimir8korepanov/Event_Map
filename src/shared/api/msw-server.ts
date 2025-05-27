//для Node.js (!тестировать в Node окружении!)
import { setupServer } from 'msw/node'
import { eventHandlers } from './handlers/eventHandlers'

export const server = setupServer(...eventHandlers)