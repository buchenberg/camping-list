import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Box
} from "@suid/material";
import { createSignal, For } from "solid-js";
import { ChangeEvent } from "@suid/types";
import DeleteIcon from '@suid/icons-material/Delete';
import AddIcon from '@suid/icons-material/Add';
import EditIcon from '@suid/icons-material/Edit';
import { ICampingItem } from "../store/ICampingItem";
import { campingItems } from "../store/campingItems";
import { IItem } from "../store/IItem";

export default function CampingItemList() {
    const [open, setOpen] = createSignal(false);
    const [isEdit, setIsEdit] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleEdit = (item: IItem) => {
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

    const handleNameInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setNameValue(e.currentTarget.value);

    const handleUomInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setUomValue(e.currentTarget.value);

    const handleQtyInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setQtyValue(Number(e.currentTarget.value));

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
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Typography variant="h6" gutterBottom>
                Camping Items
            </Typography>
            <List>
                <For each={campingItems.items}>
                    {(item: IItem) =>
                        <ListItem
                            secondaryAction={
                                <div>
                                <Button color="warning" aria-label="delete" onClick={() => {
                                    campingItems.delete(item.key);
                                }}>
                                    <DeleteIcon />
                                </Button>
                                <Button color="primary" aria-label="edit" onClick={() => handleEdit(item)}>
                                    <EditIcon />
                                </Button>
                                </div>
                            }>
                            <ListItemText primary={
                                <Typography variant="h6" gutterBottom>
                                    {item.value.name}
                                </Typography>
                            } secondary={`Qty: ${item.value.qty} ${item.value.uom}`} />
                        </ListItem>
                    }
                </For>
            </List>
            <Box textAlign='center'>
                <Button aria-label="add item" onClick={handleOpen} color="primary">
                    <AddIcon />Add New Item
                </Button>
                <Button aria-label="clear items" onClick={handleClearAll} color="warning">
                    <DeleteIcon /> Clear All Items
                </Button>
            </Box>

            <Dialog
                open={open()}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{isEdit() ? `Edit ${nameValue()}`: "Add Item"}</DialogTitle>
                <form onSubmit={handleSubmit} noValidate>
                    <DialogContent>
                        <DialogContentText>
                            <TextField
                                value={nameValue()}
                                disabled={isEdit()}
                                autoFocus
                                required={!isEdit()}
                                error={isSubmitting() && !nameValue()}
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                variant="standard"
                                onChange={e => handleNameInput(e)}

                            />
                            <TextField
                                value={uomValue()}
                                autoFocus
                                required
                                error={isSubmitting() && !uomValue()}
                                margin="dense"
                                id="uom"
                                name="uom"
                                label="Unit of Measure"
                                fullWidth
                                variant="standard"
                                onChange={e => handleUomInput(e)}
                            />
                            <TextField
                                value={qtyValue()}
                                autoFocus
                                required
                                error={isSubmitting() && !qtyValue()}
                                margin="dense"
                                id="qty"
                                name="qty"
                                label="Quantity"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={e => handleQtyInput(e)}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Paper>
    )
}

