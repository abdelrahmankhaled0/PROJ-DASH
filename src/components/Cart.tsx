import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
// import { useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
};

type CartProps = {
  product: Product;
};

export default function Cart({ product }: CartProps) {
  const { addToCart } = useCart();

  return (
    <>
      <Card sx={{}}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={product.images[0]}
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>
          <Typography color="primary">${product.price} </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ textTransform: "capitalize" }}
            color="success"
            variant="contained"
            size="small"
            onClick={() => addToCart(product)}
          >
            Add To Card
          </Button>
          <Button
            component={Link}
            to={`/product/${product.id}`}
            sx={{ textTransform: "capitalize" }}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
