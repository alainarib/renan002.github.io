import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { isSameDay } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";

import LoadingState from "@/components/LoadingState";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useFakeFetch } from "@/hooks/use-fake-fetch";
import {
  DEFAULT_PROFESSIONAL,
  SUPPORTED_DURATIONS,
  DurationOption,
  formatDatePtBR,
  formatTimeRange,
  getAvailableDates,
  getAvailableSlots,
  getProfessionalById,
  resolveDurationForProfessional,
} from "@/lib/scheduling";

const Agendamento = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const professionalParam = searchParams.get("professionalId");
  const durationParam = searchParams.get("durationTime");

  const professional = useMemo(() => getProfessionalById(professionalParam) ?? DEFAULT_PROFESSIONAL, [professionalParam]);
  const duration = useMemo<DurationOption>(
    () => resolveDurationForProfessional(professional, durationParam),
    [professional, durationParam],
  );

  const availableDates = useMemo(() => getAvailableDates(professional.id, duration), [professional.id, duration]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(availableDates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const availableSlots = useMemo(
    () => getAvailableSlots(professional.id, duration, selectedDate),
    [professional.id, duration, selectedDate],
  );
  const isLoadingProfessional = useFakeFetch({
    dependencies: [professional.id],
    delay: 900,
  });
  const isLoadingSlots = useFakeFetch({
    dependencies: [professional.id, duration, selectedDate ? selectedDate.toISOString() : "no-date"],
    delay: 750,
  });

  useEffect(() => {
    if (!availableDates.length) {
      setSelectedDate(undefined);
      setSelectedSlot(null);
      return;
    }

    setSelectedDate((previous) => {
      if (previous && availableDates.some((availableDay) => isSameDay(availableDay, previous))) {
        return previous;
      }
      return availableDates[0];
    });
    setSelectedSlot(null);
  }, [availableDates]);

  const handleDaySelect = (day?: Date) => {
    if (!day) {
      setSelectedDate(undefined);
      setSelectedSlot(null);
      return;
    }

    const match = availableDates.find((availableDay) => isSameDay(day, availableDay));
    if (!match) {
      return;
    }
    setSelectedDate(match);
    setSelectedSlot(null);
  };

  const isSelected = (slot: string) => selectedSlot === slot;

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) {
      return;
    }

    navigate("/briefing", {
      state: {
        profissionalId: professional.id,
        data: selectedDate.toISOString(),
        horario: selectedSlot,
        duracao: duration,
      },
    });
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <section>
          <Card className="space-y-8 border-border bg-card/80 p-6 shadow-card">
            {isLoadingProfessional ? (
              <LoadingState
                className="min-h-[420px]"
                message="Sincronizando disponibilidade do profissional..."
              />
            ) : (
              <>
                <header className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={professional.avatarUrl} alt={professional.nome} />
                    <AvatarFallback>{professional.nome.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-sm uppercase tracking-wide text-primary">Você está marcando com</p>
                      <h1 className="text-2xl font-bold text-foreground">{professional.nome}</h1>
                    </div>
                    <p className="text-muted-foreground">{professional.bio}</p>
                    <dl className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase text-muted-foreground">Duração padrão</dt>
                        <dd className="text-sm font-medium text-foreground">{SUPPORTED_DURATIONS[duration]}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase text-muted-foreground">Endereço</dt>
                        <dd className="text-sm font-medium text-foreground">{professional.endereco}</dd>
                      </div>
                    </dl>
                  </div>
                </header>

                <section className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Selecione um dia</h2>
                      {selectedDate && (
                        <span className="text-sm text-primary">{formatDatePtBR(selectedDate)}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Escolha uma data disponível para o atendimento jurídico.</p>
                  </div>

                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDate}
                    onSelect={handleDaySelect}
                    weekStartsOn={0}
                    showOutsideDays={false}
                    disabled={(date) => date.getDay() === 0 || date.getDay() === 6 || !availableDates.some((availableDay) => isSameDay(availableDay, date))}
                    modifiers={{ selected: selectedDate ? (day) => isSameDay(day, selectedDate) : undefined }}
                  />
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold">Horários disponíveis</h2>
                  {isLoadingSlots ? (
                    <LoadingState
                      compact
                      className="rounded-lg border border-dashed border-border bg-background/80 px-4"
                      message="Buscando horários disponíveis..."
                    />
                  ) : selectedDate ? (
                    availableSlots.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => {
                              if (!slot.disabled) {
                                setSelectedSlot(slot.value);
                              }
                            }}
                            className={cn(
                              "rounded-lg border border-border px-4 py-3 text-left text-sm font-medium transition-colors",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              slot.disabled
                                ? "cursor-not-allowed bg-muted/30 text-muted-foreground"
                                : "bg-background hover:border-primary hover:text-primary",
                              isSelected(slot.value) && !slot.disabled && "border-primary bg-primary/10 text-primary",
                            )}
                            disabled={slot.disabled}
                          >
                            <span>{slot.value}</span>
                            <span className="block text-xs font-normal text-muted-foreground">
                              {slot.disabled ? "Indisponível" : formatTimeRange(slot.value, duration)}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhum horário disponível para este dia. Escolha outra data.
                      </p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">Selecione um dia para ver os horários disponíveis.</p>
                  )}
                </section>
              </>
            )}
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="space-y-5 border-border bg-card/80 p-6 shadow-card">
            <header className="space-y-2">
              <h2 className="text-xl font-semibold">Resumo rápido</h2>
              <p className="text-sm text-muted-foreground">
                Enquanto você escolhe a data e horário, veja aqui um resumo do atendimento requisitado.
              </p>
            </header>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Profissional</p>
                <p className="font-medium text-foreground">{professional.nome}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duração</p>
                <p className="font-medium text-foreground">
                  {SUPPORTED_DURATIONS[duration]}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Data escolhida</p>
                <p className="font-medium text-foreground">
                  {selectedDate ? formatDatePtBR(selectedDate) : "Selecione um dia"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Horário</p>
                <p className="font-medium text-foreground">
                  {selectedSlot
                    ? `${selectedSlot} (${formatTimeRange(selectedSlot, duration)})`
                    : "Escolha um horário"}
                </p>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 transition-all duration-200",
          selectedDate && selectedSlot ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mx-auto max-w-3xl px-4 pb-6">
          <Card className="pointer-events-auto flex flex-col gap-4 rounded-2xl border-primary/40 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Você selecionou</p>
              <p className="text-base font-semibold text-foreground">
                {selectedDate && selectedSlot
                  ? `${formatDatePtBR(selectedDate)} • ${selectedSlot}`
                  : "Selecione data e horário"}
              </p>
            </div>
            <Button size="lg" className="gap-2" onClick={handleConfirm}>
              Responder briefing jurídico
              <span aria-hidden>→</span>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Agendamento;
