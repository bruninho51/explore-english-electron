import React, { useState } from 'react';
import { useAuth } from '../contexts/auth';
import styled from 'styled-components'
import { Button } from './Button';

export const Container = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  height: 95vmin;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding:  5px 5px 5px 5px;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ContainerLogin = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextInputStyle = styled.input`
    box-sizing: border-box;
    border-color: transparent;
    border: 1px solid black;
    font-family: Roboto sans-serif;
    height: 30px;
    border-radius: 10px;
    width: 100%;
    padding: 0px 20px 0px 20px;
    text-align: center;
    margin-bottom: 5px;
    &:focus {
        outline: none;
        border-radius: 10px;
    }
`

const ErrorMessage = styled.span`
    color: red;
`

const SizedBox = styled.div`
  height: ${props => props.height};
  width: 100%;
`

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const context = useAuth()

 function handleLogin() {
   
  context.Login(email, password)
    .catch(error => {
      if (!error.response) {
        setErrorMessage('unavailable server. Check your connection.')
        return
      }

      if (error.response.status === 400) {
        setErrorMessage('username or password is invalid.')
        return
      }
    })
 }

 return (
   <Container>
     <ContainerLogin>
       <img class="icon" style={{width: '50%'}} src="../assets/icon.png" />
       <TextInputStyle type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
       <TextInputStyle type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
       <SizedBox height="10px" />
       <ErrorMessage>{errorMessage}</ErrorMessage>
       <Button size="large" block onClick={handleLogin}>Login</Button>
     </ContainerLogin> 
   </Container>
 );
};
