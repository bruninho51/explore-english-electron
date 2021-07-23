import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../widgets/App';

export const AppRoutes = () => {
 return (
   <BrowserRouter>
     <Route path="/" component={App} />
   </BrowserRouter>
 );
};
