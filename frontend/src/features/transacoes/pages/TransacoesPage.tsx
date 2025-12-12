import { useState, useEffect, useCallback } from 'react';
import { PageTitle } from '@/shared/components/PageTitle';
import { TransacaoForm } from '../components/TransacaoForm';
import { TransacoesTable } from '../components/TransacoesTable';
import { transacoesApi } from '../api/transacoesApi';
import { pessoasApi } from '@/features/pessoas/api/pessoasApi';
import { categoriasApi } from '@/features/categorias/api/categoriasApi';
import { Transacao, CreateTransacaoDto } from '../types/transacao';
import { Pessoa } from '@/features/pessoas/types/pessoa';
import { Categoria } from '@/features/categorias/types/categoria';
import styles from './TransacoesPage.module.css';

export function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [transacoesData, pessoasData, categoriasData] = await Promise.all([
        transacoesApi.getAll(),
        pessoasApi.getAll(),
        categoriasApi.getAll(),
      ]);
      setTransacoes(transacoesData);
      setPessoas(pessoasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (data: CreateTransacaoDto) => {
    await transacoesApi.create(data);
    await loadData();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <PageTitle 
        title="Transações" 
        subtitle="Registre e visualize todas as transações financeiras"
      />
      
      <div className={styles.content}>
        <TransacaoForm 
          pessoas={pessoas} 
          categorias={categorias}
          onSubmit={handleCreate} 
        />
        <TransacoesTable 
          transacoes={transacoes} 
          pessoas={pessoas}
          categorias={categorias}
        />
      </div>
    </div>
  );
}
