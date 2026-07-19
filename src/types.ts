export enum ScreenId {
  ACCESO = "acceso",
  DIRECTIVO = "directivo",
  CLINICA = "clinica",
  DOCENTE = "docente",
  ESTU_MOBILE = "estudiante",
  APODERADO = "apoderado"
}

export interface ChatMessage {
  id: string;
  sender: "student" | "system" | "ai" | "user";
  senderName: string;
  text: string;
  time: string;
  criticalLevel?: number;
}

export interface StudentCase {
  id: string;
  name: string;
  grade: string;
  rbd: string;
  schoolName: string;
  avatar?: string;
  riskFactors: {
    autoestima: "Bajo" | "Medio" | "Alto";
    ansiedad: "Bajo" | "Moderado" | "Crítico";
    bullying: "Bajo" | "Moderado" | "Alto";
    riesgoVital: "Bajo" | "Moderado" | "ALERTA ROJA";
  };
  chatHistory: ChatMessage[];
  supportNetwork: {
    relation: string;
    name: string;
    phone: string;
    canEmail: boolean;
  }[];
  auditLogs: {
    time: string;
    user: string;
    action: string;
    hash?: string;
  }[];
}
