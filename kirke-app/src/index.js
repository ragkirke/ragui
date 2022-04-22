import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import axios from './api/axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>   
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Added http interceptor

axios.interceptors.response.use(response=>{
  //add logic here on the coming response
  console.log("after response !!!")
  return response;
}, error=>{
  //add error specific logic
  return Promise.reject(error);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
