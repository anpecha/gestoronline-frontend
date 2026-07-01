"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/app/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#DA291C" }}>GestorOnline</h1>
          <p className="mt-2 text-gray-600">Entre na sua conta</p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <div>
                <label htmlFor="email" className="label">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input" placeholder="seu@email.com" />
              </div>

              <div>
                <label htmlFor="password" className="label">Senha</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input" placeholder="••••••••" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <a href="/auth/forgot-password" className="text-brand-red hover:text-red-700 font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Não tem conta?{" "}
                <a href="/auth/register" className="text-brand-red hover:text-red-700 font-medium">
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
