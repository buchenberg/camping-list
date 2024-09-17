import { Alert, Box, Fade } from "@suid/material";
import { createSignal, onCleanup, Show } from "solid-js";
import { eventBus } from "../App";

interface EventBusMessage {
    message?: string
}

export default function EventBusComponent() {

    const [message, setMessage] = createSignal<EventBusMessage>({ message: undefined });
    const unsub = eventBus.listen(message => {
        console.log(message);
        setMessage({ message: message });
    });

    onCleanup(() => {
        console.log("EventBusComponent unmounted");
        unsub();
    });



    return <Fade in={message().message !== undefined}>
        <Alert severity="success" onClose={() => {
            setMessage({ message: undefined });
        }}>{message().message}</Alert>
    </Fade>


}


