import { useState, useEffect, useCallback } from 'react';
import { PageTitle } from '@/shared/components/PageTitle';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { PessoaForm } from '../components/PessoaForm';
import { PessoasTable } from '../components/PessoasTable';
import { pessoasApi } from '../api/pessoasApi';
import { Pessoa, CreatePessoaDto } from '../types/pessoa';
import styles from './PessoasPage.module.css';

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Pessoa | null>(null);

  const loadPessoas = useCallback(async () => {
    try {
      const data = await pessoasApi.getAll();
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPessoas();
  }, [loadPessoas]);

  const handleCreate = async (data: CreatePessoaDto) => {
    await pessoasApi.create(data);
    await loadPessoas();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    
    try {
      await pessoasApi.delete(deleteTarget.id);
      await loadPessoas();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <PageTitle 
        title="Pessoas" 
        subtitle="Gerencie as pessoas cadastradas no sistema"
      />
      
      <div className={styles.content}>
        <PessoaForm onSubmit={handleCreate} />
        <PessoasTable pessoas={pessoas} onDelete={setDeleteTarget} />
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Excluir Pessoa"
        message={`Deseja realmente excluir ${deleteTarget?.nome}? Todas as transações desta pessoa também serão excluídas.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
