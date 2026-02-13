import Image from "next/image";
import styles from "./layout.module.scss";
import stylesCard from "@/styles/components/card.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.authPage}>
      <div className={stylesCard.card}>
        <h1 className={styles.authHeader}>
          <Image
            src="/logo-ETHOS.png"
            alt="ETHOS"
            width={42}
            height={42}
            priority
          />
          ETHOS CPAC
        </h1>

        {children}
      </div>
    </section>
  );
}
