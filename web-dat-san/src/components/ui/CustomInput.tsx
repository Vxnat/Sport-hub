// components/CustomInput.js
import styles from "@/styles/ui/CustomInput.module.css";

interface InputProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({
  name = "",
  value = "",
  onChange,
  placeholder = "Enter value",
  disabled = false,
  type = "text",
  className = "",
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${styles.input} ${
        disabled ? styles.disabled : ""
      } ${className}`}
    />
  );
};

export default CustomInput;
