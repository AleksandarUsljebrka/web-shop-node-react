import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router/Router';
import "tailwindcss/tailwind.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
      
    <AuthContextProvider>
      {/* <RouterProvider router={router}/> */}
      <App/>
    </AuthContextProvider>
    
  </React.StrictMode>
);
