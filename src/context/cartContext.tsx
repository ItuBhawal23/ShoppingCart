import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import type { CartType, IProduct } from "../interface/CartType";
import { CartApi } from "../api/carts-api";

type CartContextType = {
  cart: CartType;
  isLoading: boolean;
  onProductDelete: (product: IProduct) => void;
  updateQuantity: (product: IProduct, action: string) => void;
  onClearAll: () => void;
};

const initialCart: CartContextType = {
  cart: {
    id: 0,
    discountedTotal: 0,
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
    userId: 0,
    products: []
  },
  isLoading: true,
  onProductDelete: () => {},
  updateQuantity: () => {},
  onClearAll: () => {}
};

const CartContext = createContext<CartContextType>(initialCart);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType>({
    id: 0,
    discountedTotal: 0,
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
    userId: 0,
    products: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCarts = async () => {
    try {
      const allCarts = await CartApi();
      console.log("carts", allCarts);

      setCart(allCarts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Delete Product
  const onProductDelete = (product: IProduct) => {
    const tempCarts = { ...cart };
    console.log("tempCarts", tempCarts);

    const productIndex = tempCarts.products.findIndex(
      (p) => p.id == product.id
    );
    if (productIndex === -1) return;

    const removedProduct = tempCarts.products.splice(productIndex, 1);
    console.log("removedProduct", removedProduct);

    setCart((prev: any) => {
      return {
        ...prev,
        products: tempCarts.products,
        totalProducts: tempCarts.products?.length,
        totalQuantity: tempCarts.totalQuantity - removedProduct[0].quantity,
        total: tempCarts.total - removedProduct[0].total
      };
    });
  };

  // TODO: Optimize it
  const updateQuantity = (product: IProduct, action: string) => {
    console.log("product", product, action);

    if (action === "increment") {
      setCart((prev: any) => {
        const productIndex = prev.products.findIndex(
          (prod: IProduct) => prod.id === product.id
        );

        if (productIndex === -1) return;

        const currentProduct = prev.products[productIndex];
        const updatedProduct = {
          ...currentProduct,
          quantity: product.quantity + 1,
          total: currentProduct.total + currentProduct.price
        };

        const updatedProducts = [...prev.products];
        updatedProducts[productIndex] = updatedProduct;

        return {
          ...prev,
          products: updatedProducts,
          totalQuantity: prev.totalQuantity + 1,
          total: prev.total + currentProduct.price
        };
      });
    }

    if (action === "decrement") {
      if (product.quantity === 0) return;

      setCart((prev: any) => {
        const productIndex = prev.products.findIndex(
          (prod: IProduct) => prod.id === product.id
        );

        if (productIndex === -1) return;

        const currentProduct = prev.products[productIndex];
        const updatedProduct = {
          ...currentProduct,
          quantity: product.quantity - 1,
          total: currentProduct.total - currentProduct.price
        };

        const updatedProducts = [...prev.products];
        updatedProducts[productIndex] = updatedProduct;

        return {
          ...prev,
          products: updatedProducts,
          totalQuantity: prev.totalQuantity - 1,
          total: prev.total - currentProduct.price
        };
      });
    }
  };

  // Function to clear all items in cart
  const onClearAll = () => {
    setCart((prev) => ({
      ...prev,
      products: [],
      discountedTotal: 0,
      total: 0,
      totalProducts: 0,
      totalQuantity: 0
    }));
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        onProductDelete,
        updateQuantity,
        onClearAll
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
