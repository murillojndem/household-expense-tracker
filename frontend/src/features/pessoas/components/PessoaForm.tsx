import { useState } from 'react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { CreatePessoaDto } from '../types/pessoa';
import styles from './PessoaForm.module.css';

interface PessoaFormProps {
  onSubmit: (data: CreatePessoaDto) => Promise<void>;
}

export function PessoaForm({ onSubmit }: PessoaFormProps) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [errors, setErrors] = useState<{ nome?: string; idade?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { nome?: string; idade?: string } = {};

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    const idadeNum = parseInt(idade, 10);
    if (!idade || isNaN(idadeNum) || idadeNum < 0) {
      newErrors.idade = 'Idade deve ser um número positivo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({ nome: nome.trim(), idade: parseInt(idade, 10) });
      setNome('');
      setIdade('');
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className={styles.title}>Nova Pessoa</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={errors.nome}
          placeholder="Digite o nome"
        />
        <Input
          label="Idade"
          type="number"
          min="0"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          error={errors.idade}
          placeholder="Digite a idade"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </Button>
      </form>
    </Card>
  );
}
