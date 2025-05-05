import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { StyleProvider } from './components/ui/provider';
import store from './store/store';
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleProvider>
        <App />
      </StyleProvider>
    </Provider>
  </React.StrictMode>,
)
