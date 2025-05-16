import { Button } from "antd";
import styles from "./Button.module.css";

type PrimaryButtonProps = {
  label: string;
  color?: any;
  variant?: any;
  disabled: boolean;
  onClick: any;
};

const PrimaryButton = ({
  label,
  color = "default",
  variant = "solid",
  disabled,
  onClick
}: PrimaryButtonProps) => {
  return (
    <Button
      color={color}
      variant={variant}
      disabled={disabled}
      className={styles.primary_button}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
