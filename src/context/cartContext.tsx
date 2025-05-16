import { createContext, useContext, type ReactNode } from "react";
import type { CartType } from "../interface/CartType";

const initialCart: CartType = {
  id: 0,
  discountedTotal: 0,
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
  userId: 0,
  products: []
};

type CartContextType = {};

const CartContext = createContext<any>(initialCart);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
