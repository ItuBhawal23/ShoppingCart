import Header from "../../components/header";
import PrimaryButton from "../../components/button";
import styles from "./Cart.module.css";
import { useCartContext } from "../../context/cartContext";
import Product from "../../components/product/Product";
import Loader from "../../components/loader";

const Cart = () => {
  const { cart, isLoading, onClearAll } = useCartContext();

  const renderProducts = () => {
    const tempCarts = { ...cart };
    return tempCarts?.products.map((product, index) => (
      <Product key={index} product={product} />
    ));
  };

  return (
    <div className={styles.cart_container}>
      {/* when user adds items in cart then this count to be handled */}
      <Header count={cart.totalQuantity} />

      <div className={styles.shopping_cart_container}>
        <h2>Shopping Cart</h2>

        {/* when user adds items in cart then this count to be handled */}
        <p className={styles.count_subtitle}>
          You have{" "}
          <span className={styles.count}>
            {cart.totalProducts > 0 ? cart.totalQuantity : "no"}{" "}
          </span>
          items in Shopping cart
        </p>

        <div className={styles.product_container}>
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : cart.products.length ? (
            renderProducts()
          ) : (
            <p className={styles.empty_cart}>Your Cart is Empty :(</p>
          )}
        </div>

        <div className={styles.bottom_container}>
          <h3>Cart Total: {cart.total.toFixed(2)}</h3>
          <div className={styles.action_container}>
            <PrimaryButton
              label="CHECKOUT"
              disabled={false}
              onClick={() => console.log("checkout")}
            />
            <PrimaryButton
              label="CLEAR ALL"
              disabled={!cart.products?.length}
              onClick={() => onClearAll()}
              color="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
