import { useEffect, useState } from "react";
import { getData } from "../services/data";
import Loader from "../components/Loader";
import { Box, Grid } from "@mui/material";
import Appbar from "../components/Appbar";
import Cart from "../components/Cart";

const Home = () => {
  type productDataType = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
  };
  const [data, setData] = useState<productDataType[]>([]);
  const [loader, setLoder] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoder(true);
      const products = await getData();
      setData(products);
      setLoder(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          padding={2}
          sx={{
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {loader ? (
            <Grid size={12}>
              <Loader />
            </Grid>
          ) : (
            data.map((product) => (
              <Grid key={product.id} size={{ xs: 12, md: 6, lg: 3, xl: 3 }}>
                <Cart product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
