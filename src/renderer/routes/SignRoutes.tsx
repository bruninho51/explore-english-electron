import { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from '../components/Login';

export const SignRoutes = (): ReactElement => {
  return (
    <BrowserRouter>
      <Route path="/">
        <Login/>
      </Route>
    </BrowserRouter>
  );
};
