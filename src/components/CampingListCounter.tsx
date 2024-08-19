import { Card, CardContent, Typography } from "@suid/material";
import { campingItemList } from "../store/store";

export default function CampingListCounter() {
    return (<Card>
        <CardContent>
            <Typography align="center" mb={2} variant="h6">{campingItemList.count} Items</Typography>
        </CardContent>
    </Card>)
}