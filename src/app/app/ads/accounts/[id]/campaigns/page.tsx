"use client";

import { useEffect, useState } from "react";
import { adsApi, Campaign } from "@/lib/ads-api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CampaignsPage() {
  const params = useParams<{ id: string }>();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  const fetchCampaigns = () => {
    setLoading(true);
    adsApi
      .getCampaigns(params.id)
      .then((res) => setCampaigns(res.data))
      .catch(() => router.push("/auth/login"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSync = () => {
    setSyncing(true);
    adsApi
      .sync()
      .then(() => fetchCampaigns())
      .catch(() => {})
      .finally(() => setSyncing(false));
  };

  const handleToggle = (campaign: Campaign) => {
    const action = campaign.status === "ACTIVE" ? "PAUSE" : "ACTIVATE";
    setToggling(campaign.id);
    adsApi
      .updateStatus(campaign.id, action)
      .then(() => fetchCampaigns())
      .catch(() => {})
      .finally(() => setToggling(null));
  };

  const currency = (v: number | null) =>
    v != null ? `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—";

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
          <Link href="/app/ads/accounts" className="text-sm text-brand-red hover:text-red-700 mb-1 inline-block">
            ← Contas de Anúncios
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Campanhas</h1>
        </div>
        <button onClick={handleSync} disabled={syncing} className="btn-secondary btn-sm">
          {syncing ? "Sincronizando..." : "Sincronizar"}
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-gray-500">Nenhuma campanha encontrada.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-header">Nome</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Orçamento</th>
                  <th className="table-header">Objetivo</th>
                  <th className="table-header text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="table-cell font-medium">{camp.name}</td>
                    <td className="table-cell">
                      <span className={`badge ${camp.status === "ACTIVE" ? "badge-green" : "badge-gray"}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="table-cell">{currency(camp.budget)}</td>
                    <td className="table-cell text-gray-400">{camp.objective ?? "—"}</td>
                    <td className="table-cell text-right">
                      <button
                        onClick={() => handleToggle(camp)}
                        disabled={toggling === camp.id}
                        className={`text-sm font-medium disabled:opacity-50 ${
                          camp.status === "ACTIVE"
                            ? "text-brand-red hover:text-red-700"
                            : "text-green-600 hover:text-green-700"
                        }`}
                      >
                        {toggling === camp.id ? "..." : camp.status === "ACTIVE" ? "Pausar" : "Ativar"}
                      </button>
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
