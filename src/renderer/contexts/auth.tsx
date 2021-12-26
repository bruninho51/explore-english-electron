import React, { createContext, useState, useContext, ReactElement } from 'react';
import { Login } from '../../domain/models/login';
import api from '../../services/api';

const AuthContext = createContext({});

export function useAuth (): any {
  const context = useContext(AuthContext);

  return context;
}

export const AuthProvider = ({ children }: { children: any }): ReactElement => {
  const [user, setUser] = useState(null);

  /* useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user')
    const storagedToken = localStorage.getItem('@App:token')

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
    }
  }, []) */

  async function Login (email: string, password: string): Promise<void> {
    await api.post<Login>('/auth/login', JSON.stringify({
      email,
      password
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setUser(response.data.user);
        api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@App:user', JSON.stringify(response.data.user));
        localStorage.setItem('@App:token', response.data.token);
      });
  }

  function Logout (): void {
    setUser(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
