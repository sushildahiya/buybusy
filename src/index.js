import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CustomAuthContext from './context/authContext';
import CustomProductContext from './context/productContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <CustomAuthContext>
          <CustomProductContext>
          <App />
          </CustomProductContext>
        
        </CustomAuthContext>
   
  </React.StrictMode>
);

