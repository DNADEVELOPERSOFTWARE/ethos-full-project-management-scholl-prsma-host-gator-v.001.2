import styles from "./AuthLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  return <section className={styles.authLayout}>{children}</section>;
}
