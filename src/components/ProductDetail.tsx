import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography, TextField } from "@mui/material";
import { Product } from "../types/Product";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Loading from "./Loading";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const fetchProductDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product?.name} to cart`);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <Loading isShow={true} />;
  }

  if (!product) {
    return <Typography variant="h6">Không tìm thấy sản phẩm</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 4 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reviews: {product.reviews}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDecreaseQuantity}>
          -
        </Button>
        <TextField
          value={quantity}
          inputProps={{ readOnly: true }}
          size="small"
          sx={{ width: "50px" }}
        />
        <Button size="small" onClick={handleIncreaseQuantity}>
          +
        </Button>
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetail;
