import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SidebarDrawer from "./SidebarDrawer";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            WICKED
          </Typography>
        </Toolbar>
      </AppBar>
      <SidebarDrawer open={open} onClose={toggleDrawer} />
      <Outlet />
    </Box>
  );
}
