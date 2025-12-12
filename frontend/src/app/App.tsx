import { BrowserRouter } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Shell>
        <AppRoutes />
      </Shell>
    </BrowserRouter>
  );
}
