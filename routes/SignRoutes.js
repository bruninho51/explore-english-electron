import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from '../widgets/Login'

export const SignRoutes = () => {
 return (
   <BrowserRouter>
     <Route path="/" component={Login} />
   </BrowserRouter>
 );
};
