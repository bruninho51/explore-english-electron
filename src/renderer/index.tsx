import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
