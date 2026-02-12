"use client";

import Image from "next/image";
import styles from "@/styles/pages/auth.module.scss";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <header className={styles.header}>
          <Image
            src="/logo-ETHOS.png"
            alt="ETHOS"
            width={42}
            height={42}
            priority
          />
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </header>

        {children}
      </div>
    </section>
  );
}
