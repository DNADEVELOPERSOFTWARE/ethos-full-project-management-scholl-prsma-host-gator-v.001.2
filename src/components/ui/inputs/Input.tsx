import styles from "./input.module.scss";
// import styles from "@/styles/components/input.module.scss";

import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, ...props }: Props) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...props}
      />

      {error && <p className={styles.message}>{error}</p>}
    </div>
  );
}
