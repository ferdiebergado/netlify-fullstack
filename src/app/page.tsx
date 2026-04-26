import { useRoutes } from 'react-router';
import { routes } from './routes';

export default function Page() {
  return useRoutes(routes);
}
