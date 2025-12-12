import { Card } from '@/shared/components/Card';
import { EmptyState } from '@/shared/components/EmptyState';
import { formatCurrency } from '@/shared/utils/currency';
import { TotalPorPessoa, RelatorioConsolidado } from '../types/relatorios';
import styles from './TotaisPorPessoaTable.module.css';

interface TotaisPorPessoaTableProps {
  data: RelatorioConsolidado<TotalPorPessoa> | null;
}

export function TotaisPorPessoaTable({ data }: TotaisPorPessoaTableProps) {
  if (!data || data.lista.length === 0) {
    return (
      <Card>
        <EmptyState message="Nenhum dado disponível para exibição" />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={styles.title}>Totais por Pessoa</h2>
      <table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.lista.map((item) => (
            <tr key={item.pessoa.id}>
              <td>{item.pessoa.nome}</td>
              <td className="positive">{formatCurrency(item.totalReceitas)}</td>
              <td className="negative">{formatCurrency(item.totalDespesas)}</td>
              <td className={item.saldo >= 0 ? 'positive' : 'negative'}>
                {formatCurrency(item.saldo)}
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td><strong>Total Geral</strong></td>
            <td className="positive"><strong>{formatCurrency(data.totalReceitas)}</strong></td>
            <td className="negative"><strong>{formatCurrency(data.totalDespesas)}</strong></td>
            <td className={data.saldo >= 0 ? 'positive' : 'negative'}>
              <strong>{formatCurrency(data.saldo)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
