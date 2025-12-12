export interface TotalPorPessoa {
  pessoa:{
    id: string;
    nome: string;
    idade: number;
  }
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotalPorCategoria {
  categoria: {
    id: string;
    descricao: string;
    finalidade: number;
  }
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioConsolidado<T> {
  lista: T[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}
