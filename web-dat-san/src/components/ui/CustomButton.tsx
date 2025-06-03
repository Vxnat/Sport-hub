// components/CustomButton.js
import styles from "@/styles/ui/CustomButton.module.css";

interface ButtonProps {
  text?: any;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  text = "Button",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${
        disabled ? styles.disabled : ""
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
