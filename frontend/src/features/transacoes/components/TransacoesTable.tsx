import { Card } from '@/shared/components/Card';
import { EmptyState } from '@/shared/components/EmptyState';
import { formatCurrency } from '@/shared/utils/currency';
import { Transacao, TipoTransacao, TipoTransacaoLabels } from '../types/transacao';
import { Pessoa } from '@/features/pessoas/types/pessoa';
import { Categoria } from '@/features/categorias/types/categoria';
import styles from './TransacoesTable.module.css';

interface TransacoesTableProps {
  transacoes: Transacao[];
  pessoas: Pessoa[];
  categorias: Categoria[];
}

export function TransacoesTable({ transacoes, pessoas, categorias }: TransacoesTableProps) {
  const getPessoaNome = (id: string) => {
    const pessoa = pessoas.find(p => p.id === id);
    return pessoa?.nome || 'Desconhecida';
  };

  const getCategoriaNome = (id: string) => {
    const categoria = categorias.find(c => c.id === id);
    return categoria?.descricao || 'Desconhecida';
  };

  if (transacoes.length === 0) {
    return (
      <Card>
        <EmptyState message="Nenhuma transação cadastrada" />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={styles.title}>Transações Cadastradas</h2>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Pessoa</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id}>
              <td>{transacao.descricao}</td>
              <td>{getPessoaNome(transacao.pessoaId)}</td>
              <td>{getCategoriaNome(transacao.categoriaId)}</td>
              <td>{TipoTransacaoLabels[transacao.tipo]}</td>
              <td className={transacao.tipo === TipoTransacao.Receita ? 'positive' : 'negative'}>
                {transacao.tipo === TipoTransacao.Receita ? '+' : '-'} {formatCurrency(transacao.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
