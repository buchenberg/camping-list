import { Card, CardContent, Typography } from "@suid/material";
import { campingItemList } from "../store/store";

export default function CampingListCounter() {
    return (
            <Typography m={2} variant="h6">{campingItemList.count} Camping Items</Typography>
    )
}