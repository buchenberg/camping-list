import "98.css";

export default function CampingListHome() {
    return (
        <div class="window" style="width: 100%;">
            <div class="title-bar">
                <div class="title-bar-text">Welcome to Camping List</div>
            </div>
            <div class="window-body" style="padding: 0.5rem">
                <h1 style="margin-top: 0">Welcome Campers</h1>
                <div class="sunken-panel" style="padding: 1em; margin: 1em 0">
                    <p>This is a proof-of-concept application for managing your camping trips and gear.</p>
                    <p>Use the "Camping Items" tab to manage your camping gear inventory</p>
                    <p>Use the "Camping Trips" tab to plan your upcoming adventures</p>
                </div>
            </div>
        </div>
    );
}