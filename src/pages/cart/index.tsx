import { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import Header from "../../components/header";
import PrimaryButton from "../../components/button";
import { CartApi } from "../../api/carts-api";
import type { CartType, IProduct } from "../../interface/CartType";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState<CartType>({
    id: 0,
    discountedTotal: 0,
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
    userId: 0,
    products: []
  });

  const getCarts = async () => {
    try {
      const allCarts = await CartApi();
      console.log("carts", allCarts);

      setCart(allCarts);
    } catch (error) {
      console.error(error);
    }
  };

  //Delete Product
  const onProductDelete = (product: IProduct) => {
    const tempCarts = { ...cart };

    const productIndex = tempCarts.products.findIndex(
      (p) => p.id == product.id
    );

    if (productIndex !== -1) {
      const removedProduct = tempCarts.products.splice(productIndex, 1);

      setCart((prev: any) => {
        return {
          ...prev,
          products: tempCarts.products,
          totalProducts: tempCarts.products?.length,
          totalQuantity: tempCarts.totalQuantity - removedProduct[0].quantity
        };
      });
    } else {
      console.error("Product not found");
    }
  };

  // TODO: Optimize it
  const updateQuantity = (product: IProduct, action: string) => {
    console.log("product", product, action);

    if (action === "increment") {
      setCart((prev: any) => {
        console.log("prev", prev);
        const productIndex = prev.products.findIndex(
          (prod: IProduct) => prod.id === product.id
        );

        const updatedProducts = {
          ...prev.products[productIndex],
          quantity: product.quantity + 1
        };

        return {
          ...prev,
          products: prev.products.map((p: IProduct, index: number) =>
            index === productIndex ? updatedProducts : p
          ),
          totalQuantity: prev.totalQuantity + 1
        };
      });
    }

    if (action === "decrement") {
      setCart((prev: any) => {
        console.log("prev", prev);
        const productIndex = prev.products.findIndex(
          (prod: IProduct) => prod.id === product.id
        );

        const updatedProducts = {
          ...prev.products[productIndex],
          quantity: product.quantity - 1
        };

        return {
          ...prev,
          products: prev.products.map((p: IProduct, index: number) =>
            index === productIndex ? updatedProducts : p
          ),
          totalQuantity: prev.totalQuantity - 1
        };
      });
    }
  };

  const renderProducts = () => {
    const tempCarts = { ...cart };
    return (
      <>
        {tempCarts?.products?.length ? (
          tempCarts?.products.map((product, index) => (
            <Product
              key={index}
              product={product}
              onDelete={() => onProductDelete(product)}
              updateQuantity={updateQuantity}
            />
          ))
        ) : (
          <p className={styles.empty_cart}>Your Cart is Empty :(</p>
        )}
      </>
    );
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div className={styles.cart_container}>
      {/* when user adds items in cart then this count to be handled */}
      <Header count={cart.totalProducts} />

      <div className={styles.shopping_cart_container}>
        <h2>Shopping Cart</h2>

        {/* when user adds items in cart then this count to be handled */}
        <p className={styles.count_subtitle}>
          You have <span className={styles.count}>{cart.totalProducts} </span>
          items in Shopping cart
        </p>

        <div className={styles.product_container}> {renderProducts()}</div>

        <div className={styles.bottom_container}>
          <h3>Cart Total: {cart.total}</h3>
          <div className={styles.action_container}>
            <PrimaryButton
              label={"CHECKOUT"}
              disabled={false}
              onClick={undefined}
            />
            <PrimaryButton
              label={"CLEAR ALL"}
              disabled={false}
              onClick={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
