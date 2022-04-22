import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import SignIn from '../Login/LoginPage';
import SignUp from '../Register/SignUp';
import Dashboard  from '../Dashboard/Dashboard';
import  Error  from '../Error/Error';
import { AuthProvider } from '../../context/AuthProvider';
import RegisterSuccess from '../RegisterSuccess/RegisterSuccess';

function Routing() {
  return (
    <>
       <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/landing" element={<Dashboard />} />
          <Route exact path="/error" element={<Error />} />
          <Route exact path="/regsuccess" element={<RegisterSuccess />} />
          </Routes>
        </AuthProvider>
       
     
    </>
  );
}

export default Routing;