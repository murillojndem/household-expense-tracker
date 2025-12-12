export enum TipoTransacao {
  Despesa = 0,
  Receita = 1,
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  pessoaId: string;
}

export interface CreateTransacaoDto {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  pessoaId: string;
}

export const TipoTransacaoLabels: Record<TipoTransacao, string> = {
  [TipoTransacao.Despesa]: 'Despesa',
  [TipoTransacao.Receita]: 'Receita',
};
