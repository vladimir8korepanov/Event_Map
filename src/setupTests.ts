import "@testing-library/jest-dom";
import { server } from "./shared/api/msw-server"; // Обновили импорт с msw

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());