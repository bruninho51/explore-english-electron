import { ReactElement, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Button } from '../Button';
import { AxiosError } from 'axios';
import { Container } from './Container';
import { ContainerLogin } from './ContainerLogin';
import { TextInputStyle } from './TextInputStyle';
import { SizedBox } from './SizedBox';
import { ErrorMessage } from './ErrorMessage';
import logo from '../../images/icon.png';

export const Login = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const context = useAuth();

  function handleLogin (): void {
    context.Login(email, password)
      .catch((error: AxiosError) => {
        if (!error.response) {
          setErrorMessage('unavailable server. Check your connection.');
          return;
        }

        if (error.response.status === 400) {
          setErrorMessage('username or password is invalid.');
        }
      });
  }

  return (
    <Container>
      <ContainerLogin>
        <img className="icon" style={{ width: '50%' }} src={logo} />
        <TextInputStyle type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextInputStyle type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <SizedBox height="10px" />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button size="large" block onClick={handleLogin}>Login</Button>
      </ContainerLogin>
    </Container>
  );
};
