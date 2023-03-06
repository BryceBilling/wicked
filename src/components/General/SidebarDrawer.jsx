import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SidebarDrawer({ open, onClose }) {
  const toggleDrawer = () => {
    onClose();
  };

  return (
    <>
      <Drawer variant="temporary" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/crimes">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Crimes" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
