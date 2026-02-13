"use client";

import Image from "next/image";
import styles from "@/styles/pages/auth.module.scss";
import stylesCard from "@/styles/components/card.module.scss";


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
      <div className={stylesCard.card}>
        <h1 className={styles.authHeader}>
          <Image src="/logo-ETHOS.png" alt="Logo" width={24} height={24} />
          ETHOS CPAC
        </h1>

        <header className={styles.header}>
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
