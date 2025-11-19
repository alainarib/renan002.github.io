import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DEFAULT_PROFESSIONAL_ID, SUPPORTED_DURATIONS, formatDatePtBR, formatTimeRange, getProfessionalById } from "@/lib/scheduling";
import type { LegalBriefingAnswers, SchedulingSelectionState } from "@/types/booking";

const legalBriefingSchema = z.object({
  areaDoDireito: z
    .string({ required_error: "Informe a área do direito" })
    .min(3, "Descreva a área do direito"),
  objetivoDaConsulta: z.string().min(10, "Conte qual é o objetivo principal da consulta"),
  detalhesDoCaso: z.string().min(10, "Compartilhe o contexto essencial para o time jurídico"),
});

const Briefing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? null) as SchedulingSelectionState | null;

  const consulta = useMemo(() => {
    if (!state) {
      return null;
    }

    const profissional = getProfessionalById(state.profissionalId) ?? getProfessionalById(DEFAULT_PROFESSIONAL_ID);
    if (!profissional) {
      return null;
    }

    return {
      profissional,
      data: new Date(state.data),
      horario: state.horario,
      duracao: state.duracao,
    };
  }, [state]);

  const form = useForm<LegalBriefingAnswers>({
    resolver: zodResolver(legalBriefingSchema),
    defaultValues: {
      areaDoDireito: "",
      objetivoDaConsulta: "",
      detalhesDoCaso: "",
    },
  });

  if (!state || !consulta) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <Card className="max-w-md space-y-6 border-border bg-card/90 p-8 text-center shadow-card">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-foreground">Selecione data e horário primeiro</h1>
            <p className="text-sm text-muted-foreground">
              Precisamos das informações do agendamento para preparar o briefing jurídico.
            </p>
          </div>
          <Button onClick={() => navigate("/agendar")}>Voltar para agenda</Button>
        </Card>
      </main>
    );
  }

  const resumoHorario = `${consulta.horario} (${formatTimeRange(consulta.horario, consulta.duracao)})`;

  const onSubmit = (answers: LegalBriefingAnswers) => {
    navigate("/confirmacao", {
      state: {
        ...state,
        briefing: answers,
      },
    });
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1fr_1fr] lg:py-16">
        <section>
          <Card className="space-y-6 border border-primary/30 bg-card/80 p-6 shadow-card">
            <header className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-primary">Briefing jurídico</p>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">Conte o essencial sobre o caso</h1>
                <p className="text-sm text-muted-foreground">
                  Suas respostas chegam diretamente à equipe de {consulta.profissional.nome}, ajudando o time a se preparar antes da consulta.
                </p>
              </div>
            </header>

            <dl className="grid gap-4 rounded-xl border border-border/60 bg-background/60 p-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Profissional</dt>
                <dd className="font-medium text-foreground">{consulta.profissional.nome}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Data</dt>
                <dd className="font-medium text-foreground">{formatDatePtBR(consulta.data)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Horário</dt>
                <dd className="font-medium text-foreground">{resumoHorario}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Duração</dt>
                <dd className="font-medium text-foreground">
                  {SUPPORTED_DURATIONS[consulta.duracao]}
                </dd>
              </div>
            </dl>
            <p className="text-sm text-muted-foreground">
              Responda de forma objetiva. O formulário leva menos de dois minutos e substitui trocas demoradas de mensagens.
            </p>
          </Card>
        </section>

        <section>
          <Card className="border-border bg-card/80 p-6 shadow-card">
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="areaDoDireito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Qual área do direito descreve melhor o seu caso? <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex: Direito societário, tributário, trabalhista..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="objetivoDaConsulta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Qual é o objetivo principal da consulta? <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explique em poucas palavras o que espera resolver ou decidir durante a reunião."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="detalhesDoCaso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Há fatos relevantes ou prazos importantes? <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Inclua datas críticas, nomes das partes envolvidas ou decisões já existentes."
                          className="min-h-[140px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                    Voltar
                  </Button>
                  <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando..." : "Continuar para confirmação"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Briefing;
