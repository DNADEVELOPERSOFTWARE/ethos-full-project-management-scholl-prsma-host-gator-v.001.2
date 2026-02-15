"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./LandingHeader.module.scss";
import { useTheme } from "@/providers/ThemeProvider";

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className={styles.landingHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image
            src="/logo-ETHOS.png"
            alt="Ethos CPAC"
            width={32}
            height={32}
          />
          <span>ETHOS CPAC</span>
        </div>

        {/* NAV DESKTOP */}
        <nav className={styles.nav}>
          <Link href="#">Categorias</Link>
          <Link href="#">Quem somos</Link>
          <Link href="#">Fale conosco</Link>
        </nav>

        <div className={styles.area}>
          {/* BOTÃO TEMA */}
          <button
            onClick={toggle}
            className={styles.themeToggle}
            aria-label={
              theme === "dark"
                ? "Ativar modo claro"
                : "Ativar modo escuro"
            }
            title={
              theme === "dark"
                ? "Ativar modo claro"
                : "Ativar modo escuro"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/login" className={styles.areaStudent}>
            Área do aluno
          </Link>
          <Link href="/login" className={styles.btnEnter}>
            Entrar
          </Link>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          className={styles.menuButton}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className={styles.mobileMenu}>
          <Link href="#">Categorias</Link>
          <Link href="#">Quem somos</Link>
          <Link href="#">Fale conosco</Link>

          <Link href="/login" className={styles.areaStudent}>
            Área do aluno
          </Link>
          <Link href="/login" className={styles.entrar}>
            Entrar
          </Link>
        </div>
      )}
    </header>
  );
}


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import styles from "./LandingHeader.module.scss";
// import { useTheme } from "@/providers/ThemeProvider";

// export default function LandingHeader() {
//   const [open, setOpen] = useState(false);
//    const { theme, toggle } = useTheme();

//   return (
//     <header className={styles.landingHeader}>
//       <div className={styles.headerContainer}>
//         <div className={styles.logo}>
//           <Image
//             src="/logo-ETHOS.png"
//             alt="Ethos CPAC"
//             width={32}
//             height={32}
//           />
//           <span>ETHOS CPAC</span>
//         </div>

//         {/* NAV DESKTOP */}
//         <nav className={styles.nav}>
//           <Link href="#">Categorias</Link>
//           <Link href="#">Quem somos</Link>
//           <Link href="#">Fale conosco</Link>
//         </nav>
//   <header>
//       {/* ...seu header */}
//       <button onClick={toggle} className={styles.themeToggle}>
//         {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//       </button>
//     </header>
//         <div className={styles.area}>
//           <Link href="/login" className={styles.areaStudent}>
//             Área do aluno
//           </Link>
//           <Link href="/login" className={styles.btnEnter}>
//             Entrar
//           </Link>
//         </div>

//         {/* BOTÃO MOBILE */}
//         <button
//           className={styles.menuButton}
//           onClick={() => setOpen(!open)}
//           aria-label="Abrir menu"
//         >
//           ☰
//         </button>
//       </div>

//       {/* MENU MOBILE */}
//       {open && (
//         <div className={styles.mobileMenu}>
//           <Link href="#">Categorias</Link>
//           <Link href="#">Quem somos</Link>
//           <Link href="#">Fale conosco</Link>

//           <Link href="/login" className={styles.areaStudent}>
//             Área do aluno
//           </Link>
//           <Link href="/login" className={styles.entrar}>
//             Entrar
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }
