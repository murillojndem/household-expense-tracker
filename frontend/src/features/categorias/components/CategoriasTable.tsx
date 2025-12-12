import { Card } from '@/shared/components/Card';
import { EmptyState } from '@/shared/components/EmptyState';
import { Categoria, FinalidadeLabels } from '../types/categoria';
import styles from './CategoriasTable.module.css';

interface CategoriasTableProps {
  categorias: Categoria[];
}

export function CategoriasTable({ categorias }: CategoriasTableProps) {
  if (categorias.length === 0) {
    return (
      <Card>
        <EmptyState message="Nenhuma categoria cadastrada" />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={styles.title}>Categorias Cadastradas</h2>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.descricao}</td>
              <td>{FinalidadeLabels[categoria.finalidade]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
