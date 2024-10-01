
import { createSignal, For } from "solid-js";
import { campingItems } from "../store/campingItems";
import { ICampingItem, IPersistedCampingItem } from "../store/types";
import { Button, Card, ListGroup, Tab, Tabs } from "solid-bootstrap";

export default function CampingItemList() {
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

    // const handleNameInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    //     setNameValue(e.currentTarget.value);

    // const handleUomInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    //     setUomValue(e.currentTarget.value);

    // const handleQtyInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    //     setQtyValue(Number(e.currentTarget.value));

    const handleClearAll = () =>
        campingItems.deleteAll();

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!uomValue() || !nameValue || !qtyValue()) return;

        const campingItem: ICampingItem = {
            name: nameValue(),
            uom: uomValue(),
            qty: qtyValue()
        }

        if (isEdit()) {
            campingItems.editItem(campingItem);
            setIsEdit(false);
        }
        else {
            campingItems.addItem(campingItem);
        }
        clearValues();
        setIsSubmitting(false);
        handleClose();
    }

    return (
        <Card>
            <Card.Header>Camping Items</Card.Header>
            <Card.Body>
                <ListGroup>
                    <For each={campingItems.items}>
                        {(item: IPersistedCampingItem) =>
                            <ListGroup.Item>
                                {item.value.name}
                            </ListGroup.Item>
                        }
                    </For>
                </ListGroup>
                <Button variant="success" aria-label="add item" onClick={handleOpen} class="m-1">
                     Add New Item
                 </Button>
                 <Button variant="danger" aria-label="clear items" onClick={handleClearAll} class="m-1">
                    Clear All Items
                 </Button>
            </Card.Body>

        </Card>
        // <Paper
        //     sx={{
        //         p: 2,
        //         display: 'flex',
        //         flexDirection: 'column',
        //     }}>
        //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //     </Box>
        //     <div>
        //         <md-radio name="group"></md-radio>
        //         <md-radio name="group"></md-radio>
        //     </div>
        //     <Typography variant="h6" gutterBottom>
        //         Camping Items
        //     </Typography>
        //     <List>
        //         <For each={campingItems.items}>
        //             {(item: IPersistedCampingItem) =>
        //                 <ListItem
        //                     secondaryAction={
        //                         <div>
        //                             <Button color="warning" aria-label="delete" onClick={() => {
        //                                 campingItems.delete(item.key);
        //                             }}>
        //                                 <DeleteIcon />
        //                             </Button>
        //                             <Button color="primary" aria-label="edit" onClick={() => handleEdit(item)}>
        //                                 <EditIcon />
        //                             </Button>
        //                         </div>
        //                     }>
        //                     <ListItemText primary={
        //                         <Typography variant="h6" gutterBottom>
        //                             {item.value.name}
        //                         </Typography>
        //                     } secondary={`Qty: ${item.value.qty} ${item.value.uom}`} />
        //                 </ListItem>
        //             }
        //         </For>
        //     </List>
        //     <Box textAlign='center'>
        //         <Button aria-label="add item" onClick={handleOpen} color="primary">
        //             <AddIcon />Add New Item
        //         </Button>
        //         <Button aria-label="clear items" onClick={handleClearAll} color="warning">
        //             <DeleteIcon /> Clear All Items
        //         </Button>
        //     </Box>

        //     <Dialog
        //         open={open()}
        //         onClose={handleClose}
        //         aria-labelledby="alert-dialog-title"
        //         aria-describedby="alert-dialog-description"
        //     >
        //         <DialogTitle>{isEdit() ? `Edit ${nameValue()}` : "Add Item"}</DialogTitle>
        //         <form onSubmit={handleSubmit} noValidate>
        //             <DialogContent>
        //                 <DialogContentText>
        //                     <TextField
        //                         value={nameValue()}
        //                         disabled={isEdit()}
        //                         autoFocus
        //                         required={!isEdit()}
        //                         error={isSubmitting() && !nameValue()}
        //                         margin="dense"
        //                         id="name"
        //                         name="name"
        //                         label="Name"
        //                         fullWidth
        //                         variant="standard"
        //                         onChange={e => handleNameInput(e)}

        //                     />
        //                     <TextField
        //                         value={uomValue()}
        //                         autoFocus
        //                         required
        //                         error={isSubmitting() && !uomValue()}
        //                         margin="dense"
        //                         id="uom"
        //                         name="uom"
        //                         label="Unit of Measure"
        //                         fullWidth
        //                         variant="standard"
        //                         onChange={e => handleUomInput(e)}
        //                     />
        //                     <TextField
        //                         value={qtyValue()}
        //                         autoFocus
        //                         required
        //                         error={isSubmitting() && !qtyValue()}
        //                         margin="dense"
        //                         id="qty"
        //                         name="qty"
        //                         label="Quantity"
        //                         type="number"
        //                         fullWidth
        //                         variant="standard"
        //                         onChange={e => handleQtyInput(e)}
        //                     />
        //                 </DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button onClick={handleClose}>Cancel</Button>
        //                 <Button type="submit">Submit</Button>
        //             </DialogActions>
        //         </form>
        //     </Dialog>
        // </Paper>
    )
}

