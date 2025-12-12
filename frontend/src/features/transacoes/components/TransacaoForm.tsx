import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { CreateTransacaoDto, TipoTransacao, TipoTransacaoLabels } from '../types/transacao';
import { Pessoa } from '@/features/pessoas/types/pessoa';
import { Categoria, Finalidade } from '@/features/categorias/types/categoria';
import styles from './TransacaoForm.module.css';

interface TransacaoFormProps {
  pessoas: Pessoa[];
  categorias: Categoria[];
  onSubmit: (data: CreateTransacaoDto) => Promise<void>;
}

export function TransacaoForm({ pessoas, categorias, onSubmit }: TransacaoFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<string>('');
  const [categoriaId, setCategoriaId] = useState('');
  const [pessoaId, setPessoaId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const pessoaSelecionada = useMemo(() => 
    pessoas.find(p => p.id === pessoaId),
    [pessoas, pessoaId]
  );

  const isMenorDeIdade = pessoaSelecionada ? pessoaSelecionada.idade < 18 : false;

  useEffect(() => {
    if (isMenorDeIdade && tipo === String(TipoTransacao.Receita)) {
      setTipo(String(TipoTransacao.Despesa));
    }
  }, [isMenorDeIdade, tipo]);

  useEffect(() => {
    setCategoriaId('');
  }, [tipo]);

  const tipoOptions = useMemo(() => {
    const options = [
      { value: TipoTransacao.Despesa, label: TipoTransacaoLabels[TipoTransacao.Despesa] },
    ];
    
    if (!isMenorDeIdade) {
      options.push({ value: TipoTransacao.Receita, label: TipoTransacaoLabels[TipoTransacao.Receita] });
    }
    
    return options;
  }, [isMenorDeIdade]);

  const categoriasFiltradas = useMemo(() => {
    if (tipo === '') return [];
    
    const tipoNum = parseInt(tipo, 10) as TipoTransacao;
    
    return categorias.filter(cat => {
      if (cat.finalidade === Finalidade.Ambas) return true;
      if (tipoNum === TipoTransacao.Despesa && cat.finalidade === Finalidade.Despesa) return true;
      if (tipoNum === TipoTransacao.Receita && cat.finalidade === Finalidade.Receita) return true;
      return false;
    });
  }, [categorias, tipo]);

  const pessoaOptions = pessoas.map(p => ({ 
    value: p.id, 
    label: `${p.nome} (${p.idade} anos)` 
  }));

  const categoriaOptions = categoriasFiltradas.map(c => ({ 
    value: c.id, 
    label: c.descricao 
  }));

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    const valorNum = parseFloat(valor.replace(',', '.'));
    if (!valor || isNaN(valorNum) || valorNum <= 0) {
      newErrors.valor = 'Valor deve ser um número positivo';
    }

    if (tipo === '') {
      newErrors.tipo = 'Tipo é obrigatório';
    }

    if (!categoriaId) {
      newErrors.categoriaId = 'Categoria é obrigatória';
    }

    if (!pessoaId) {
      newErrors.pessoaId = 'Pessoa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({
        descricao: descricao.trim(),
        valor: parseFloat(valor.replace(',', '.')),
        tipo: parseInt(tipo, 10) as TipoTransacao,
        categoriaId,
        pessoaId,
      });
      setDescricao('');
      setValor('');
      setTipo('');
      setCategoriaId('');
      setPessoaId('');
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className={styles.title}>Nova Transação</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Pessoa"
          options={pessoaOptions}
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
          error={errors.pessoaId}
          placeholder="Selecione a pessoa"
        />
        
        {isMenorDeIdade && (
          <div className={styles.warning}>
            Pessoa menor de idade: apenas despesas são permitidas.
          </div>
        )}

        <Input
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={errors.descricao}
          placeholder="Digite a descrição"
        />
        
        <Input
          label="Valor"
          type="number"
          step="0.01"
          min="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          error={errors.valor}
          placeholder="0,00"
        />
        
        <Select
          label="Tipo"
          options={tipoOptions}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          error={errors.tipo}
          placeholder="Selecione o tipo"
          disabled={!pessoaId}
        />
        
        <Select
          label="Categoria"
          options={categoriaOptions}
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          error={errors.categoriaId}
          placeholder="Selecione a categoria"
          disabled={tipo === ''}
        />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </Button>
      </form>
    </Card>
  );
}
