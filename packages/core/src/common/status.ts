export interface Status {
    status: "Aberta" | "Em Andamento" | "Atrasada" | "Paralisada" | "Concluída";
  }

export const statusOptions = [
    { label: "Aberta", value: "Aberta" },
    { label: "Em Andamento", value: "Em Andamento" },
    { label: "Atrasada", value: "Atrasada" },
    { label: "Paralisada", value: "Paralisada" },
    { label: "Concluída", value: "Concluída" },
  ];