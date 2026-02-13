import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
  marginTop?: boolean;
};

export default function Button({
  variant = "primary",
  fullWidth,
  loading,
  marginTop,
  children,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${fullWidth ? styles.fullWidth : ""}
        ${className || ""}
        ${marginTop ? styles.marginTop : ""}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
