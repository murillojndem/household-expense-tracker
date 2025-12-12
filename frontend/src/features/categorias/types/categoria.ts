export enum Finalidade {
  Despesa = 0,
  Receita = 1,
  Ambas = 2,
}

export interface Categoria {
  id: string;
  descricao: string;
  finalidade: Finalidade;
}

export interface CreateCategoriaDto {
  descricao: string;
  finalidade: Finalidade;
}

export const FinalidadeLabels: Record<Finalidade, string> = {
  [Finalidade.Despesa]: 'Despesa',
  [Finalidade.Receita]: 'Receita',
  [Finalidade.Ambas]: 'Ambas',
};
