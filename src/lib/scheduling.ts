import { addDays, format, parseISO, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { LegalBriefingAnswers } from "@/types/booking";

export type DurationOption = "30" | "60";

type DayAvailability = {
  slots: string[];
  blocked?: string[];
};

export type ProfessionalProfile = {
  id: string;
  nome: string;
  email: string;
  bio: string;
  endereco: string;
  avatarUrl: string;
  duracaoPadrao: DurationOption;
  availability: Record<DurationOption, Record<string, DayAvailability>>;
};

export type ProfessionalPublicInfo = Pick<ProfessionalProfile, "id" | "nome" | "email" | "avatarUrl" | "duracaoPadrao">;

export type AvailableSlot = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ScheduledEvent = {
  id: string;
  titulo: string;
  inicio: string; // HH:mm
  duracao: DurationOption;
  local?: string;
  cliente?: string;
  briefingSummary?: string;
  briefingAnswers?: LegalBriefingAnswers;
};

export const SUPPORTED_DURATIONS: Record<DurationOption, string> = {
  "30": "30 minutos",
  "60": "1 hora",
};

const DATE_KEY_FORMAT = "yyyy-MM-dd";
const baseDate = startOfToday();
const createDateKey = (offset: number) => format(addDays(baseDate, offset), DATE_KEY_FORMAT);
const createDayAvailability = (slots: string[], blocked: string[] = []): DayAvailability => ({ slots, blocked });

const createEvent = (
  id: string,
  titulo: string,
  inicio: string,
  duracao: DurationOption,
  cliente: string,
  local = "Online",
  briefingSummary?: string,
  briefingAnswers?: LegalBriefingAnswers,
): ScheduledEvent => ({ id, titulo, inicio, duracao, cliente, local, briefingSummary, briefingAnswers });

const PROFESSIONALS: ProfessionalProfile[] = [
  {
    id: "f4b3ad70-3d4a-4f1e-b613-35283b8b67f1",
    nome: "Dra. Lara Monteiro",
    email: "lara.monteiro@juristy.com",
    bio: "Advogada cível com foco em disputas empresariais e audiências estratégicas.",
    endereco: "Av. Paulista, 1000 • São Paulo/SP",
    avatarUrl: "/placeholder.svg",
    duracaoPadrao: "60",
    availability: {
      "60": {
        [createDateKey(1)]: createDayAvailability(["09:00", "10:30", "14:30"], ["10:30"]),
        [createDateKey(4)]: createDayAvailability(["08:30", "10:00", "15:00"]),
        [createDateKey(7)]: createDayAvailability(["09:30", "11:00", "16:00"], ["11:00"]),
      },
      "30": {
        [createDateKey(1)]: createDayAvailability(["09:00", "09:45", "10:30", "11:15", "15:00"], ["09:45"]),
        [createDateKey(3)]: createDayAvailability(["08:30", "09:15", "10:00", "10:45", "11:30"], ["10:45"]),
        [createDateKey(6)]: createDayAvailability(["13:00", "13:45", "14:30", "15:15"], ["13:45"]),
      },
    },
  },
  {
    id: "0fbb9e8d-cc12-4b3c-8d80-8a93bd2c3ab4",
    nome: "Dr. Gustavo Prado",
    email: "gustavo.prado@juristy.com",
    bio: "Especialista em direito tributário e consultoria fiscal para scale-ups.",
    endereco: "Av. das Nações Unidas, 14261 • São Paulo/SP",
    avatarUrl: "/placeholder.svg",
    duracaoPadrao: "30",
    availability: {
      "30": {
        [createDateKey(2)]: createDayAvailability(["07:30", "08:15", "09:00", "09:45", "10:30"], ["09:45"]),
        [createDateKey(5)]: createDayAvailability(["08:00", "08:45", "09:30", "10:15", "11:00"], ["10:15"]),
        [createDateKey(8)]: createDayAvailability(["14:00", "14:45", "15:30", "16:15"], ["15:30"]),
      },
      "60": {
        [createDateKey(2)]: createDayAvailability(["08:00", "09:15", "11:00", "14:00"], ["09:15"]),
        [createDateKey(6)]: createDayAvailability(["09:00", "10:30", "13:00"], ["10:30"]),
      },
    },
  },
  {
    id: "1d0339a9-95d0-4b6a-bf37-928b05c4c092",
    nome: "Dra. Renata Salles",
    email: "renata.salles@juristy.com",
    bio: "Sócia de direito trabalhista com atuação em negociações coletivas e compliance.",
    endereco: "Rua Iaiá, 340 • São Paulo/SP",
    avatarUrl: "/placeholder.svg",
    duracaoPadrao: "60",
    availability: {
      "60": {
        [createDateKey(3)]: createDayAvailability(["10:00", "11:30", "15:30"], ["11:30"]),
        [createDateKey(9)]: createDayAvailability(["09:00", "10:30", "14:30"], ["14:30"]),
      },
      "30": {
        [createDateKey(3)]: createDayAvailability(["09:30", "10:15", "11:00", "14:00"], ["10:15"]),
        [createDateKey(9)]: createDayAvailability(["08:45", "09:30", "10:15", "13:30", "14:15"], ["13:30"]),
      },
    },
  },
  {
    id: "3ab3b0f6-4e10-4cc2-9fd4-74f2bda1f5b1",
    nome: "Dr. Henrique Duarte",
    email: "henrique.duarte@juristy.com",
    bio: "Criminalista dedicado a compliance investigativo e gestão de crises sensíveis.",
    endereco: "Rua Borges Lagoa, 732 • São Paulo/SP",
    avatarUrl: "/placeholder.svg",
    duracaoPadrao: "30",
    availability: {
      "30": {
        [createDateKey(4)]: createDayAvailability(["16:00", "16:45", "17:30", "18:15"], ["17:30"]),
        [createDateKey(10)]: createDayAvailability(["15:00", "15:45", "16:30", "17:15"], ["15:45"]),
      },
      "60": {
        [createDateKey(4)]: createDayAvailability(["16:00", "17:15", "18:30"], ["17:15"]),
        [createDateKey(10)]: createDayAvailability(["15:00", "16:30", "18:00"], ["16:30"]),
      },
    },
  },
  {
    id: "58e46858-3f52-4a35-a95d-e7311b4234cf",
    nome: "Dra. Beatriz Lima",
    email: "beatriz.lima@juristy.com",
    bio: "Especialista em proteção de dados e direito digital para empresas reguladas.",
    endereco: "Av. Brigadeiro Faria Lima, 3900 • São Paulo/SP",
    avatarUrl: "/placeholder.svg",
    duracaoPadrao: "60",
    availability: {
      "60": {
        [createDateKey(5)]: createDayAvailability(["07:00", "08:30", "10:00", "15:00"], ["08:30"]),
        [createDateKey(11)]: createDayAvailability(["09:00", "10:30", "12:00", "16:00"], ["10:30"]),
      },
      "30": {
        [createDateKey(5)]: createDayAvailability(["07:00", "07:45", "08:30", "10:00", "10:45"], ["08:30"]),
        [createDateKey(8)]: createDayAvailability(["09:00", "09:45", "10:30", "11:15", "13:00"], ["11:15"]),
      },
    },
  },
];

const PROFESSIONAL_MAP = new Map(PROFESSIONALS.map((profile) => [profile.id, profile]));
const PROFESSIONAL_EMAIL_MAP = new Map(PROFESSIONALS.map((profile) => [profile.email.toLowerCase(), profile]));
const DURATION_PRIORITY: DurationOption[] = ["60", "30"];

const SCHEDULES: Record<string, Record<string, ScheduledEvent[]>> = {
  "f4b3ad70-3d4a-4f1e-b613-35283b8b67f1": {
    [createDateKey(0)]: [
      createEvent(
        "lara-1",
        "Estratégia de contestação",
        "09:00",
        "60",
        "Construtora Lírio",
        "Online",
        "Contestação envolve cláusula de reajuste e produção de prova técnica antes da audiência de 15/04.",
        {
          areaDoDireito: "Direito cível empresarial",
          objetivoDaConsulta: "Planejar contestação a cobrança extra imposta pela contratante em aditivo recente.",
          detalhesDoCaso: "Audiência marcada para 15/04; cliente possui laudos técnicos e precisa alinhar cronograma com perito.",
        },
      ),
      createEvent(
        "lara-2",
        "Preparação de audiência",
        "11:00",
        "60",
        "Tech&Co",
        "Online",
        "Startup quer alinhar depoimentos para audiência de tutela envolvendo cláusulas de vesting.",
        {
          areaDoDireito: "Societário e contratos",
          objetivoDaConsulta: "Preparar diretoria para audiência que discute limitação de direitos do investidor.",
          detalhesDoCaso: "Liminar atual restringe voto do investidor; audiência de instrução em 09/05.",
        },
      ),
      createEvent(
        "lara-3",
        "Reunião com perito",
        "16:00",
        "30",
        "Grupo Boreal",
        "Online",
        "Equipe precisa alinhar narrativa antes da perícia que analisará atrasos logísticos.",
        {
          areaDoDireito: "Processo civil",
          objetivoDaConsulta: "Definir postura para reunião com perito sobre atraso na entrega de equipamentos.",
          detalhesDoCaso: "Perícia em 20/04 em Guarulhos; cliente quer levar cronologia e e-mails que comprovam força maior.",
        },
      ),
    ],
    [createDateKey(1)]: [
      createEvent(
        "lara-4",
        "Análise de documentos",
        "09:00",
        "60",
        "Magna Foods",
        "Online",
        "Cliente precisa checklist dos documentos para contestar cobrança milionária de fornecedor.",
        {
          areaDoDireito: "Contencioso cível",
          objetivoDaConsulta: "Rever documentos para contestar ação monitória de fornecedor estratégico.",
          detalhesDoCaso: "Liminar autorizou bloqueio parcial; prazo para manifestação em 7 dias.",
        },
      ),
      createEvent(
        "lara-5",
        "Follow-up pós-audiência",
        "14:30",
        "30",
        "InovaLog",
        "Online",
        "Empresa quer avaliar proposta de acordo apresentada em audiência e sugerir contrapartidas.",
        {
          areaDoDireito: "Mediação empresarial",
          objetivoDaConsulta: "Analisar minuta de acordo após audiência e definir limites de confidencialidade.",
          detalhesDoCaso: "Parte contrária pede pagamento em 60 dias; cliente quer cláusulas de confidencialidade reforçadas.",
        },
      ),
    ],
  },
  "0fbb9e8d-cc12-4b3c-8d80-8a93bd2c3ab4": {
    [createDateKey(0)]: [
      createEvent(
        "gustavo-1",
        "Planejamento tributário",
        "08:00",
        "60",
        "Studio Lune",
        "Online",
        "Empresa quer validar uso de incentivo ISS para nova filial e entender contrapartidas exigidas.",
        {
          areaDoDireito: "Direito tributário",
          objetivoDaConsulta: "Revisar planejamento tributário da filial que abrirá com incentivos municipais.",
          detalhesDoCaso: "Prefeitura exige criação de 20 vagas e relatório até 30/04; cliente tem minutas de decreto.",
        },
      ),
      createEvent(
        "gustavo-2",
        "Revisão de incentivos fiscais",
        "10:30",
        "60",
        "Vorgan Tech",
        "Online",
        "Companhia quer confirmar uso de créditos de P&D antes de fiscalização federal.",
        {
          areaDoDireito: "Tributação federal",
          objetivoDaConsulta: "Validar se créditos de inovação podem ser compensados no próximo trimestre.",
          detalhesDoCaso: "Fiscalização da Receita ocorrerá em 05/05; notas fiscais e laudos estão anexados.",
        },
      ),
      createEvent(
        "gustavo-3",
        "Consulta de compliance",
        "15:00",
        "30",
        "Nexus Labs",
        "Online",
        "Startup quer parecer rápido sobre obrigações de integridade em contrato com autarquia estadual.",
        {
          areaDoDireito: "Compliance fiscal",
          objetivoDaConsulta: "Avaliar requisitos de integridade para novo contrato público e definir cronograma de implantação.",
          detalhesDoCaso: "Edital exige canal de denúncias e due diligence de terceiros; assinatura prevista em 20/04.",
        },
      ),
    ],
    [createDateKey(2)]: [
      createEvent(
        "gustavo-4",
        "Estruturação de holding",
        "09:00",
        "60",
        "Família Ramos",
        "Online",
        "Família busca estrutura de holding para sucessão e proteção tributária dos imóveis.",
        {
          areaDoDireito: "Planejamento patrimonial",
          objetivoDaConsulta: "Definir passos para criar holding familiar e reorganizar carteiras de imóveis.",
          detalhesDoCaso: "Imóveis possuem usufruto vitalício; objetivo é reduzir ITCMD mantendo distribuição mensal.",
        },
      ),
    ],
  },
  "1d0339a9-95d0-4b6a-bf37-928b05c4c092": {
    [createDateKey(0)]: [
      createEvent(
        "renata-1",
        "Negociação coletiva",
        "10:00",
        "60",
        "Sindicato Têxtil",
        "Escritório",
        "Categoria busca roteiro para rodada final de negociação salarial mediada pelo TRT.",
        {
          areaDoDireito: "Direito trabalhista coletivo",
          objetivoDaConsulta: "Montar argumentos para negociação salarial com sindicato patronal.",
          detalhesDoCaso: "Proposta patronal de 4% é insuficiente; audiência de mediação em 18/04.",
        },
      ),
      createEvent(
        "renata-2",
        "Due diligence trabalhista",
        "14:00",
        "60",
        "Camila Ramos",
        "Online",
        "Equipe de M&A quer mapa de passivos antes de concluir incorporação.",
        {
          areaDoDireito: "Trabalhista empresarial",
          objetivoDaConsulta: "Mapear contingências trabalhistas da empresa recém-adquirida.",
          detalhesDoCaso: "Existem 45 ações em curso; cliente precisa matriz de risco até 25/04.",
        },
      ),
    ],
    [createDateKey(3)]: [
      createEvent(
        "renata-3",
        "Treinamento compliance",
        "09:30",
        "60",
        "Grupo Delta",
        "On-site",
        "Workshop deve atualizar gestores sobre novas rotinas e canal de denúncias.",
        {
          areaDoDireito: "Compliance trabalhista",
          objetivoDaConsulta: "Preparar workshop para líderes sobre novas NR's e programa de integridade.",
          detalhesDoCaso: "Auditoria interna ocorre em maio; equipe quer material com estudos de caso.",
        },
      ),
    ],
  },
  "3ab3b0f6-4e10-4cc2-9fd4-74f2bda1f5b1": {
    [createDateKey(0)]: [
      createEvent(
        "henrique-1",
        "Plano de resposta a crise",
        "16:00",
        "60",
        "Rest. Casa Verde",
        "Restaurante",
        "Restaurante teme operação policial e quer protocolo jurídico e de comunicação.",
        {
          areaDoDireito: "Direito penal empresarial",
          objetivoDaConsulta: "Desenhar protocolo de resposta a investigação sobre suposta fraude fiscal.",
          detalhesDoCaso: "MP sinalizou diligências para a próxima semana; cliente precisa alinhar porta-voz e documentos enviados.",
        },
      ),
      createEvent(
        "henrique-2",
        "Consultoria investigativa",
        "18:30",
        "30",
        "Bistrô Tartufo",
        "Online",
        "Comitê de ética quer revisar roteiro de entrevistas de investigação interna.",
        {
          areaDoDireito: "Compliance investigativo",
          objetivoDaConsulta: "Validar abordagem de entrevistas em caso de assédio relatado por equipe.",
          detalhesDoCaso: "Relatório final deve ser entregue em 22/04; depoimentos contraditórios já coletados.",
        },
      ),
    ],
    [createDateKey(4)]: [
      createEvent(
        "henrique-3",
        "Preparação de depoimento",
        "15:00",
        "60",
        "Equipe La Cocina",
        "Restaurante",
        "Executivo precisa ser preparado para CPI sobre contratos de alimentação escolar.",
        {
          areaDoDireito: "Criminal/legislativo",
          objetivoDaConsulta: "Treinar executivo para depoimento em CPI e definir limites de sigilo.",
          detalhesDoCaso: "Audiência será em 28/04; cliente quer lista de respostas-chave e documentos permitidos.",
        },
      ),
    ],
  },
  "58e46858-3f52-4a35-a95d-e7311b4234cf": {
    [createDateKey(0)]: [
      createEvent(
        "beatriz-1",
        "Auditoria LGPD",
        "07:00",
        "60",
        "João Victor",
        "Clínica",
        "Clínica quer revisar consentimento no app de telemedicina antes de resposta à ANS.",
        {
          areaDoDireito: "Proteção de dados",
          objetivoDaConsulta: "Analisar políticas de consentimento e mapa de dados sensíveis do app.",
          detalhesDoCaso: "ANS solicitou esclarecimentos até 17/04; cliente tem logs e termos atualizados.",
        },
      ),
      createEvent(
        "beatriz-2",
        "Adequação de contratos",
        "09:00",
        "60",
        "Amanda Silva",
        "Clínica",
        "Rede de parceiros precisa atualizar cláusulas LGPD antes do novo ciclo comercial.",
        {
          areaDoDireito: "Direito digital",
          objetivoDaConsulta: "Atualizar contratos com clínicas parceiras incluindo obrigações de processamento.",
          detalhesDoCaso: "Contrato padrão expira em junho; incluir cláusula de subcontratação e SLA de resposta.",
        },
      ),
      createEvent(
        "beatriz-3",
        "Assessoria preventiva",
        "15:00",
        "30",
        "Equipe RunSP",
        "Academia",
        "Clube esportivo investiga tentativa de phishing e quer orientação de comunicação.",
        {
          areaDoDireito: "Segurança da informação",
          objetivoDaConsulta: "Orientar sobre resposta ao incidente e eventual notificação à ANPD.",
          detalhesDoCaso: "E-mails comprometidos em 02/04; sem vazamento confirmado; avaliar se notifica atletas.",
        },
      ),
    ],
    [createDateKey(5)]: [
      createEvent(
        "beatriz-4",
        "Análise de incidente",
        "09:00",
        "60",
        "Pedro Lourenço",
        "Clínica",
        "Empresa sofreu vazamento em backup e precisa mapear obrigações de reporte.",
        {
          areaDoDireito: "Privacidade e incidentes",
          objetivoDaConsulta: "Delimitar escopo do incidente e definir comunicações obrigatórias.",
          detalhesDoCaso: "Backup ficou exposto por 4 horas com CPF e endereço; cliente isolou servidor e quer parecer imediato.",
        },
      ),
    ],
  },
};

const isDurationOption = (value: unknown): value is DurationOption => value === "30" || value === "60";

const firstAvailableDuration = (profile: ProfessionalProfile): DurationOption =>
  (DURATION_PRIORITY.find((duration) => Object.keys(profile.availability[duration] ?? {}).length > 0) ??
    profile.duracaoPadrao) as DurationOption;

export const resolveDurationForProfessional = (profile: ProfessionalProfile, durationParam?: string | null): DurationOption => {
  const candidate = isDurationOption(durationParam) ? durationParam : undefined;
  if (candidate && Object.keys(profile.availability[candidate] ?? {}).length > 0) {
    return candidate;
  }

  if (Object.keys(profile.availability[profile.duracaoPadrao] ?? {}).length > 0) {
    return profile.duracaoPadrao;
  }

  return firstAvailableDuration(profile);
};

export const listProfessionals = () => PROFESSIONALS;
export const listProfessionalPublicInfo = (): ProfessionalPublicInfo[] =>
  PROFESSIONALS.map(({ id, nome, email, avatarUrl, duracaoPadrao }) => ({ id, nome, email, avatarUrl, duracaoPadrao }));

export const getProfessionalById = (id?: string | null): ProfessionalProfile | null => (id ? PROFESSIONAL_MAP.get(id) ?? null : null);

export const getProfessionalByEmail = (email?: string | null): ProfessionalProfile | null => {
  if (!email) {
    return null;
  }
  return PROFESSIONAL_EMAIL_MAP.get(email.trim().toLowerCase()) ?? null;
};

export const DEFAULT_PROFESSIONAL = PROFESSIONALS[0];
export const DEFAULT_PROFESSIONAL_ID = DEFAULT_PROFESSIONAL.id;

export const formatDateKey = (date: Date) => format(date, DATE_KEY_FORMAT);

export const formatDatePtBR = (date: Date) => format(date, "eeee, d 'de' MMMM", { locale: ptBR });

export const formatTimeRange = (slot: string, duration: DurationOption) => {
  const [hours, minutes] = slot.split(":").map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start.getTime() + Number(duration) * 60 * 1000);

  return `${slot} - ${format(end, "HH:mm")}`;
};

