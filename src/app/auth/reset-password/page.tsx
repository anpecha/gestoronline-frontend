"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("A senha deve ter no mínimo 6 caracteres"); return; }
    if (password !== confirm) { setError("As senhas não conferem"); return; }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setSuccess(true);
    } catch {
      setError("Token inválido ou expirado");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card">
        <div className="card-body text-center space-y-4">
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">Senha alterada com sucesso!</div>
          <button onClick={() => router.push("/auth/login")} className="btn-primary w-full justify-center">Fazer login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        {!token ? (
          <div>
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">Token de recuperação não encontrado.</div>
            <Link href="/auth/forgot-password" className="text-brand-red hover:text-red-700 font-medium">Solicitar novo link</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <div>
              <label htmlFor="password" className="label">Nova senha</label>
              <input id="password" type="password" required minLength={6} value={password}
                onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
            </div>

            <div>
              <label htmlFor="confirm" className="label">Confirmar senha</label>
              <input id="confirm" type="password" required minLength={6} value={confirm}
                onChange={(e) => setConfirm(e.target.value)} className="input" placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? "Alterando..." : "Alterar senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#DA291C" }}>GestorOnline</h1>
          <p className="mt-2 text-gray-600">Nova senha</p>
        </div>
        <Suspense fallback={
          <div className="card"><div className="card-body text-center text-gray-500">Carregando...</div></div>
        }>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
