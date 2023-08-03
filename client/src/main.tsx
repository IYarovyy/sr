import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'vite/modulepreload-polyfill'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Router>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
