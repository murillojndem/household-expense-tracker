export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
}

export interface CreatePessoaDto {
  nome: string;
  idade: number;
}
