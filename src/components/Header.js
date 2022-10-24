import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            style={{
              paddingRight: "10px",
              textDecoration: "none",
              color: "#fff",
            }}
            to="/"
          >
            <h2>HOSPITAL</h2>
          </Link>
          <Link
            color="error"
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
            to="/add-patient"
          >
            <h3> Patients</h3>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
