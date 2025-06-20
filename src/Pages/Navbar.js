import React from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // + logo
import { useNavigate, useLocation } from "react-router-dom";
import adminMenu from "../menu/adminMenu";
import userMenu from "../menu/userMenu";

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const UserRole = sessionStorage.getItem("role");
  const UserName = sessionStorage.getItem("loggedInUser");
  const menuItems = UserRole === "ROLE_ADMIN" ? adminMenu : userMenu;

  const currentTab = menuItems.findIndex(
    (item) => item.path === location.pathname
  );

  const handleTabChange = (event, newValue) => {
    navigate(menuItems[newValue].path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#e3f2fd",
        color: "#0d47a1",
        boxShadow: 2,
        borderBottom: "2px solidrgb(55, 155, 236)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MedicalServicesIcon sx={{ color: "error.main", fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              CareBridge
            </Typography>
          </Box>

          <Tabs
            value={currentTab !== -1 ? currentTab : false}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              ".MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
              },
              ".Mui-selected": {
                color: "#0d47a1",
              },
            }}
          >
            {menuItems.map((item, index) => (
              <Tab
                key={index}
                icon={item.icon}
                iconPosition="start"
                label={item.label}
              />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "30px",
              bgcolor: "#bbdefb",
              color: "#0d47a1",
              fontWeight: "bold",
              boxShadow: 1,
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                mr: 1,
                bgcolor: "#1976d2",
                color: "white",
                fontSize: 14,
              }}
            >
              {UserName?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="body2">{UserName}</Typography>
          </Box>

          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              sx={{
                color: "error.main",
                "&:hover": {
                  bgcolor: "grey",
                },
                transition: "0.3s",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
