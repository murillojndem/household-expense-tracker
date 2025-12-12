import { useState, useEffect, useCallback } from 'react';
import { PageTitle } from '@/shared/components/PageTitle';
import { TotaisPorCategoriaTable } from '../components/TotaisPorCategoriaTable';
import { relatoriosApi } from '../api/relatoriosApi';
import { TotalPorCategoria, RelatorioConsolidado } from '../types/relatorios';
import styles from './TotaisPorCategoriaPage.module.css';

export function TotaisPorCategoriaPage() {
  const [data, setData] = useState<RelatorioConsolidado<TotalPorCategoria> | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const result = await relatoriosApi.getTotaisPorCategoria();
      setData(result);
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <PageTitle 
        title="Totais por Categoria" 
        subtitle="Visualize o resumo financeiro de cada categoria cadastrada"
      />
      <TotaisPorCategoriaTable data={data} />
    </div>
  );
}
