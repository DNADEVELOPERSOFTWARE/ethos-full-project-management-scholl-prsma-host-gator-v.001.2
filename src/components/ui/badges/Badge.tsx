import styles from "./badge.module.scss";

type Variant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
}

export default function Badge({
  children,
  variant = "neutral",
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}