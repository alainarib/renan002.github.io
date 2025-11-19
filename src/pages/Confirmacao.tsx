import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  SUPPORTED_DURATIONS,
  getProfessionalById,
  formatDatePtBR,
  formatTimeRange,
  DEFAULT_PROFESSIONAL_ID,
} from "@/lib/scheduling";
import type { LegalBriefingAnswers, SchedulingSelectionState } from "@/types/booking";

type ConfirmationState = SchedulingSelectionState & {
  briefing?: LegalBriefingAnswers;
};

const confirmationSchema = z.object({
  nomeCompleto: z
    .string({ required_error: "Informe o nome completo" })
    .min(3, "Informe pelo menos 3 caracteres"),
  telefone: z
    .string({ required_error: "Informe o telefone" })
    .regex(/^[0-9]{10,11}$/, "Informe apenas números com DDD (10 ou 11 dígitos)"),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Informe um e-mail válido"),
  termos: z.literal(true, { errorMap: () => ({ message: "Você precisa aceitar os termos" }) }),
});

type ConfirmationForm = z.infer<typeof confirmationSchema>;

const Confirmacao = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? null) as ConfirmationState | null;

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
      briefing: state.briefing ?? null,
    };
  }, [state]);

  const form = useForm<ConfirmationForm>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      nomeCompleto: "",
      telefone: "",
      email: "",
      termos: false,
    },
  });

  if (!consulta) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <Card className="max-w-md space-y-6 border-border bg-card/90 p-8 text-center shadow-card">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-foreground">Ops, algo deu errado</h1>
            <p className="text-sm text-muted-foreground">
              Não encontramos as informações do agendamento. Volte e selecione uma data e horário novamente.
            </p>
          </div>
          <Button onClick={() => navigate("/agendar")}>Voltar para agendar</Button>
        </Card>
      </main>
    );
  }

  const onSubmit = (data: ConfirmationForm) => {
    const payload = {
      ...data,
      horarioSelecionado: consulta.horario,
      dataSelecionada: consulta.data.toISOString(),
      duracao: consulta.duracao,
      profissionalId: consulta.profissional.id,
      briefing: consulta.briefing,
    };

    console.log("Dados enviados:", payload);
    navigate("/", { replace: true });
  };

  const resumoHorario = `${consulta.horario} (${formatTimeRange(consulta.horario, consulta.duracao)})`;

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1fr_1fr] lg:py-16">
        <section>
          <Card className="space-y-6 border-border bg-card/85 p-6 shadow-card">
            <header className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-primary">Resumo da consulta</p>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">Confirme o atendimento jurídico</h1>
                <p className="text-sm text-muted-foreground">
                  Confira os detalhes do horário e avance apenas se as informações estiverem corretas.
                </p>
              </div>
            </header>

            <dl className="grid gap-4 text-sm">
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
              <div>
                <dt className="text-muted-foreground">Endereço</dt>
                <dd className="font-medium text-foreground">{consulta.profissional.endereco}</dd>
              </div>
            </dl>

            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <h3 className="mb-3 text-base font-semibold text-foreground">Briefing preenchido</h3>
              {consulta.briefing ? (
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Área do direito</dt>
                    <dd className="font-medium text-foreground">{consulta.briefing.areaDoDireito}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Objetivo da consulta</dt>
                    <dd className="font-medium text-foreground">{consulta.briefing.objetivoDaConsulta}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Detalhes e prazos</dt>
                    <dd className="font-medium text-foreground">{consulta.briefing.detalhesDoCaso}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Não recebemos o briefing jurídico. Retorne para inserir as informações essenciais.
                </p>
              )}
            </div>
          </Card>
        </section>

        <section>
          <Card className="border-border bg-card/85 p-6 shadow-card">
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Seus dados</h2>
                  <p className="text-sm text-muted-foreground">
                    Informe seus dados de contato. A equipe jurídica usará essas informações para confirmar o atendimento.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="nomeCompleto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ana Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="11999999999"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          {...field}
                          onChange={(event) => {
                            const onlyDigits = event.target.value.replace(/\D/g, "");
                            field.onChange(onlyDigits);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail (opcional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="voce@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termos"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-2">
                          <FormLabel className="text-sm font-medium text-foreground">Concordo com os termos</FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Confirmo que li e aceito os termos de uso e a política de privacidade do Juristy.
                          </p>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" size="lg" disabled={!form.watch("termos") || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando..." : "Confirmar consulta"}
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

export default Confirmacao;
