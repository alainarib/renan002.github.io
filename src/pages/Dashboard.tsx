import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import {
  SUPPORTED_DURATIONS,
  DurationOption,
  buildSchedulingUrl,
  formatDatePtBR,
  getSchedulesForDate,
  formatTimeRange,
} from "@/lib/scheduling";

const Dashboard = () => {
  const { professional, logout } = useAuth();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [duration, setDuration] = useState<DurationOption>(professional?.duracaoPadrao ?? "60");
  const [expandedBriefings, setExpandedBriefings] = useState<Record<string, boolean>>({});

  const events = useMemo(() => {
    if (!professional) {
      return [];
    }
    return getSchedulesForDate(professional.id, selectedDate);
  }, [professional, selectedDate]);

  const handleToggleBriefing = (eventId: string) =>
    setExpandedBriefings((previous) => ({ ...previous, [eventId]: !previous[eventId] }));

  if (!professional) {
    return null;
  }

  const generatedUrl = buildSchedulingUrl(professional.id, duration);

  return (
    <main className="container mx-auto flex flex-col gap-6 px-4 py-8">
      <header className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card/80 p-6 shadow-sm lg:flex-row lg:items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Bem-vindo de volta</p>
          <h1 className="text-2xl font-bold text-foreground">{professional.nome}</h1>
          <p className="text-sm text-muted-foreground">{professional.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Sair
        </Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-5 border-border bg-card/90 p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Agenda do dia</h2>
              <p className="text-sm text-muted-foreground">{formatDatePtBR(selectedDate)}</p>
            </div>
          </header>
          <Separator />
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum compromisso agendado para esta data.</p>
            ) : (
              <ul className="space-y-4">
                {events.map((event) => {
                  const isExpanded = expandedBriefings[event.id];
                  return (
                    <li
                      key={event.id}
                      className="rounded-lg border border-border/70 bg-background/80 p-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs font-semibold uppercase">
                            {formatTimeRange(event.inicio, event.duracao)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{event.local}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{event.titulo}</p>
                        <p className="text-sm text-muted-foreground">Cliente: {event.cliente}</p>
                      </div>

                      {event.briefingSummary && (
                        <div className="mt-4 rounded-lg border border-border/50 bg-card/70 p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-1">
                              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                                Resumo assistido por IA
                              </p>
                              <p className="text-sm text-foreground">{event.briefingSummary}</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="self-start whitespace-nowrap"
                              aria-expanded={isExpanded}
                              onClick={() => handleToggleBriefing(event.id)}
                            >
                              {isExpanded ? "Ocultar perguntas" : "Ver perguntas"}
                            </Button>
                          </div>

                          {isExpanded && (
                            <dl className="mt-4 space-y-3 text-sm text-muted-foreground">
                              <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Área do direito
                                </dt>
                                <dd className="text-foreground">{event.briefingAnswers?.areaDoDireito ?? "Cliente não informou."}</dd>
                              </div>
                              <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Objetivo da consulta
                                </dt>
                                <dd className="text-foreground">
                                  {event.briefingAnswers?.objetivoDaConsulta ?? "Sem objetivo descrito."}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Detalhes e prazos
                                </dt>
                                <dd className="text-foreground">
                                  {event.briefingAnswers?.detalhesDoCaso ?? "Sem detalhes adicionais enviados."}
                                </dd>
                              </div>
                            </dl>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-border bg-card/90 p-6 shadow-sm">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Escolha a data</h2>
              <p className="text-sm text-muted-foreground">Selecione para visualizar os compromissos.</p>
            </header>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;
                const normalized = startOfDay(date);
                if (normalized.getDay() === 0 || normalized.getDay() === 6) {
                  return;
                }
                if (normalized < today) {
                  return;
                }
                setSelectedDate(normalized);
              }}
              locale={ptBR}
              weekStartsOn={0}
              disabled={(date) => {
                const normalized = startOfDay(date);
                return normalized.getDay() === 0 || normalized.getDay() === 6 || normalized < today;
              }}
            />
          </Card>

          <Card className="space-y-4 border-border bg-card/90 p-6 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground">Gerar link de agendamento</h2>
              <p className="text-sm text-muted-foreground">
                Compartilhe um link rápido com clientes para agendar um horário.
              </p>
            </header>
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium text-muted-foreground">
                Duração do compromisso
              </label>
              <Select value={duration} onValueChange={(value: DurationOption) => setDuration(value)}>
                <SelectTrigger id="duration" className="capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SUPPORTED_DURATIONS) as DurationOption[]).map((option) => (
                    <SelectItem key={option} value={option} className="capitalize">
                      {SUPPORTED_DURATIONS[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-dashed border-border bg-background/80 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Link gerado</p>
              <p className="break-all text-sm font-semibold text-primary">{generatedUrl}</p>
            </div>
            <Button type="button" className="w-full" onClick={() => navigator.clipboard.writeText(generatedUrl)}>
              Copiar link
            </Button>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
