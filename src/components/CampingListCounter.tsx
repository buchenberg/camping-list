
import { campingItemStore } from "../store/campingItemStore";

export default function CampingListCounter() {
    return (
        <>
            {campingItemStore.count} Camping Items
        </>
    )
}