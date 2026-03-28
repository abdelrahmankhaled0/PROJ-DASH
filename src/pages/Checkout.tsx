import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useCart } from "../components/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    clearCart();
    window.alert("Order placed successfully! Thank you for shopping.");
    navigate("/home");
  };

  return (
    <>
      <Appbar />
      <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Checkout
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              {cart.map((item) => (
                <Card
                  key={item.id}
                  sx={{ display: "flex", borderRadius: 3, boxShadow: 3 }}
                >
                  <CardMedia
                    component="img"
                    image={item.images[0]}
                    alt={item.title.toString()}
                    sx={{ width: 140, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight="bold" variant="h6">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography color="text.secondary">
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Typography color="text.secondary">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Checkout;
