import { eventHandlers } from "./handlers/eventHandlers";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...eventHandlers);
