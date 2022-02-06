import { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from '../components/App';

export const AppRoutes = (): ReactElement => {
  return (
    <BrowserRouter>
      <Route path="/">
        <App />
      </Route>
    </BrowserRouter>
  );
};
