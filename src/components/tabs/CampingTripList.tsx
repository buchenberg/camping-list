import { createSignal, For } from "solid-js";
import { campingTripStore } from "../../store/campingTripStore";
import { ICampingTrip, IPersistedCampingTrip } from "../../store/types";
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

    const handleLocationInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
        setLocationValue(e.currentTarget.value);
    }
    const handleStartDateInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
        setStartDateValue(e.currentTarget.value);
    }
    const handleEndDateInput = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
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
        <div class="window" style="width: 100%;">
            <div class="title-bar">
                <div class="title-bar-text">Camping Trips</div>
            </div>
            <div class="window-body" style="padding: 0.5rem">
                <p style="margin-top: 0">Plan your camping adventures here. Add trips and their dates.</p>

                {campingTripStore.count > 0 ? (
                    <div class="sunken-panel" style="padding: 1em">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Location</th>
                                    <th style={styles.th}>Start Date</th>
                                    <th style={styles.th}>End Date</th>
                                    <th style={{ ...styles.th, width: '10%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <For each={campingTripStore.items}>
                                    {(item: IPersistedCampingTrip) => (
                                        <tr>
                                            <td style={styles.td}>{item.value.location}</td>
                                            <td style={styles.td}>{item.value.dateStart}</td>
                                            <td style={styles.td}>{item.value.dateEnd}</td>
                                            <td style={styles.td}>
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
                        <p>Add a camping trip and it will show up here.</p>
                    </div>
                )}

                <div class="field-row" style="margin-top: 1em">
                    <button onClick={handleOpen} style={styles.btnAdd}>Add New Trip</button>
                    {campingTripStore.count > 0 && (
                        <button onClick={handleClearAll} style={styles.btnClear}>Clear All Trips</button>
                    )}
                </div>
            </div>

            {open() && (
                <div class="window" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; z-index: 9999">
                    <div class="title-bar">
                        <div class="title-bar-text">{selectedKeyValue() ? `Edit ${locationValue()}` : "Add Trip"}</div>
                        <div class="title-bar-controls">
                            <button aria-label="Close" onClick={handleClose}></button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="location">Location</label>
                            <input id="location" type="text" value={locationValue()} onChange={handleLocationInput} />
                            <small>Where are you going camping?</small>
                        </div>
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="startDate">Start Date</label>
                            <input id="startDate" type="date" value={startDateValue()} onChange={handleStartDateInput} />
                            <small>When does the trip start?</small>
                        </div>
                        <div class="field-row-stacked" style="margin: 1em">
                            <label for="endDate">End Date</label>
                            <input id="endDate" type="date" value={endDateValue()} onChange={handleEndDateInput} />
                            <small>When does the trip end?</small>
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

