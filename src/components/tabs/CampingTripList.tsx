
import { createSignal, For } from "solid-js";
import { campingTripStore } from "../../store/campingTripStore";
import { ICampingTrip, IPersistedCampingTrip } from "../../store/types";
import { Alert, Button, Form, Modal, Table } from "solid-bootstrap";

export default function CampingTripList() {
    const [open, setOpen] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleEdit = (item: IPersistedCampingTrip) => {
        setLocationValue(item.value.location);
        setStartDateValue(item.value.dateStart);
        setEndDateValue(item.value.dateEnd);
        setSelectedKeyValue(item.key);
        setOpen(true);
    }
    const clearValues = () => {
        setSelectedKeyValue("");
        setLocationValue("");
        setStartDateValue("");
        setEndDateValue("");
    }
    const handleClose = () => {
        clearValues();
        setIsSubmitting(false);
        setOpen(false);
    };

    const [selectedKeyValue, setSelectedKeyValue] = createSignal<string>("");
    const [locationValue, setLocationValue] = createSignal<string>("");
    const [startDateValue, setStartDateValue] = createSignal<string>("");
    const [endDateValue, setEndDateValue] = createSignal<string>("");

    const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false);

    const handleLocationInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) => {
        setLocationValue(e.currentTarget.value);
    }
    const handleStartDateInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) => {
        setStartDateValue(e.currentTarget.value);
    }

    const handleEndDateInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) => {
        setEndDateValue(e.currentTarget.value);
    }


    const handleClearAll = () =>
        campingTripStore.deleteAll();

    const handleSubmit = () => {
        setIsSubmitting(true);

        if (!locationValue()) return;

        const campingTrip: ICampingTrip = {
            location: locationValue(),
            dateStart: startDateValue(),
            dateEnd: endDateValue(),
            items: []
        }

        if (selectedKeyValue()) {
            campingTripStore.editItem({ key: selectedKeyValue(), value: campingTrip });
        }
        else {
            campingTripStore.addItem(campingTrip);
        }
        clearValues();
        setIsSubmitting(false);
        handleClose();
    }

    return (
        <>
            <p>You can add camping items here. Go ahead. all the cool kids are doing it.</p>
            {campingTripStore.count > 0 ?
                <Table striped borderless>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th style="width:  10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={campingTripStore.items}>
                            {(item: IPersistedCampingTrip) =>
                                <tr>
                                    <td>{item.value.location}</td>
                                    <td>{item.value.dateStart}</td>
                                    <td>{item.value.dateEnd}</td>
                                    <td><Button onClick={() => handleEdit(item)} class="float-end">Edit</Button></td>
                                </tr>

                            }
                        </For>
                    </tbody>
                </Table>
                :
                <Alert variant="dark">
                    <Alert.Heading>No trips</Alert.Heading>
                    <p>Add a camping trip and it will show up here.</p>
                </Alert>
            }
            <Button variant="primary" aria-label="add item" onClick={handleOpen} class="m-1">
                Add New Trip
            </Button>
            <Button variant="secondary" aria-label="clear items" onClick={handleClearAll} class="m-1">
                Clear All Trips
            </Button>

            <Modal show={open()} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedKeyValue() ? `Edit ${locationValue()}` : "Add Trip"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group class="mb-3" controlId="formCampingTrip">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter trip location" value={locationValue()} onChange={e => handleLocationInput(e)} />
                        <Form.Text class="text-muted">
                            Blah.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group class="mb-3" controlId="formCampingTrip">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter trip start date" value={startDateValue()} onChange={e => handleStartDateInput(e)} />
                        <Form.Text class="text-muted">
                            Blah.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group class="mb-3" controlId="formCampingTrip">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter trip end date" value={endDateValue()} onChange={e => handleEndDateInput(e)} />
                        <Form.Text class="text-muted">
                            Blah.
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

