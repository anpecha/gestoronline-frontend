"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/app/ads/accounts", label: "Contas de Anúncios", icon: "📢" },
  { href: "/app/alerts", label: "Alertas", icon: "🔔" },
  { href: "/app/settings", label: "Configurações", icon: "⚙️" },
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-gray-400 hover:text-white transition-colors text-lg"
      title="Alternar tema"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red" />
      </div>
    );
  }

  if (!user) return null;

  const pageTitle = navItems.find((n) => pathname.startsWith(n.href))?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-background dark:bg-[#0f0f0f]">
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

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <ThemeToggle />
          </div>
          <button
            onClick={logout}
            className="sidebar-link sidebar-link-inactive w-full text-xs"
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-foreground">{pageTitle}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
