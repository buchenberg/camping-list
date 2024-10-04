
import { createSignal, For } from "solid-js";
import { campingItemStore } from "../../store/campingItemStore";
import { ICampingItem, IPersistedCampingItem } from "../../store/types";
import { Alert, Button, Container, Form, Modal, Table } from "solid-bootstrap";
import { FiEdit, FiTrash } from "solid-icons/fi";
import { useTransContext } from "@mbarzda/solid-i18next";

export default function CampingItemList() {
    const [t] = useTransContext();
    const [open, setOpen] = createSignal(false);
    const [isEdit, setIsEdit] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleEdit = (item: IPersistedCampingItem) => {
        setIsEdit(true);
        setNameValue(item.value.name);
        setUomValue(item.value.uom);
        setQtyValue(item.value.qty);
        setOpen(true);
    }
    const handleDelete = (item: IPersistedCampingItem) => {
        campingItemStore.delete(item.key);
    }
    const clearValues = () => {
        setNameValue("");
        setUomValue("");
        setQtyValue(0);
    }
    const handleClose = () => {
        clearValues();
        setIsEdit(false);
        setIsSubmitting(false);
        setOpen(false);
    };

    const [nameValue, setNameValue] = createSignal<string>("");
    const [uomValue, setUomValue] = createSignal<string>("");
    const [qtyValue, setQtyValue] = createSignal<number>(0);

    const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false);

    const handleNameInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) => {
        setNameValue(e.currentTarget.value);
    }

    const handleUomInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) =>
        setUomValue(e.currentTarget.value);

    const handleQtyInput = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }) =>
        setQtyValue(Number(e.currentTarget.value));

    const handleClearAll = () =>
        campingItemStore.deleteAll();

    const handleSubmit = () => {
        setIsSubmitting(true);

        if (!uomValue() || !nameValue || !qtyValue()) return;

        const campingItem: ICampingItem = {
            name: nameValue(),
            uom: uomValue(),
            qty: qtyValue()
        }

        if (isEdit()) {
            campingItemStore.editItem(campingItem);
            setIsEdit(false);
        }
        else {
            campingItemStore.addItem(campingItem);
        }
        clearValues();
        setIsSubmitting(false);
        handleClose();
    }

    return (
        <>
            <Container>
                <p>{t("camping_list_header")}</p>
                {campingItemStore.count > 0 ?
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>{t("item_name_table_header")}</th>
                                <th>{t("uom_table_header")}</th>
                                <th>{t("qty_table_header")}</th>
                                <th style="width: 10%" />
                            </tr>
                        </thead>
                        <tbody>
                            <For each={campingItemStore.items}>
                                {(item: IPersistedCampingItem) =>
                                    <tr onClick={(e) => console.log(e)}>
                                        <td>{item.value.name}</td>
                                        <td>{item.value.uom}</td>
                                        <td>{item.value.qty}</td>
                                        <td>
                                            <FiTrash onClick={() => handleDelete(item)} class="click-icon m-1" color="red" />
                                            <FiEdit onClick={() => handleEdit(item)} class="click-icon m-1" color="green" />
                                        </td>
                                    </tr>

                                }
                            </For>
                        </tbody>
                    </Table>
                    :
                    <Alert variant="dark">
                        <Alert.Heading>No items</Alert.Heading>
                        <p>Add an item and it will show up here.</p>
                    </Alert>
                }

                <div>
                    <Button variant="primary" aria-label="add item" onClick={handleOpen} class="me-2">
                    {t("add_new_item")}
                    </Button>
                    {campingItemStore.count > 0 &&
                        <Button variant="secondary" aria-label="clear items" onClick={handleClearAll} >
                            {t("clear_all_items")}
                        </Button>
                    }

                </div>
            </Container>



            <Modal show={open()} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit() ? `Edit ${nameValue()}` : "Add Item"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group class="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter item name" value={nameValue()} onChange={e => handleNameInput(e)} />
                        <Form.Text class="text-muted">
                            What is the item called?
                        </Form.Text>
                    </Form.Group>
                    <Form.Group class="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unit of Measure</Form.Label>
                        <Form.Control type="text" placeholder="Enter item unit of measure" value={uomValue()} onChange={e => handleUomInput(e)} />
                        <Form.Text class="text-muted">
                            What do you call a single unit of this item?
                        </Form.Text>
                    </Form.Group>
                    <Form.Group class="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter item quantity" value={qtyValue()} onChange={e => handleQtyInput(e)} />
                        <Form.Text class="text-muted">
                            How many of this item?
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

