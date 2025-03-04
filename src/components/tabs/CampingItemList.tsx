import { createSignal, For } from "solid-js";
import { campingItemStore } from "../../store/campingItemStore";
import { ICampingItem, IPersistedCampingItem } from "../../store/types";
import { FiEdit, FiTrash } from "solid-icons/fi";
import "98.css";

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        'font-family': 'inherit'
    },
    th: {
        textAlign: 'left',
        padding: '0.5em',
        borderBottom: '1px solid #808080'
    },
    td: {
        padding: '0.5em',
        borderBottom: '1px solid #dfdfdf'
    },
    btnDelete: {
        marginRight: '0.5em',
        background: '#c71e3a',
        color: 'white',
        fontWeight: 'bold'
    },
    btnEdit: {
        background: '#00a000',
        color: 'white',
        fontWeight: 'bold'
    },
    btnAdd: {
        background: '#00a000',
        color: 'white',
        fontWeight: 'bold',
        marginRight: '0.5em'
    },
    btnClear: {
        background: '#c71e3a',
        color: 'white',
        fontWeight: 'bold'
    }
} as const;

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

    const handleNameInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
        setNameValue(e.currentTarget.value);
    }

    const handleUomInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) =>
        setUomValue(e.currentTarget.value);

    const handleQtyInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) =>
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
        <div class="window" style="width: 100%;">
            <div class="title-bar">
                <div class="title-bar-text">Camping Items</div>
            </div>
            <div class="window-body" style="padding: 0.5rem">
                <p style="margin-top: 0">You can add camping items here. Go ahead. all the cool kids are doing it.</p>

                {campingItemStore.count > 0 ? (
                    <div class="sunken-panel" style="padding: 1em">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Item Name</th>
                                    <th style={styles.th}>Unit of Measure</th>
                                    <th style={styles.th}>Quantity</th>
                                    <th style={{ ...styles.th, width: '10%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <For each={campingItemStore.items}>
                                    {(item: IPersistedCampingItem) => (
                                        <tr>
                                            <td style={styles.td}>{item.value.name}</td>
                                            <td style={styles.td}>{item.value.uom}</td>
                                            <td style={styles.td}>{item.value.qty}</td>
                                            <td style={styles.td}>
                                                <button onClick={() => handleDelete(item)} style={styles.btnDelete}>Delete</button>
                                                <button onClick={() => handleEdit(item)} style={styles.btnEdit}>Edit</button>
                                            </td>
                                        </tr>
                                    )}
                                </For>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div class="sunken-panel" style="padding: 1em">
                        <p>Add an item and it will show up here.</p>
                    </div>
                )}

                <div class="field-row" style="margin-top: 1em">
                    <button onClick={handleOpen} style={styles.btnAdd}>Add New Item</button>
                    {campingItemStore.count > 0 && (
                        <button onClick={handleClearAll} style={styles.btnClear}>Clear All Items</button>
                    )}
                </div>
            </div>

            {open() && (
                <div class="window" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; z-index: 9999">
                    <div class="title-bar">
                        <div class="title-bar-text">{isEdit() ? `Edit ${nameValue()}` : "Add Item"}</div>
                        <div class="title-bar-controls">
                            <button aria-label="Close" onClick={handleClose}></button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="name">Name</label>
                            <input id="name" type="text" value={nameValue()} onChange={handleNameInput} />
                            <small>What is the item called?</small>
                        </div>
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="uom">Unit of Measure</label>
                            <input id="uom" type="text" value={uomValue()} onChange={handleUomInput} />
                            <small>What do you call a single unit of this item?</small>
                        </div>
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="qty">Quantity</label>
                            <input id="qty" type="number" value={qtyValue()} onChange={handleQtyInput} />
                            <small>How many of this item?</small>
                        </div>
                        <div class="field-row" style="margin: 1em; justify-content: flex-end">
                            <button onClick={handleClose}>Cancel</button>
                            <button onClick={handleSubmit} disabled={isSubmitting()}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

