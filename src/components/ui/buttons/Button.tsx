import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  fullWidth,
  loading,
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
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
