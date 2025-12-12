import { useState } from 'react';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { CreateCategoriaDto, Finalidade, FinalidadeLabels } from '../types/categoria';
import styles from './CategoriaForm.module.css';

interface CategoriaFormProps {
  onSubmit: (data: CreateCategoriaDto) => Promise<void>;
}

export function CategoriaForm({ onSubmit }: CategoriaFormProps) {
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<string>('');
  const [errors, setErrors] = useState<{ descricao?: string; finalidade?: string }>({});
  const [loading, setLoading] = useState(false);

  const finalidadeOptions = [
    { value: Finalidade.Despesa, label: FinalidadeLabels[Finalidade.Despesa] },
    { value: Finalidade.Receita, label: FinalidadeLabels[Finalidade.Receita] },
    { value: Finalidade.Ambas, label: FinalidadeLabels[Finalidade.Ambas] },
  ];

  const validate = (): boolean => {
    const newErrors: { descricao?: string; finalidade?: string } = {};

    if (!descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (finalidade === '') {
      newErrors.finalidade = 'Finalidade é obrigatória';
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
        finalidade: parseInt(finalidade, 10) as Finalidade 
      });
      setDescricao('');
      setFinalidade('');
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className={styles.title}>Nova Categoria</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={errors.descricao}
          placeholder="Digite a descrição"
        />
        <Select
          label="Finalidade"
          options={finalidadeOptions}
          value={finalidade}
          onChange={(e) => setFinalidade(e.target.value)}
          error={errors.finalidade}
          placeholder="Selecione a finalidade"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </Button>
      </form>
    </Card>
  );
}
