import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Appbar from "../components/Appbar";
// import { useCart } from "../Context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const totalPrice = cart.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Appbar />
      <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Shopping Cart 🛒
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty </Typography>
        ) : (
          <>
            {cart.map(
              (item: {
                id: number;
                images: (string | undefined)[];
                title: string | number | bigint | boolean | ReactNode;
                price: string | number | bigint | boolean | ReactNode;
                quantity: string | number | bigint | boolean | ReactNode;
              }) => (
                <Card
                  key={item.id}
                  sx={{
                    display: "flex",
                    mb: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.images[0]}
                    sx={{ width: 150, objectFit: "cover" }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight="bold">{item.title}</Typography>

                    <Typography color="text.secondary">
                      ${item.price}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton onClick={() => decreaseQty(item.id)}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography>{item.quantity}</Typography>

                      <IconButton onClick={() => increaseQty(item.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              ),
            )}

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total: ${totalPrice.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CartPage;
