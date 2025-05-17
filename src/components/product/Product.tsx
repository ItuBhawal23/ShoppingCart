import { Col, Row } from "antd";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import styles from "./Product.module.css";
import type { IProduct } from "../../interface/CartType";

type ProductProps = {
  product: IProduct;
  onDelete: any;
  updateQuantity: (product: IProduct, action: string) => void;
};

const Product = ({ product, updateQuantity, onDelete }: ProductProps) => {
  
  return (
    <Row className={styles.product_row}>
      <Col span={8}>
        <div className={styles.image_title_wrapper}>
          <img src={product.thumbnail} alt="" className={styles.thumbnail} />
          <div>
            <h4>{product.title}</h4>
            <p>{product.price}</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div className={styles.increment_decrement_box}>
          <AiOutlinePlus
            size={20}
            className={styles.plus_icon}
            onClick={() => updateQuantity(product, "increment")}
          />
          <div className={styles.count_box}>
            <p>{product.quantity}</p>
          </div>
          <AiOutlineMinus
            size={20}
            className={`${styles.minus_icon} ${
              product.quantity == 0 ? styles.disable_icon : ""
            }`}
            onClick={() => updateQuantity(product, "decrement")}
          />
        </div>
      </Col>
      <Col span={4}>
        <p>{product.total.toFixed(2)}₹</p>
      </Col>
      <Col span={4} className={styles.delete_product}>
        <BsFillTrash3Fill
          size={16}
          className={styles.delete_icon}
          onClick={onDelete}
        />
      </Col>
    </Row>
  );
};

export default Product;
