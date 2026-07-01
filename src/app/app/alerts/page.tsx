"use client";

import { useEffect, useState } from "react";
import { alertsApi, Alert } from "@/lib/ads-api";

const severityBadge: Record<string, string> = {
  CRITICAL: "badge-red",
  HIGH: "badge-yellow",
  MEDIUM: "badge-blue",
  LOW: "badge-gray",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await alertsApi.list();
      setAlerts(res.data);
    } catch {
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleMarkRead = async (id: string) => {
    await alertsApi.markRead(id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const handleMarkAllRead = async () => {
    await alertsApi.markAllRead();
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
          <p className="text-sm text-gray-500 mt-1">{unreadCount} não lida(s)</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="btn-secondary btn-sm">
            Marcar todas como lidas
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-gray-400">Nenhum alerta encontrado.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`card flex items-start justify-between gap-4 ${
                alert.read ? "opacity-60" : ""
              }`}
            >
              <div className="flex-1 min-w-0 p-5">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`badge ${severityBadge[alert.severity] ?? "badge-gray"}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(alert.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                {alert.link && (
                  <a
                    href={alert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-brand-red hover:text-red-700 font-medium"
                  >
                    Ver →
                  </a>
                )}
              </div>
              {!alert.read && (
                <div className="p-5 shrink-0">
                  <button
                    onClick={() => handleMarkRead(alert.id)}
                    className="text-sm text-gray-500 hover:text-brand-red font-medium"
                  >
                    Marcar como lida
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
