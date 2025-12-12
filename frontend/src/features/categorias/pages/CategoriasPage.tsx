import { useState, useEffect, useCallback } from 'react';
import { PageTitle } from '@/shared/components/PageTitle';
import { CategoriaForm } from '../components/CategoriaForm';
import { CategoriasTable } from '../components/CategoriasTable';
import { categoriasApi } from '../api/categoriasApi';
import { Categoria, CreateCategoriaDto } from '../types/categoria';
import styles from './CategoriasPage.module.css';

export function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategorias = useCallback(async () => {
    try {
      const data = await categoriasApi.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  const handleCreate = async (data: CreateCategoriaDto) => {
    await categoriasApi.create(data);
    await loadCategorias();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <PageTitle 
        title="Categorias" 
        subtitle="Gerencie as categorias de transações"
      />
      
      <div className={styles.content}>
        <CategoriaForm onSubmit={handleCreate} />
        <CategoriasTable categorias={categorias} />
      </div>
    </div>
  );
}
