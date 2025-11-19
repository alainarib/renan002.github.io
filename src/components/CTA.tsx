import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-card p-8 shadow-glow lg:p-16">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-5xl">
              Entregue uma experiência{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                jurídica impecável
              </span>{" "}
              desde o primeiro contato
            </h2>
            
            <p className="mb-8 text-lg text-muted-foreground">
              Juristy reduz o vai e volta das marcações, centraliza dados sensíveis e dá contexto para o time jurídico atuar com agilidade.
            </p>
            
            <div className="mb-10 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Questionário jurídico automático</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Bloqueio de conflitos na agenda</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Compartilhamento seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Suporte especializado</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="hero" size="xl" className="group">
                Comece com o Juristy
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="ghost" size="xl">
                Falar com o time comercial
              </Button>
            </div>
            
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">
                Configuração guiada e suporte humano já no período de testes.
              </p>
              <p>
                Cancelamento simples e dados protegidos com criptografia ponta a ponta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
