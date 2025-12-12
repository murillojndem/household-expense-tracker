import { http } from '@/shared/api/httpClient';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { TotalPorPessoa, TotalPorCategoria, RelatorioConsolidado } from '../types/relatorios';

export const relatoriosApi = {
  getTotaisPorPessoa: () => 
    http.get<RelatorioConsolidado<TotalPorPessoa>>(ENDPOINTS.RELATORIOS.POR_PESSOA),
  
  getTotaisPorCategoria: () => 
    http.get<RelatorioConsolidado<TotalPorCategoria>>(ENDPOINTS.RELATORIOS.POR_CATEGORIA),
};
