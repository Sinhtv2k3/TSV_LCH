import React from "react";
import { useRoutes } from "react-router-dom";
import Homepage from "./Homepage";
import ProductDetail from "./components/ProductDetail";
import NotFoundPage from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Register from "./components/Register";
import Login from "./components/Login";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Admin from "./pages/admin/list";

const routeConfig = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

function App() {
  let element = useRoutes(routeConfig);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          {element}
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
