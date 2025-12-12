export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  PESSOAS: `${API_BASE_URL}/pessoas`,
  CATEGORIAS: `${API_BASE_URL}/categorias`,
  TRANSACOES: `${API_BASE_URL}/transacoes`,
  RELATORIOS: {
    POR_PESSOA: `${API_BASE_URL}/relatorios/por-pessoa`,
    POR_CATEGORIA: `${API_BASE_URL}/relatorios/por-categoria`,
  },
};
