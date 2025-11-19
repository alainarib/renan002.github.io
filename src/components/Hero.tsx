import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-calendar.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Feito para bancas e advogados independentes</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
              A agenda jurídica que{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">chega com contexto</span>
              {" "}antes de cada consulta
            </h1>
            
            <p className="text-lg text-muted-foreground lg:text-xl">
              Juristy organiza seus horários, identifica conflitos e coleta um briefing jurídico para cada cliente antes da reunião, sem planilhas ou idas e vindas no WhatsApp.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/agendar">
                  Teste o Juristy
                  <Calendar className="transition-transform group-hover:scale-110" />
                </Link>
              </Button>
              <Button asChild variant="outlineHero" size="xl">
                <Link to="/agendar">Ver fluxo do cliente</Link>
              </Button>
            </div>
            
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Triagem em menos de 2 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Sem integrações complexas</span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">
                Inclui questionário jurídico automatizado, lembretes e central de clientes.
              </p>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-primary opacity-20 blur-3xl"></div>
            <img
              src={heroImage}
              alt="Advogada revisando agenda digital organizada"
              className="relative rounded-2xl shadow-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
