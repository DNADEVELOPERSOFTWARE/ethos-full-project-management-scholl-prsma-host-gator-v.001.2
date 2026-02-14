import Image from "next/image";
import styles from "./layout.module.scss";
import stylesCard from "@/styles/components/card.module.scss";
import ThemeToggle from "@/components/ui/theme/ThemeToggle";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className={styles.authPage}>
      <div className={stylesCard.card}>
        
        {/* Top Bar */}
        <div className={styles.topBar}>
          <ThemeToggle />
        </div>

        {/* Brand */}
        <header className={styles.brand}>
          <Image
            src="/logo-ETHOS.png"
            alt="Logo ETHOS CPAC"
            width={42}
            height={42}
            priority
          />
          <h1 className={styles.brandTitle}>ETHOS CPAC</h1>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>

      </div>
    </section>
  );
}
