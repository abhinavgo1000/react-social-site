import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StyleProvider } from './components/ui/provider';
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider>
      <App />
    </StyleProvider>
  </React.StrictMode>,
)
