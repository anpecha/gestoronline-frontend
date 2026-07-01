"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", organizationName: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      router.push("/app/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const fields = [
    { key: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
    { key: "email", label: "Email", type: "email", placeholder: "seu@email.com" },
    { key: "password", label: "Senha", type: "password", placeholder: "Mínimo 8 caracteres" },
    { key: "organizationName", label: "Nome da Agência/Empresa", type: "text", placeholder: "Minha Agência" },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#DA291C" }}>GestorOnline</h1>
          <p className="mt-2 text-gray-600">Crie sua conta</p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              {fields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="label">{f.label}</label>
                  <input id={f.key} type={f.type} required value={form[f.key]}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="input" placeholder={f.placeholder} />
                </div>
              ))}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? "Criando conta..." : "Criar conta"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Já tem conta?{" "}
                <a href="/auth/login" className="text-brand-red hover:text-red-700 font-medium">
                  Entrar
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
