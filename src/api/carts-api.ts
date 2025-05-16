export const CartApi = async () => {
  const CARTS_API_ENDPOINT = "https://dummyjson.com/carts/1";

  const response = await fetch(CARTS_API_ENDPOINT);
  const result = await response.json();

  return result;
};
