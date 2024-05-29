import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppThemeProvider } from './themes/AppThemeProvider';
import { ToastContextProvider } from "@/contexts/useToast";
import store from './store';
import React from 'react';
import App from './App';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContextProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
     </ToastContextProvider>
    </Provider>
    
  </React.StrictMode>,
);
