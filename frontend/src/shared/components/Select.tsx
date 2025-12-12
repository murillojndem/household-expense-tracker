import React from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export function Select({ label, options, error, id, placeholder, ...props }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s/g, '-');
  
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>{label}</label>
      <select id={selectId} className={`${styles.select} ${error ? styles.error : ''}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
