import { http } from '@/shared/api/httpClient';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { Transacao, CreateTransacaoDto } from '../types/transacao';

export const transacoesApi = {
  getAll: () => http.get<Transacao[]>(ENDPOINTS.TRANSACOES),
  
  create: (data: CreateTransacaoDto) => http.post<Transacao>(ENDPOINTS.TRANSACOES, data),
};
