import { http } from '@/shared/api/httpClient';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { Pessoa, CreatePessoaDto } from '../types/pessoa';

export const pessoasApi = {
  getAll: () => http.get<Pessoa[]>(ENDPOINTS.PESSOAS),
  
  create: (data: CreatePessoaDto) => http.post<Pessoa>(ENDPOINTS.PESSOAS, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.PESSOAS}/${id}`),
};