export const getAvailableDates = (professionalId: string, duration: DurationOption): Date[] => {
  const profile = getProfessionalById(professionalId);
  if (!profile) {
    return [];
  }

  const durationKey = resolveDurationForProfessional(profile, duration);
  const availability = profile.availability[durationKey] ?? {};

  return Object.keys(availability)
    .map((iso) => parseISO(iso))
    .sort((a, b) => a.getTime() - b.getTime());
};

export const getAvailableSlots = (
  professionalId: string,
  duration: DurationOption,
  date: Date | undefined,
): AvailableSlot[] => {
  if (!date) {
    return [];
  }

  const profile = getProfessionalById(professionalId);
  if (!profile) {
    return [];
  }

  const durationKey = resolveDurationForProfessional(profile, duration);
  const availability = profile.availability[durationKey] ?? {};
  const dayAvailability = availability[formatDateKey(date)];

  if (!dayAvailability) {
    return [];
  }

  const blockedSet = new Set(dayAvailability.blocked ?? []);

  return dayAvailability.slots.map((slot) => ({
    value: slot,
    label: `${slot} (${SUPPORTED_DURATIONS[durationKey]})`,
    disabled: blockedSet.has(slot),
  }));
};

export const listProfessionalUrls = (basePath = "/agendar") =>
  PROFESSIONALS.map((profile) => {
    const duration = resolveDurationForProfessional(profile, profile.duracaoPadrao);
    return {
      id: profile.id,
      url: `${basePath}?professionalId=${profile.id}&durationTime=${duration}`,
    };
  });

export const buildSchedulingUrl = (professionalId: string, duration: DurationOption, basePath = "/agendar") =>
  `http://localhost:8080${basePath}?professionalId=${professionalId}&durationTime=${duration}`;

export const getSchedulesForDate = (professionalId: string, date: Date): ScheduledEvent[] => {
  const profileSchedules = SCHEDULES[professionalId];
  if (!profileSchedules) {
    return [];
  }

  const events = profileSchedules[formatDateKey(date)] ?? [];
  return [...events].sort((a, b) => (a.inicio > b.inicio ? 1 : -1));
};

export const PROFESSIONAL_PASSWORD = "123456";

export const authenticateProfessional = (email: string, password: string) => {
  const profile = getProfessionalByEmail(email);
  if (!profile) {
    return null;
  }

  if (password !== PROFESSIONAL_PASSWORD) {
    return null;
  }

  return profile;
};
