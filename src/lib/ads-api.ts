import { api } from "./api";

export interface AdAccount {
  id: string;
  platform: "META" | "GOOGLE";
  name: string;
  accountId: string;
  status: string;
  createdAt: string;
  campaigns?: Campaign[];
}

export interface Campaign {
  id: string;
  externalId: string;
  name: string;
  status: "ACTIVE" | "PAUSED";
  budget: number | null;
  objective: string | null;
  adAccount?: AdAccount;
  metrics?: CampaignMetric[];
}

export interface CampaignMetric {
  id: string;
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversions: number;
}

export interface DashboardOverview {
  accounts: number;
  activeCampaigns: number;
  metrics: {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

export interface DailyMetric {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

export interface Alert {
  id: string;
  kind: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export const adsApi = {
  getAccounts: () => api.get<AdAccount[]>("/ads/accounts"),
  getCampaigns: (accountId?: string) =>
    api.get<Campaign[]>("/ads/campaigns", {
      params: accountId ? { accountId } : {},
    }),
  getOverview: () => api.get<DashboardOverview>("/ads/overview"),
  getTimeSeries: (days = 30, platform?: string) =>
    api.get<DailyMetric[]>("/ads/metrics/timeseries", {
      params: { days, ...(platform ? { platform } : {}) },
    }),
  connectMeta: (accessToken: string) =>
    api.post("/ads/accounts/meta/connect", { accessToken }),
  connectGoogle: (data: {
    accessToken: string;
    refreshToken: string;
    clientId: string;
    clientSecret: string;
  }) => api.post("/ads/accounts/google/connect", data),
  sync: () => api.post("/ads/sync"),
  updateStatus: (campaignId: string, action: "PAUSE" | "ACTIVATE") =>
    api.post(`/ads/campaigns/${campaignId}/status`, { action }),
  updateBudget: (campaignId: string, budget: number) =>
    api.post(`/ads/campaigns/${campaignId}/budget`, { budget }),
};

export const alertsApi = {
  list: (unreadOnly = false) =>
    api.get<Alert[]>("/alerts", { params: unreadOnly ? { unread: "true" } : {} }),
  markRead: (id: string) => api.post(`/alerts/${id}/read`),
  markAllRead: () => api.post("/alerts/read-all"),
  checkBudgets: () => api.post("/alerts/check-budgets"),
};
