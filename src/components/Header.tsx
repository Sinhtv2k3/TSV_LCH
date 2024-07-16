import React from "react";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
            Admin Website
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
            Login
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
