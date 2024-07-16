import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  reviews: number;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Product[]>(
          "http://localhost:3000/products"
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper
          elevation={3}
          style={{
            height: "100%",
            padding: "16px",
            backgroundColor: "#1976d2",
            color: "#fff",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "20px" }}
          >
            Quản lý sản phẩm
          </Typography>
          <Typography gutterBottom style={{ marginBottom: "10px" }}>
            <strong>Danh sách sản phẩm</strong>
          </Typography>
          <Typography gutterBottom style={{ marginBottom: "10px" }}>
            <strong>Thêm sản phẩm</strong>
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Box p={3} component={Paper} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Danh sách sản phẩm
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 100, height: 100 }}
                    />
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.reviews}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" gap={3} justifyContent="center">
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "green", color: "#fff" }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "red", color: "#fff" }}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Admin;
