
import { campingItems } from "../store/campingItems";

export default function CampingListCounter() {
    return (
            <div>{campingItems.count} Camping Items</div>
    )
}