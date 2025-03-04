import { createSignal, onCleanup, Show } from "solid-js";
import { subscribeToEvent } from "../events/messageBus";
import "98.css";

interface EventBusMessage {
    message?: string,
}

export default function EventBusComponent() {
    const [message, setMessage] = createSignal<EventBusMessage>({ message: undefined });

    const unsub = subscribeToEvent('notification', payload => {
        setMessage({ message: payload.message });
        // Auto-hide after 3 seconds
        setTimeout(() => setMessage({ message: undefined }), 3000);
    });

    onCleanup(() => {
        unsub();
    });

    return (
        <Show when={message().message}>
            <div class="window" style="position: fixed; bottom: 20px; right: 20px; width: 300px; z-index: 9999">
                <div class="title-bar">
                    <div class="title-bar-text">Notification</div>
                    <div class="title-bar-controls">
                        <button aria-label="Close" onClick={() => setMessage({ message: undefined })}></button>
                    </div>
                </div>
                <div class="window-body">
                    <p>{message().message}</p>
                </div>
            </div>
        </Show>
    );
}


