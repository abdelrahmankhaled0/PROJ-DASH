export const getData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const response = await res.json();

    return response.products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
