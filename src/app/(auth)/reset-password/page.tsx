// src/app/(auth)/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center" }}>Carregando...</div>}>
      
      <ResetPasswordClient />
    </Suspense>
  );
}
