import { BsCartFill } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./Header.module.css";

type HeaderProps = {
  count: number;
};

const Header = ({ count }: HeaderProps) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.title_wrapper}>
        <BsArrowLeft className={styles.back_arrow} />
        <h3>Continue Shopping</h3>
      </div>

      <div className={styles.cart_icon_wrapper}>
        <BsCartFill className={styles.cart_icon} />
        {count > 0 && <p className={styles.count_badge}>{count}</p>}
      </div>
    </div>
  );
};

export default Header;
