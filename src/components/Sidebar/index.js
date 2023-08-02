import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import {
  Drawer,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { sidebarItems } from "./definitions";
import styles from "./style.module.scss";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const drawer = (
    <>
      <Toolbar />
      <List>
        {sidebarItems.map((item) => (
          <Link key={item.path} to={item.path} className={styles.listItem}>
            <ListItemButton selected={item.path === pathname}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );

  return (
    <>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <IconButton
            aria-label="Botão de menu"
            edge="start"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu className={styles.menuIcon} />
          </IconButton>
          <img src={Logo} className={styles.logo} alt="Logo da SenFinança" />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: "200px" } }}
        aria-label="Barra lateral"
      >
        <Drawer
          variant="temporary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{
            display: { xs: "block", md: "none" },
          }}
          open={isSidebarOpen}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
