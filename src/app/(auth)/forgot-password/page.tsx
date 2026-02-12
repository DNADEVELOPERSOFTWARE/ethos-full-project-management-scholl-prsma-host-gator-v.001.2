"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

// import styles from "@/styles/account/login/Login.module.scss";
import styles from "@/styles/pages/auth.module.scss";
import Input from "@/components/ui/Inputs/Input";
//  import inputStyles from "@/styles/components/input.module.scss";

export default function ForgotPasswordPage() {
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

      if (res.ok) {
        toast.success("Se o email existir, você receberá instruções em breve.");
        setEmail("");
      } else {
        toast.error(data.error || "Erro ao enviar email.");
      }
    } catch (err) {
      console.error("🔥 [FORGOT_PASSWORD_ERROR]", err);
      toast.error("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <form onSubmit={handleSubmit} className={styles.authCard}>
        <h1 className={styles.authHeader}>
          <Image src="/logo-ETHOS.png" alt="Logo" width={24} height={24} />
          ETHOS CPAC
        </h1>

        <h2 className={styles.authSubtitle}>Recuperar senha</h2>

        <p style={{ fontSize: 14, textAlign: "center", opacity: 0.8 }}>
          Informe seu email para receber o link de redefinição de senha
        </p>

        <div className={styles.field}>
          {/* <label className={styles.label  }>Email</label>
          <input
          label=
            className={styles.input}    
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          /> */}
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.authButton}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>

        <p className={styles.authHelper}>
          <a href="/login">Voltar ao login</a>
        </p>
      </form>
    </div>
  );
}
