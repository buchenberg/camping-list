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
    ListItemButton,
    IconButton,
    Box
} from "@suid/material";
import { createSignal, For } from "solid-js";
import { ChangeEvent } from "@suid/types";
import { campingItemList } from "./store/store";
import DeleteIcon from '@suid/icons-material/Delete';
import AddIcon from '@suid/icons-material/Add';

export interface ICampingItem {
    name: string;
    uom: string;
    qty: number;
}

export default function CampingItemList() {

    //const [campingList, { mutate, refetch }] = createResource(fetchCampingList);
    const [open, setOpen] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
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

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!uomValue() || !nameValue || !qtyValue()) return;

        const campingItem: ICampingItem = {
            name: nameValue(),
            uom: uomValue(),
            qty: qtyValue()
        }
        //mutate((campingList) => [...campingList, campingItem]);
        campingItemList.addItem(campingItem);

        // ..code to submit form to backend here...
        console.log("Camping Item: ", campingItem);
        setIsSubmitting(false);
        handleClose();
    }

    console.log(campingItemList.items);

    console.log(campingItemList.count);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Typography variant="h6" gutterBottom>
                Items
            </Typography>
            <List>
                <For each={campingItemList.items}>
                    {(item: ICampingItem) =>
                        <ListItem
                            secondaryAction={
                                <IconButton color="error" edge="end" aria-label="delete" onClick={() => {
                                    console.log('onClick');
                                    campingItemList.delete(item.name)
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                            <ListItemText primary={
                                <Typography variant="h6" gutterBottom>
                                    {item.name}
                                </Typography>
                            } secondary={`Qty: ${item.qty}`} />
                        </ListItem>
                    }
                </For>
            </List>
            <Box  textAlign='center'>
                <IconButton aria-label="add" onClick={handleOpen} color="success">
                    <AddIcon />
                </IconButton>
            </Box>

            <Dialog
                open={open()}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Add Item</DialogTitle>
                <form onSubmit={handleSubmit} noValidate>
                    <DialogContent>
                        <DialogContentText>
                            Here is your chance to add an item to the list and not forget it.
                        </DialogContentText>
                        <DialogContentText>
                            <TextField
                                autoFocus
                                required
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

