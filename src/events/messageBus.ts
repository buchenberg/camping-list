import { createEventBus } from "@solid-primitives/event-bus";

const messageBus = createEventBus<string>();
export default messageBus;