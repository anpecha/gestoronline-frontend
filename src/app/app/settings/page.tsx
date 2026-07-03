"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [locale, setLocale] = useState(user?.locale || "pt-BR");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [twoFactorPassword, setTwoFactorPassword] = useState("");
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"idle" | "secret" | "done">("idle");
  const [twoFactorMessage, setTwoFactorMessage] = useState("");

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.patch("/auth/me", { name, locale });
      setMessage("Perfil atualizado com sucesso!");
    } catch {
      setMessage("Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Senhas não conferem.");
      return;
    }
    setChangingPassword(true);
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      setPasswordMessage("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordMessage("Erro ao alterar senha. Verifique a senha atual.");
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleEnable2FA() {
    setTwoFactorMessage("");
    try {
      const res = await api.post("/auth/2fa/enable", {
        password: twoFactorPassword,
      });
      setTwoFactorSecret(res.data.secret);
      setStep("secret");
    } catch {
      setTwoFactorMessage("Erro ao ativar 2FA. Verifique a senha.");
    }
  }

  async function handleVerify2FA() {
    setTwoFactorMessage("");
    try {
      await api.post("/auth/2fa/verify", { code: verificationCode });
      setStep("done");
      setTwoFactorMessage("2FA ativado com sucesso!");
      setTwoFactorSecret("");
      setVerificationCode("");
    } catch {
      setTwoFactorMessage("Código inválido. Tente novamente.");
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-foreground">Perfil</h2>
          <p className="text-sm text-muted-foreground">
            Atualize suas informações pessoais.
          </p>
        </div>
        <div className="card-body space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input w-full opacity-60 cursor-not-allowed"
            />
          </div>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Idioma
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="input w-full"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Salvando..." : "Salvar"}
            </button>
            {message && (
              <p
                className={`text-sm ${
                  message.includes("sucesso")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-foreground">Alterar Senha</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Senha Atual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input w-full"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input w-full"
                required
                minLength={6}
              />
            </div>
            <button type="submit" disabled={changingPassword} className="btn-primary">
              {changingPassword ? "Alterando..." : "Alterar Senha"}
            </button>
            {passwordMessage && (
              <p
                className={`text-sm ${
                  passwordMessage.includes("sucesso")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-foreground">
            Autenticação de Dois Fatores (2FA)
          </h2>
          <p className="text-sm text-muted-foreground">
            Adicione uma camada extra de segurança à sua conta.
          </p>
        </div>
        <div className="card-body space-y-4">
          {step === "idle" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Para ativar, confirme sua senha primeiro.
              </p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Sua Senha
                  </label>
                  <input
                    type="password"
                    value={twoFactorPassword}
                    onChange={(e) => setTwoFactorPassword(e.target.value)}
                    className="input w-full"
                  />
                </div>
                <button onClick={handleEnable2FA} className="btn-primary">
                  Ativar 2FA
                </button>
              </div>
              {twoFactorMessage && (
                <p className="text-sm text-red-600">{twoFactorMessage}</p>
              )}
            </div>
          )}

          {step === "secret" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Escaneie o QR code com seu aplicativo autenticador (Google
                Authenticator, Authy) ou use a chave abaixo:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm break-all select-all">
                  {twoFactorSecret}
                </code>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Código de Verificação
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input flex-1"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <button onClick={handleVerify2FA} className="btn-primary">
                    Verificar
                  </button>
                </div>
              </div>
              {twoFactorMessage && (
                <p className="text-sm text-red-600">{twoFactorMessage}</p>
              )}
            </div>
          )}

          {step === "done" && (
            <div className="space-y-4">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                2FA está ativo na sua conta.
              </p>
              <p className="text-sm text-muted-foreground">
                Para desativar, vá até Configurações &gt; Segurança.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
