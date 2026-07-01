"use client";

import { useState } from "react";
import { adsApi } from "@/lib/ads-api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConnectGooglePage() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [developerToken, setDeveloperToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adsApi.connectGoogle({ clientId, clientSecret, accessToken: developerToken, refreshToken });
      router.push("/app/ads/accounts");
    } catch {
      setError("Erro ao conectar. Verifique as credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Link href="/app/ads/accounts" className="text-sm text-brand-red hover:text-red-700 mb-4 inline-block">
        ← Contas de Anúncios
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Conectar Google Ads</h1>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Client ID</label>
              <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} required className="input" />
            </div>
            <div>
              <label className="label">Client Secret</label>
              <input type="password" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} required className="input" />
            </div>
            <div>
              <label className="label">Developer Token</label>
              <input type="text" value={developerToken} onChange={(e) => setDeveloperToken(e.target.value)} required className="input" />
            </div>
            <div>
              <label className="label">Refresh Token</label>
              <input type="text" value={refreshToken} onChange={(e) => setRefreshToken(e.target.value)} required className="input" />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? "Conectando..." : "Conectar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
