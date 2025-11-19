import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticating, professionals } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = login(email, password);
    if (!result.success) {
      setError(result.error ?? "Não foi possível autenticar");
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:flex-row">
        <section className="flex-1 bg-background/60 px-8 py-10 lg:flex lg:flex-col lg:justify-between">
          <div className="mx-auto w-full max-w-md space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Painel do Juristy</p>
              <h1 className="text-3xl font-bold text-foreground">Entre e cuide da sua banca</h1>
              <p className="text-sm text-muted-foreground">
                Acompanhe consultas jurídicas, questionários respondidos e compartilhe novos links com clientes.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="advogado@juristy.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <div className="text-right text-sm">
                  <Link to="#" className="text-primary underline-offset-4 hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" className="h-12 w-full text-base font-semibold" disabled={isAuthenticating}>
                {isAuthenticating ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ou</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="flex justify-center">
                <GoogleButton
                  type="light"
                  onClick={() => {
                    // Placeholder: fluxo real não implementado
                  }}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Ainda não tem acesso?
              <Link to="#" className="ml-2 font-semibold text-primary underline-offset-4 hover:underline">
                Fale com o time Juristy
              </Link>
            </p>

            <div className="rounded-lg border border-border bg-background/50 p-4">
              <h2 className="mb-2 text-sm font-semibold text-foreground">Credenciais de demonstração</h2>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {professionals.map((professional) => (
                  <li key={professional.id} className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{professional.nome}</span>
                    <span className="rounded bg-muted/70 px-2 py-1 font-mono text-xs text-foreground/80">{professional.email}</span>
                    <span className="rounded bg-muted/70 px-2 py-1 font-mono text-xs text-foreground/80">123456</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="flex-1 bg-gradient-to-b from-black via-[#1a0509] to-black px-8 py-10 text-white">
          <div className="mx-auto flex h-full max-w-md flex-col justify-between space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                Acesso seguro para bancas jurídicas
              </div>
              <h2 className="text-3xl font-bold leading-snug">
                Centralize consultas, questionários legais e comunicação com clientes em um só painel.
              </h2>
            </div>

            <div className="space-y-5 text-sm text-white/80">
              <p>
                "O Juristy colocou ordem nas agendas dos sócios e trouxe o contexto necessário antes de cada reunião. Nosso tempo com o cliente passou a ser focado na estratégia do caso."
              </p>
              <div>
                <p className="font-semibold text-white">Helena Diniz</p>
                <p>Sócia fundadora — Diniz &amp; Vidal Advogados</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-white/60">
              <Link to="#" className="hover:text-white">Termos</Link>
              <Link to="#" className="hover:text-white">Privacidade</Link>
              <p className="text-white/40">© {new Date().getFullYear()} Juristy</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Login;
