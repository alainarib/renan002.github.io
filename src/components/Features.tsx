import { Calendar, Clock, FileText, Smartphone, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Agenda jurídica inteligente",
    description: "Visualize audiências, reuniões e prazos em uma linha do tempo clara pensada para escritórios boutique.",
  },
  {
    icon: FileText,
    title: "Triagem automatizada",
    description: "Questionários rápidos coletam área do direito, objetivo e contexto antes da consulta inicial.",
  },
  {
    icon: Smartphone,
    title: "Experiência omnicanal",
    description: "Compartilhe o link de agendamento por WhatsApp, e-mail ou site e receba tudo centralizado.",
  },
  {
    icon: Clock,
    title: "Controle de prazos",
    description: "Alertas configuráveis para compromissos críticos e bloqueio automático de conflitos na agenda.",
  },
  {
    icon: Users,
    title: "Central de clientes",
    description: "Histórico completo de interações e consultas em um mesmo lugar para toda a equipe.",
  },
  {
    icon: TrendingUp,
    title: "Indicadores claros",
    description: "Acompanhe taxa de conversão de consultas, principais áreas atendidas e gargalos da operação.",
  },
];

const Features = () => {
  return (
    <section className="bg-muted/50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-5xl">
            Infraestrutura moderna para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              escritórios jurídicos ágeis
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ferramentas desenhadas para advogados que precisam conciliar atendimento, prazos e relacionamento com clientes.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-opacity group-hover:opacity-20"></div>
              
              <div className="relative space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
