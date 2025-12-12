import { useState, useEffect, useCallback } from 'react';
import { PageTitle } from '@/shared/components/PageTitle';
import { TotaisPorPessoaTable } from '../components/TotaisPorPessoaTable';
import { relatoriosApi } from '../api/relatoriosApi';
import { TotalPorPessoa, RelatorioConsolidado } from '../types/relatorios';
import styles from './TotaisPorPessoaPage.module.css';

export function TotaisPorPessoaPage() {
  const [data, setData] = useState<RelatorioConsolidado<TotalPorPessoa> | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const result = await relatoriosApi.getTotaisPorPessoa();
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
        title="Totais por Pessoa" 
        subtitle="Visualize o resumo financeiro de cada pessoa cadastrada"
      />
      <TotaisPorPessoaTable data={data} />
    </div>
  );
}
