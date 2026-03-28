import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import Appbar from "../components/Appbar";
import { getProductById } from "../services/data";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  brand?: string;
  rating?: number;
  stock?: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(
    id ? null : "Product ID is missing.",
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      const productData = await getProductById(Number(id));

      if (!productData || productData?.id === undefined) {
        setError("Product not found.");
        setProduct(null);
      } else {
        setProduct(productData as Product);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Appbar />
      <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mb: 3, textTransform: "capitalize" }}
        >
          Back
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : product ? (
          <Card
            sx={{ display: { xs: "block", md: "flex" }, p: 2, boxShadow: 3 }}
          >
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{
                width: { xs: "100%", md: 420 },
                height: 420,
                objectFit: "contain",
                borderRadius: 3,
              }}
            />

            <CardContent sx={{ flex: 1, ml: { md: 3 }, mt: { xs: 2, md: 0 } }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {product.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {product.brand && <Chip label={product.brand} />}
                {product.stock !== undefined && (
                  <Chip
                    label={`Stock: ${product.stock}`}
                    color={product.stock > 0 ? "success" : "default"}
                  />
                )}
                {product.rating !== undefined && (
                  <Chip label={`Rating: ${product.rating}`} />
                )}
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/home")}
              >
                Explore More Products
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </Box>
    </>
  );
};

export default ProductDetails;
