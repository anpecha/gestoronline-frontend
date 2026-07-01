"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch {
      setError("Erro ao enviar solicitação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#DA291C" }}>GestorOnline</h1>
          <p className="mt-2 text-gray-600">Recuperar senha</p>
        </div>

        <div className="card">
          <div className="card-body">
            {sent ? (
              <div>
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
                  Se o email existir, você receberá um link de recuperação.
                </div>
                <Link href="/auth/login" className="btn-primary w-full justify-center">Voltar ao login</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

                <p className="text-sm text-gray-600">
                  Digite seu email e enviaremos um link para redefinir sua senha.
                </p>

                <div>
                  <label htmlFor="email" className="label">Email</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="input" placeholder="seu@email.com" />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? "Enviando..." : "Enviar link"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Lembrou a senha?{" "}
                  <Link href="/auth/login" className="text-brand-red hover:text-red-700 font-medium">Faça login</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
