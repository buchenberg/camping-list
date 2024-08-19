import { Button, IconButton, Menu, MenuItem } from "@suid/material";
import MenuIcon from "@suid/icons-material/Menu";
import { createSignal } from "solid-js";

export default function NavMenu() {
    const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
    const open = () => Boolean(anchorEl());
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls={open() ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open() ? "true" : undefined}
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl()}
                open={open()}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
