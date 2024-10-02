import { createSignal, onCleanup, Show } from "solid-js";
import { Toast, ToastContainer } from "solid-bootstrap";
import messageBus from "../events/messageBus";

interface EventBusMessage {
    message?: string,
}

export default function EventBusComponent() {

    const [message, setMessage] = createSignal<EventBusMessage>({ message: undefined });

    const unsub = messageBus.listen(message => {
        setMessage({ message: message });
    });

    onCleanup(() => {
        unsub();
    });

    return (
            <Toast
                bg="info"
                onClose={() => setMessage({ message: undefined })}
                show={(message().message ?? undefined) !== undefined}
                delay={3000}
                autohide>
                <Toast.Body>
                    {message().message}
                </Toast.Body>
            </Toast>
    )
}


