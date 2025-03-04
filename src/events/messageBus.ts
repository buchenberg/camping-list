import { createEventBus } from "@solid-primitives/event-bus";

/**
 * Defines the structure of all possible message events in the application
 */
export interface MessageEvents {
  'item:add': { id: string; name: string };
  'item:remove': { id: string };
  'item:update': { id: string; name?: string; completed?: boolean };
  'list:clear': void;
  'notification': { message: string };
}

/**
 * Type-safe event bus for handling application-wide messages
 * Uses discriminated union types to ensure type safety when publishing and subscribing to events
 */
const messageBus = createEventBus<{
  type: keyof MessageEvents;
  payload: MessageEvents[keyof MessageEvents];
}>();

/**
 * Helper function to publish a strongly-typed event
 * @param type - The event type
 * @param payload - The event payload
 */
export const publishEvent = <T extends keyof MessageEvents>(
  type: T,
  payload: MessageEvents[T]
) => {
  messageBus.emit({ type, payload });
};

/**
 * Helper function to subscribe to a specific event type
 * @param type - The event type to subscribe to
 * @param handler - The callback function to handle the event
 * @returns A function to unsubscribe from the event
 */
export const subscribeToEvent = <T extends keyof MessageEvents>(
  type: T,
  handler: (payload: MessageEvents[T]) => void
) => {
  return messageBus.listen((event) => {
    if (event.type === type) {
      handler(event.payload as MessageEvents[T]);
    }
  });
};

export default messageBus;