"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/app/ads/accounts", label: "Contas de Anúncios", icon: "📢" },
  { href: "/app/alerts", label: "Alertas", icon: "🔔" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <a
      href={href}
      className={`sidebar-link ${
        active ? "sidebar-link-active" : "sidebar-link-inactive"
      }`}
    >
      {children}
    </a>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  const pageTitle = navItems.find((n) => pathname.startsWith(n.href))?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <aside className="w-64 bg-brand-dark flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">GestorOnline</h1>
          <p className="text-xs text-gray-400 mt-1">{user.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/auth/login";
            }}
            className="sidebar-link sidebar-link-inactive w-full mt-2 text-xs"
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
