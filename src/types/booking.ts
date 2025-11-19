import type { DurationOption } from "@/lib/scheduling";

export type SchedulingSelectionState = {
  profissionalId?: string;
  data: string;
  horario: string;
  duracao: DurationOption;
};

export type LegalBriefingAnswers = {
  areaDoDireito: string;
  objetivoDaConsulta: string;
  detalhesDoCaso: string;
};
