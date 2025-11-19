import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/70 p-10 text-center shadow-card">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Juristy</div>
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <p className="mb-6 text-base text-muted-foreground">
          Não encontramos a página solicitada. Verifique o endereço ou volte para o início.
        </p>
        <Link to="/" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
