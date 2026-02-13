"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./reset-password.module.scss";
import Input from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = searchParams.get("token");
    setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token inválido ou ausente.");
      return;
    }

    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erro ao redefinir senha.");
        return;
      }

      toast.success("Senha redefinida com sucesso! Redirecionando...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("🔥 RESET PASSWORD ERROR", err);
      toast.error("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <h2 className={styles.subtitle}>Token inválido ou expirado</h2>;
  }

  return (
    <>
      <h2 className={styles.subtitle}>Redefinir senha</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nova senha"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirmar senha"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Button type="submit" loading={loading} fullWidth>
          {loading ? "Processando..." : "Redefinir senha"}
        </Button>
      </form>
    </>
  );
}

// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import styles from "@/styles/pages/auth.module.scss";
// import Input from "@/components/ui/inputs/Input";
// import Button from "@/components/ui/buttons/Button";
// import stylesCard from "@/styles/components/card.module.scss";

// import Image from "next/image";

// export default function ResetPasswordClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [token, setToken] = useState<string | null>(null);
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔑 Lê o token da URL
//   useEffect(() => {
//     const t = searchParams.get("token");
//     setToken(t);
//   }, [searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       toast.error("Token inválido ou ausente.");
//       return;
//     }

//     if (password !== confirm) {
//       toast.error("As senhas não coincidem.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || "Erro ao redefinir senha.");
//         return;
//       }

//       // toast.success("Senha redefinida com sucesso!");
//       // router.push("/auth/login");

//       toast.success("Senha redefinida com sucesso! Redirecionando...");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     } catch (err) {
//       console.error("🔥 RESET PASSWORD ERROR", err);
//       toast.error("Erro inesperado.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🚫 Token inválido
//   if (!token) {
//     return (
//       <div className={styles.authPage}>
//         <div className={stylesCard.card}>
//           <h2 className={styles.authSubtitle}>Token inválido ou expirado</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.authPage}>
//       <form onSubmit={handleSubmit} className={stylesCard.card}>
//         <h1 className={styles.authHeader}>
//           <Image src="/logo-ETHOS.png" alt="Logo" width={24} height={24} />
//           ETHOS CPAC
//         </h1>
//         <h2 className={styles.authSubtitle}>Redefinir senha</h2>

//         <div className={styles.field}>
//           <Input
//             label="Nova senha"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className={styles.field}>
//           <Input
//             label="Confirmar senha"
//             type="password"
//             required
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//           />
//         </div>

//         <Button type="submit" disabled={loading} fullWidth marginTop>
//           {loading ? "Processando..." : "Redefinir senha"}
//         </Button>
//       </form>
//     </div>
//   );
// }
