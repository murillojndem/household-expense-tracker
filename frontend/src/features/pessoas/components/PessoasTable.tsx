import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { Pessoa } from '../types/pessoa';
import styles from './PessoasTable.module.css';

interface PessoasTableProps {
  pessoas: Pessoa[];
  onDelete: (pessoa: Pessoa) => void;
}

export function PessoasTable({ pessoas, onDelete }: PessoasTableProps) {
  if (pessoas.length === 0) {
    return (
      <Card>
        <EmptyState message="Nenhuma pessoa cadastrada" />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={styles.title}>Pessoas Cadastradas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade} anos</td>
              <td>
                <Button variant="danger" onClick={() => onDelete(pessoa)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
