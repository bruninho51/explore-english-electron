import React from 'react';
import { SignRoutes } from './SignRoutes';
import { AppRoutes } from './AppRoutes';
import { useAuth } from '../contexts/auth';

export const Routes = () => {
 const { signed } = useAuth()
 return signed ? <AppRoutes /> : <SignRoutes />;
};
