"use client";

import { useEffect, useState, useCallback } from "react";
import { adsApi, DashboardOverview, DailyMetric } from "@/lib/ads-api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useRouter } from "next/navigation";
import Link from "next/link";

const currency = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
const number = (v: number) => v.toLocaleString("pt-BR");

const periods = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
] as const;

const platforms = [
  { label: "Todas", value: "" },
  { label: "Meta", value: "META" },
  { label: "Google", value: "GOOGLE" },
] as const;

function FilterBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-brand-red text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeseries, setTimeseries] = useState<DailyMetric[]>([]);
  const [tsLoading, setTsLoading] = useState(false);
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState("");
  const router = useRouter();

  useEffect(() => {
    adsApi
      .getOverview()
      .then((res) => setData(res.data))
      .catch(() => router.push("/auth/login"))
      .finally(() => setLoading(false));
  }, []);

  const fetchTimeSeries = useCallback(async () => {
    setTsLoading(true);
    try {
      const res = await adsApi.getTimeSeries(days, platform || undefined);
      setTimeseries(res.data);
    } catch {
      setTimeseries([]);
    } finally {
      setTsLoading(false);
    }
  }, [days, platform]);

  useEffect(() => {
    fetchTimeSeries();
  }, [fetchTimeSeries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Gasto Total" value={data ? currency(data.metrics.spend) : "R$ 0,00"} />
        <MetricCard label="Impressões" value={data ? number(data.metrics.impressions) : "0"} />
        <MetricCard label="Cliques" value={data ? number(data.metrics.clicks) : "0"} />
        <MetricCard label="Conversões" value={data ? number(data.metrics.conversions) : "0"} />
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Evolução de Gastos</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {periods.map((p) => (
                <FilterBtn key={p.days} active={days === p.days} onClick={() => setDays(p.days)} label={p.label} />
              ))}
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex gap-1">
              {platforms.map((p) => (
                <FilterBtn key={p.value} active={platform === p.value} onClick={() => setPlatform(p.value)} label={p.label} />
              ))}
            </div>
          </div>
        </div>
        <div className="card-body">
          {tsLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-red" />
            </div>
          ) : timeseries.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-16">
              Nenhum dado disponível para o período selecionado.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  tickFormatter={(v: any) => {
                    const d = new Date(String(v) + "T00:00:00");
                    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  tickFormatter={(v: any) =>
                    `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                  }
                />
                <Tooltip
                  formatter={(value: any) => [currency(Number(value) || 0), "Gasto"]}
                  labelFormatter={(label: any) => {
                    const d = new Date(String(label) + "T00:00:00");
                    return d.toLocaleDateString("pt-BR");
                  }}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="#DA291C"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard label="Contas Conectadas" value={data ? number(data.accounts) : "0"} />
        <MetricCard label="Campanhas Ativas" value={data ? number(data.activeCampaigns) : "0"} />
        <MetricCard label="CTR" value={data ? `${data.metrics.ctr.toFixed(2)}%` : "0%"} />
        <MetricCard label="CPC" value={data ? currency(data.metrics.cpc) : "R$ 0,00"} />
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Contas de Anúncios</h2>
          <div className="flex gap-3">
            <Link href="/app/ads/connect-meta" className="btn-primary btn-sm">
              + Conectar Meta Ads
            </Link>
            <Link href="/app/ads/connect-google" className="btn-secondary btn-sm">
              + Conectar Google Ads
            </Link>
          </div>
        </div>
        <div className="card-body">
          <p className="text-gray-500 text-sm">
            {data && data.accounts > 0
              ? `${data.accounts} conta(s) conectada(s) com ${data.activeCampaigns} campanha(s) ativa(s).`
              : "Nenhuma conta conectada. Conecte suas contas de anúncio para começar."}
          </p>
          {(data?.accounts ?? 0) > 0 && (
            <Link href="/app/ads/accounts" className="inline-block mt-4 text-brand-red hover:text-red-700 text-sm font-medium">
              Ver contas e campanhas →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
