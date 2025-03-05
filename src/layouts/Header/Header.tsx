import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Popover,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../../page/Login/store/AuthSelector";
import PersonIcon from "@mui/icons-material/Person";

const Header = ({ ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authorized = useSelector(selectEnableAuth);
  const userName = localStorage.getItem("name");

  // State for popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Open/Close handlers
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    // window.location.reload();
    console.log("User logged out");
    handleCloseMenu();
  };

  const goToMenuCard = () => {
    navigate("/card");
  };

  if (location.pathname === "/login" || location.pathname === "/registrar") {
    return null;
  }

  return (
    <Box {...rest}>
      <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
        <Toolbar
          sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={"https://i.ibb.co/xyWVwZv/logo.png"}
              alt="Logo"
              style={{ height: 60 }}
            />
            <IconButton color="inherit" onClick={goToMenuCard}></IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              sx={{
                color: "white",
                border:
                  location.pathname === "/products"
                    ? "2px solid white"
                    : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/product")}
            >
              Product
            </Button>
            <Button
              sx={{
                color: "white",
                border:
                  location.pathname === "/order" ? "2px solid white" : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/order")}
            >
              Order
            </Button>

            {authorized && (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <PersonIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>

                {/* Popover instead of Menu */}
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ mt: 1 }}
                >
                  <Box sx={{ p: 2, minWidth: 220, textAlign: "center" }}>
                    <Avatar sx={{ mx: "auto", width: 50, height: 50 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      {userName}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Button
                      onClick={handleLogout}
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        py: 1,
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Popover>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(Header);
