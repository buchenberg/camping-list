import { Typography } from "@suid/material";
import { campingItems } from "../store/campingItems";

export default function CampingListCounter() {
    return (
            <Typography m={2} variant="h6">{campingItems.count} Camping Items</Typography>
    )
}