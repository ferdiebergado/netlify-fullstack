import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'sonner/dist/styles.css';
import App from './app/app';
import './index.css';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
