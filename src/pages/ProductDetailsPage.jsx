
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import api from "../api/axios";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(price));

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const [productResponse, categoriesResponse] =
          await Promise.all([
            api.get(`/products/${id}`),
            api.get("/categories"),
          ]);

        const productData = productResponse.data.data;
        const categories = categoriesResponse.data.data;

        const category = categories.find(
          (item) =>
            Number(item.id) === Number(productData.category_id)
        );

        if (active) {
          setProduct({
            ...productData,
            category: category?.name || "Uncategorized",
            image: "https://placehold.co/600x400?text=Product",
          });
        }
      } catch (err) {
        console.error("Failed to load product:", err);

        if (active) {
          if (err.response?.status === 404) {
            setError("Product not found.");
          } else {
            setError(
              "Unable to load product details. Please check your Laravel server."
            );
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="page-container">
      <Button component={RouterLink} to="/" sx={{ mb: 2 }}>
        ← Back to products
      </Button>

      {loading ? (
        <Stack alignItems="center" spacing={2} sx={{ py: 6 }}>
          <CircularProgress />
          <Typography color="text.secondary">
            Loading product details...
          </Typography>
        </Stack>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : product ? (
        <Card
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              height: { xs: 260, md: "100%" },
              minHeight: 320,
              objectFit: "cover",
            }}
          />

          <Stack
            spacing={2}
            sx={{
              p: { xs: 2.5, md: 4 },
              alignItems: "flex-start",
            }}
          >
            <Typography color="text.secondary">
              {product.category}
            </Typography>

            <Typography variant="h4" component="h1">
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary">
              {formatPrice(product.price)}
            </Typography>

            <Typography>
              Product Code: {product.product_code}
            </Typography>

            <Typography>
              Stock: {product.stock}
            </Typography>

            <Typography>
              {product.description || "No description provided."}
            </Typography>

            <Button
              component={RouterLink}
              to="/"
              variant="contained"
            >
              Return to catalog
            </Button>
          </Stack>
        </Card>
      ) : null}
    </main>
  );
}
