import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function useAuth(){
  const context = useContext(AuthContext)

  return context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  /*useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user')
    const storagedToken = localStorage.getItem('@App:token')

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
    }
  }, [])*/

  function Login(email, password) {
    return api.post('/auth/login', JSON.stringify({
      email,
      password
    }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    
        localStorage.setItem('@App:user', JSON.stringify(response.data.user))
        localStorage.setItem('@App:token', response.data.token)
      })
  }

  function Logout() {
    setUser(null)

    localStorage.removeItem('@App:user')
    localStorage.removeItem('@App:token')
  }

 return (
   <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
     {children}
   </AuthContext.Provider>
 );
};
