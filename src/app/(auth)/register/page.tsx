"use client";

/**
 * ================================
 * 🔁 CLERK (DESATIVADO TEMPORARIAMENTE)
 * Para reativar:
 * 1) Descomente os imports
 * 2) Altere USE_CLERK para true
 * ================================
 */

// import * as Clerk from "@clerk/elements/common";
// import * as SignUp from "@clerk/elements/sign-up";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthLayout from "@/components/layouts/authLayout/AuthLayout";
import styles from "@/styles/pages/auth.module.scss";
import Input from "@/components/ui/Inputs/Input";

// import inputStyles from "@/styles/components/input.module.scss";

const USE_CLERK = false; // 🔥 Alterar para true quando religar Clerk

export default function RegisterPage() {
  const router = useRouter();

  /**
   * ================================
   * 🔐 AUTH LOCAL
   * ================================
   */
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role: "admin",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || "Erro ao criar usuário");
        return;
      }

      router.push("/login");
    } catch {
      setError("Erro inesperado ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Criar Superusuário"
      subtitle="Acesso administrativo ao sistema"
    >
      {USE_CLERK ? (
        /* ================= CLERK ================= */
        <div>
          {/* 
          <SignUp.Root>
            <SignUp.Step name="start">
              ...
            </SignUp.Step>
          </SignUp.Root>
          */}
        </div>
      ) : (
        /* ================= AUTH LOCAL ================= */
        <>
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.field}>
              <Input
                label="Nome completo"
                type="text"
                placeholder="Administrador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {/* <label className={`${styles.label} ${inputStyles.label}`}>Nome completo</label>
              <input className={`${styles.input} ${inputStyles.input}`}
                type="text"
                placeholder="Administrador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              /> */}
            </div>

            <div className={styles.field}>
                <Input  
                label="Usuário" 
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
               {/*
              {/* <label className={`${styles.label} ${inputStyles.label}`}>Usuário</label>
              <input className={`${styles.input} ${inputStyles.input}`}
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              /> */}
            </div>

            <div className={styles.field}>
              <Input  
                label="Email"
                type="email"
                placeholder="admin@ethos.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
               {/*
              {/* <label className={`${styles.label} ${inputStyles.label}`}>Email</label>
              <input className={`${styles.input} ${inputStyles.input}`}
                type="email"
                placeholder="admin@ethos.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /> */}
            </div>

            <div className={styles.field}>
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               {/*
              {/* <label className={`${styles.label} ${inputStyles.label}`}>Senha</label>
              <input className={`${styles.input} ${inputStyles.input}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.authButton}
            >
              {loading ? "Criando..." : "Criar usuário"}
            </button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
