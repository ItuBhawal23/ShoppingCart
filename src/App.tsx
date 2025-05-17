import { CartContextProvider } from "./context/cartContext";
import Cart from "./pages/cart";

const App = () => {
  return (
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  );
};

export default App;
