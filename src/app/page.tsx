"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  BarChart3,
  Target,
  Bell,
  Globe,
  Users,
  Zap,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Eye,
  PlayCircle,
  MessageCircle,
  Shield,
  Smartphone,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    description: "Para profissionais começando no tráfego pago",
    features: [
      "1 conta Meta Ads ou Google Ads",
      "Dashboard com métricas básicas",
      "Até 5 campanhas monitoradas",
      "Alertas de orçamento",
      "Relatórios semanais por WhatsApp",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 97",
    period: "/mês",
    description: "Para agências e profissionais de marketing",
    features: [
      "Contas ilimitadas Meta Ads + Google Ads",
      "Dashboard completo com gráficos",
      "Campanhas ilimitadas",
      "Alertas inteligentes em tempo real",
      "Relatórios automáticos WhatsApp",
      "API de integração",
      "Suporte prioritário",
    ],
    cta: "Assinar Agora",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R$ 297",
    period: "/mês",
    description: "Para empresas com operações avançadas",
    features: [
      "Tudo do plano Profissional",
      "Agente IA para otimização",
      "Gerador de criativos com IA",
      "CRM integrado",
      "Tracking UTM e Pixel",
      "Múltiplos usuários",
      "Gerente de conta dedicado",
      "SLA 99.9%",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Unificado",
    desc: "Acompanhe Meta Ads e Google Ads em um só lugar. Gráficos em tempo real, comparação entre plataformas e visão consolidada do seu desempenho.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    desc: "Receba notificações no WhatsApp quando uma campanha estourar o orçamento, tiver queda de performance ou precisar de atenção.",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    icon: Target,
    title: "Gestão Multi-Plataforma",
    desc: "Conecte quantas contas de anúncio quiser — Meta Ads e Google Ads — e gerencie tudo de um único painel centralizado.",
    color: "from-red-500 to-red-600",
    bg: "bg-red-50 dark:bg-red-950",
  },
  {
    icon: TrendingUp,
    title: "Otimização com IA",
    desc: "Nosso agente de IA analisa suas campanhas e sugere ajustes de lance, segmentação e orçamento para maximizar resultados.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: MessageCircle,
    title: "Relatórios por WhatsApp",
    desc: "Relatórios automáticos de desempenho enviados direto no seu WhatsApp. Perfeito para quem quer resultados rápidos sem abrir o painel.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    icon: Globe,
    title: "Multi-idioma",
    desc: "Plataforma completa em português, inglês e espanhol. Ideal para agências que atendem clientes internacionais.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
];

const examples = [
  {
    icon: Users,
    title: "Agência de Marketing Digital",
    description:
      "A AgênciaMais gerencia 12 contas de clientes entre Meta e Google. Com o GestorOnline, reduziu em 70% o tempo gasto em relatórios manuais. O dashboard consolidado permite que cada cliente veja seus resultados em tempo real, e os relatórios automáticos de WhatsApp eliminam a necessidade de reuniões de alinhamento.",
    metrics: [
      { label: "Redução no tempo de relatórios", value: "70%" },
      { label: "Aumento na retenção de clientes", value: "35%" },
      { label: "Contas gerenciadas", value: "12" },
    ],
  },
  {
    icon: Store,
    title: "E-commerce de Moda",
    description:
      "A ModaFashion usava planilhas para acompanhar campanhas. Com o GestorOnline, passou a monitorar ROAS em tempo real. Os alertas inteligentes avisaram quando o CPA subiu 40% em uma campanha, permitindo ajuste imediato que economizou R$ 3.200 antes que o orçamento estourasse.",
    metrics: [
      { label: "Economia em orçamento perdido", value: "R$ 3.200" },
      { label: "Redução de CPA", value: "28%" },
      { label: "Aumento de ROAS", value: "45%" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Curso Online (Infoproduto)",
    description:
      "O InfoprodutorDigital lançou um curso com orçamento de R$ 15.000 em Meta Ads. Usando o GestorOnline, configurou alertas de orçamento diário e recebia relatórios de performance no WhatsApp a cada 2 horas. Identificou que um dos criativos tinha CTR 3x maior e redirecionou 80% do orçamento para ele, gerando 2,5x mais leads pelo mesmo investimento.",
    metrics: [
      { label: "Aumento de leads", value: "2,5x" },
      { label: "Orçamento otimizado", value: "80%" },
      { label: "CTR do melhor criativo", value: "3x maior" },
    ],
  },
];

function Store(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleFeatures = showAll ? plan.features : plan.features.slice(0, 4);

  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "bg-brand-dark text-white shadow-2xl ring-2 ring-brand-yellow scale-105"
          : "bg-white dark:bg-brand-dark/80 text-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-dark text-xs font-bold px-4 py-1 rounded-full">
          MAIS POPULAR
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className={`text-sm mt-1 ${plan.popular ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.period && (
          <span className={`text-lg ${plan.popular ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}>
            {plan.period}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {visibleFeatures.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                plan.popular ? "text-brand-yellow" : "text-green-500"
              }`}
            />
            <span>{feat}</span>
          </li>
        ))}
        {plan.features.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-xs font-medium ${
              plan.popular
                ? "text-brand-yellow hover:text-yellow-300"
                : "text-brand-red hover:text-red-700"
            }`}
          >
            {showAll ? "Mostrar menos ↑" : `+${plan.features.length - 4} recursos`}
          </button>
        )}
      </ul>

      <button
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          plan.popular
            ? "bg-brand-yellow text-brand-dark hover:bg-yellow-400"
            : "bg-brand-dark text-white dark:bg-brand-yellow dark:text-brand-dark hover:bg-gray-800 dark:hover:bg-yellow-400"
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function LandingPage() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1117]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0F1117]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-brand-red" />
              <span className="font-bold text-lg">GestorOnline</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Funcionalidades", "Planos", "Exemplos", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-yellow transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <a
                href="/auth/login"
                className="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-yellow transition-colors"
              >
                Entrar
              </a>
              <a
                href="/auth/register"
                className="btn-primary text-sm"
              >
                Começar Grátis
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F1117]">
            <div className="px-4 py-4 space-y-3">
              {["Funcionalidades", "Planos", "Exemplos", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-red"
                >
                  {item}
                </a>
              ))}
              <a
                href="/auth/login"
                className="block text-sm font-medium text-brand-red"
              >
                Entrar
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-red/10 text-brand-red dark:bg-brand-yellow/20 dark:text-brand-yellow mb-6">
                <Zap className="w-3 h-3" />
                Plataforma SaaS para gestão de tráfego pago
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Gerencie suas campanhas{" "}
                <span className="text-brand-red">com inteligência</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
                Unifique Meta Ads e Google Ads em um só painel. Dashboard em
                tempo real, alertas inteligentes no WhatsApp, relatórios
                automáticos e otimização com IA.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/auth/register" className="btn-primary px-8 py-3 text-base">
                  Começar Grátis
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="#exemplos" className="btn-ghost px-8 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg">
                  <PlayCircle className="w-5 h-5" />
                  Ver Exemplos
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" /> Sem cartão de crédito
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" /> Cancelamento fácil
                </span>
              </div>
            </div>

            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-brand-dark p-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-400 text-xs ml-2">dashboard.gestoronline.app</span>
                </div>
                <div className="bg-gray-100 dark:bg-[#1A1D27] p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Gasto Total", value: "R$ 12.458", change: "+12%", up: true },
                      { label: "Impressões", value: "284.5K", change: "+8%", up: true },
                      { label: "CTR Médio", value: "2.4%", change: "+0.3pp", up: true },
                    ].map((card) => (
                      <div key={card.label} className="bg-white dark:bg-[#242736] rounded-lg p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                        <span className={`text-xs font-medium ${card.up ? "text-green-600" : "text-red-600"}`}>
                          {card.change}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white dark:bg-[#242736] rounded-lg p-4 h-40 flex items-center justify-center">
                    <div className="flex items-end gap-3 h-24">
                      {[30, 45, 25, 60, 40, 55, 70, 50, 65, 35, 80, 75].map((h, i) => (
                        <div
                          key={i}
                          className="w-6 rounded-t"
                          style={{
                            height: `${h}%`,
                            background: i % 3 === 0
                              ? "var(--brand-red)"
                              : i % 3 === 1
                              ? "var(--brand-yellow)"
                              : "#6B7280",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-yellow rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="py-20 px-4 bg-gray-50 dark:bg-[#1A1D27]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo que você precisa para gerenciar tráfego pago
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Uma plataforma completa que unifica suas plataformas de anúncios, automatiza relatórios e potencializa resultados com IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`inline-flex p-3 rounded-xl ${feat.bg} mb-4`}>
                  <feat.icon className={`w-6 h-6 text-gray-900 dark:text-white`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="exemplos" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Casos de Uso Reais
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Veja como diferentes perfis de negócio estão usando o GestorOnline para transformar sua gestão de tráfego.
            </p>
          </div>

          <div className="space-y-8">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-5 gap-8 p-8 rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700"
              >
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-yellow/20 text-brand-dark dark:text-brand-yellow">
                      <ex.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {ex.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {ex.metrics.map((m, j) => (
                    <div
                      key={j}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-[#1A1D27] border border-gray-100 dark:border-gray-700"
                    >
                      <p className="text-2xl font-bold text-brand-red dark:text-brand-yellow">
                        {m.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="py-20 px-4 bg-gray-50 dark:bg-[#1A1D27]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Planos para cada necessidade
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Do profissional autônomo à grande agência, temos o plano ideal para você.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-brand-red shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Precisa de algo personalizado?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Oferecemos planos customizados para agências com necessidades específicas.
                  Entre em contato e montamos uma solução sob medida para sua operação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto para transformar sua gestão de tráfego?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Crie sua conta gratuita em menos de 2 minutos. Sem compromisso, sem cartão de crédito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/auth/register" className="btn-primary px-8 py-3 text-base">
              Criar Conta Grátis
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="/auth/login"
              className="btn-ghost px-8 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Já tenho conta
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-brand-red" />
              <span className="font-bold">GestorOnline</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Plataforma SaaS para gestão de tráfego pago. Unifique Meta Ads e Google Ads,
              automatize relatórios e potencialize resultados com IA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#funcionalidades" className="hover:text-brand-red dark:hover:text-brand-yellow">Funcionalidades</a></li>
              <li><a href="#planos" className="hover:text-brand-red dark:hover:text-brand-yellow">Planos</a></li>
              <li><a href="#exemplos" className="hover:text-brand-red dark:hover:text-brand-yellow">Exemplos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><span>Contato: contato@gestoronline.app</span></li>
              <li><span>CNPJ: 00.000.000/0001-00</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GestorOnline. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
