import { http } from '@/shared/api/httpClient';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { Categoria, CreateCategoriaDto } from '../types/categoria';

export const categoriasApi = {
  getAll: () => http.get<Categoria[]>(ENDPOINTS.CATEGORIAS),
  
  create: (data: CreateCategoriaDto) => http.post<Categoria>(ENDPOINTS.CATEGORIAS, data),
};
