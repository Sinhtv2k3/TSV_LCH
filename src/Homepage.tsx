import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import ProductCard from "./components/ProductCard";
import Loading from "./components/Loading";
import { useRoutes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";



function Homepage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {loading ? (
        <Loading isShow={loading} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={3}
          justifyItems="center"
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Homepage;
