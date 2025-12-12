import { Routes, Route, Navigate } from 'react-router-dom';
import { PessoasPage } from '@/features/pessoas/pages/PessoasPage';
import { CategoriasPage } from '@/features/categorias/pages/CategoriasPage';
import { TransacoesPage } from '@/features/transacoes/pages/TransacoesPage';
import { TotaisPorPessoaPage } from '@/features/relatorios/pages/TotaisPorPessoaPage';
import { TotaisPorCategoriaPage } from '@/features/relatorios/pages/TotaisPorCategoriaPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pessoas" replace />} />
      <Route path="/pessoas" element={<PessoasPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
      <Route path="/transacoes" element={<TransacoesPage />} />
      <Route path="/relatorios/por-pessoa" element={<TotaisPorPessoaPage />} />
      <Route path="/relatorios/por-categoria" element={<TotaisPorCategoriaPage />} />
    </Routes>
  );
}
