
import { createSignal, For } from "solid-js";
import { campingTrips } from "../../store/campingTrips";
import { ICampingItem, ICampingTrip, IPersistedCampingItem, IPersistedCampingTrip } from "../../store/types";
import { Button, Card, Form, ListGroup, Modal, Tab, Table, Tabs } from "solid-bootstrap";

export default function CampingTripList() {
    const [open, setOpen] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleEdit = (item: IPersistedCampingItem) => {
        setSelectedKeyValue(item.key);
        setLocationValue(item.value.name);
        setOpen(true);
    }
    const clearValues = () => {
        setSelectedKeyValue("");
        setLocationValue("");
    }
    const handleClose = () => {
        clearValues();
        setSelectedKeyValue("");
        setIsSubmitting(false);
        setOpen(false);
    };

    const [selectedKeyValue, setSelectedKeyValue] = createSignal<string>("");
    const [locationValue, setLocationValue] = createSignal<string>("");

    const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false);

    const handleLocationInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) => {
        setLocationValue(e.currentTarget.value);
    }


    const handleClearAll = () =>
        campingTrips.deleteAll();

    const handleSubmit = () => {
        setIsSubmitting(true);

        if (!locationValue()) return;

        const campingTrip: ICampingTrip = {
            location: locationValue(),
            dateStart: new Date(),
            dateEnd: new Date(),
            items: []
        }

        if (selectedKeyValue()) {
            campingTrips.editItem({key: selectedKeyValue(), value: campingTrip});
        }
        else {
            campingTrips.addItem(campingTrip);
        }
        clearValues();
        setIsSubmitting(false);
        handleClose();
    }

    return (
        <>
        <p>You can add camping items here. Go ahead. all the cool kids are doing it.</p>
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={campingTrips.items}>
                                {(item: IPersistedCampingTrip) =>
                                    <tr>
                                        <td>{item.key}</td>
                                        <td>{item.value.location}</td>
                                    </tr>

                                }
                            </For>
                        </tbody>
                    </Table>
                    <Button variant="success" aria-label="add item" onClick={handleOpen} class="m-1">
                        Add New Trip
                    </Button>
                    <Button variant="danger" aria-label="clear items" onClick={handleClearAll} class="m-1">
                        Clear All Trips
                    </Button>
                </Card.Body>

            </Card>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

