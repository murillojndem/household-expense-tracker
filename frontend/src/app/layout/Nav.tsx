import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <h1>Controle de Gastos</h1>
      </div>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/pessoas" className={({ isActive }) => isActive ? styles.active : ''}>
            Pessoas
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias" className={({ isActive }) => isActive ? styles.active : ''}>
            Categorias
          </NavLink>
        </li>
        <li>
          <NavLink to="/transacoes" className={({ isActive }) => isActive ? styles.active : ''}>
            Transações
          </NavLink>
        </li>
        <li className={styles.divider}>Relatórios</li>
        <li>
          <NavLink to="/relatorios/por-pessoa" className={({ isActive }) => isActive ? styles.active : ''}>
            Por Pessoa
          </NavLink>
        </li>
        <li>
          <NavLink to="/relatorios/por-categoria" className={({ isActive }) => isActive ? styles.active : ''}>
            Por Categoria
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
