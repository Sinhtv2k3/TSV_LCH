import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";

const LayoutClient = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default LayoutClient;
