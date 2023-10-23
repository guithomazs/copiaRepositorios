import { Profissional } from "./profissional";

export type Especialidade = {
    id: number;
    nome: string;
    profissionais?: Array<Profissional>;
}