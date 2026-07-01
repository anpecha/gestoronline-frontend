"use client";

import { useEffect, useState } from "react";
import { adsApi, AdAccount } from "@/lib/ads-api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdsAccountsPage() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const router = useRouter();

  const fetchAccounts = () => {
    setLoading(true);
    adsApi
      .getAccounts()
      .then((res) => setAccounts(res.data))
      .catch(() => router.push("/auth/login"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSync = () => {
    setSyncing(true);
    adsApi
      .sync()
      .then(() => fetchAccounts())
      .catch(() => {})
      .finally(() => setSyncing(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas de Anúncios</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie suas contas conectadas</p>
        </div>
        <button onClick={handleSync} disabled={syncing} className="btn-secondary btn-sm">
          {syncing ? "Sincronizando..." : "Sincronizar"}
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-gray-500 mb-6">Nenhuma conta conectada.</p>
            <div className="flex justify-center gap-3">
              <Link href="/app/ads/connect-meta" className="btn-primary">Conectar Meta Ads</Link>
              <Link href="/app/ads/connect-google" className="btn-secondary">Conectar Google Ads</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-header">Plataforma</th>
                  <th className="table-header">Nome</th>
                  <th className="table-header">ID da Conta</th>
                  <th className="table-header">Status</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="table-cell">
                      <span className={`badge ${acc.platform === "META" ? "badge-blue" : "badge-green"}`}>
                        {acc.platform}
                      </span>
                    </td>
                    <td className="table-cell font-medium">{acc.name}</td>
                    <td className="table-cell text-gray-400">{acc.accountId}</td>
                    <td className="table-cell">
                      <span className={`badge ${acc.status === "ACTIVE" ? "badge-green" : "badge-gray"}`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <Link
                        href={`/app/ads/accounts/${acc.id}/campaigns`}
                        className="text-brand-red hover:text-red-700 text-sm font-medium"
                      >
                        Ver Campanhas →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
