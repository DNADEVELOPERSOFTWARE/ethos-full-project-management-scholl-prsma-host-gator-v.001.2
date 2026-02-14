"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import styles from "./forgot-password.module.scss";
import Input from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Erro ao solicitar redefinição.");
        return;
      }

      toast.success("Se o email existir, você receberá as instruções.");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("🔥 FORGOT PASSWORD ERROR", err);
      toast.error("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.subtitle}>Recuperar senha</h2>

      <p className={styles.description}>
        Informe seu email para receber as instruções de redefinição.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@ethos.com"
        />

        <Button type="submit" loading={loading} fullWidth>
          {loading ? "Enviando..." : "Enviar instruções"}
        </Button>

        <div className={styles.backToLogin}>
          <Link href="/login">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <LinkIcon className="link-icon" /> Já tem conta?{" "}
              <span>Entrar</span>
            </div>
          </Link>
        </div>
      </form>
    </>
  );
}

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { toast } from "react-toastify";

// // import styles from "@/styles/account/login/Login.module.scss";
// import styles from "@/styles/pages/auth.module.scss";
// import Input from "@/components/ui/inputs/Input";
// import Button from "@/components/ui/buttons/Button";
// import stylesCard from "@/styles/components/card.module.scss";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Se o email existir, você receberá instruções em breve.");
//         setEmail("");
//       } else {
//         toast.error(data.error || "Erro ao enviar email.");
//       }
//     } catch (err) {
//       console.error("🔥 [FORGOT_PASSWORD_ERROR]", err);
//       toast.error("Erro inesperado.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.authPage}>
//       <form onSubmit={handleSubmit} className={stylesCard.card}>
//         <h1 className={styles.authHeader}>
//           <Image src="/logo-ETHOS.png" alt="Logo" width={24} height={24} />
//           ETHOS CPAC
//         </h1>

//         <h2 className={styles.authSubtitle}>Recuperar senha</h2>

//         <p style={{ fontSize: 14, textAlign: "center", opacity: 0.8 }}>
//           Informe seu email para receber o link de redefinição de senha
//         </p>

//         <div className={styles.field}>
//           {/* <label className={styles.label  }>Email</label>
//           <input
//           label=
//             className={styles.input}
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="seu@email.com"
//           /> */}
//           <Input
//             label="Email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* <button type="submit" disabled={loading} className={styles.authButton}>
//           {loading ? "Enviando..." : "Enviar link"}
//         </button> */}
//         <Button type="submit" loading={loading} fullWidth marginTop>
//           {loading ? "Enviando..." : "Enviar link"}
//         </Button>

//         <p className={styles.authHelper}>
//           <a href="/login">Voltar ao login</a>
//         </p>
//       </form>
//     </div>
//   );
// }
