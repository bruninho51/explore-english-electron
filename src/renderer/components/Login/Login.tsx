import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Button } from '../Button';
import { AxiosError } from 'axios';
import { Container } from './Container';
import { ContainerLogin } from './ContainerLogin';
import { TextInputStyle } from './TextInputStyle';
import { SizedBox } from './SizedBox';
import { ErrorMessage } from './ErrorMessage';
import logo from '../../images/icon.png';
import background from '../../images/background.jpg';
import spinner from '../../images/spinner.svg';

export const LoginForm = (props: { style: React.CSSProperties }): ReactElement => {
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
    <Container style={props.style}>
      <img style={{ width: '100%', height: '100%', position: 'absolute', pointerEvents: 'none' }} src={background} />
      <ContainerLogin>
        <img className="icon" style={{ width: '50%', pointerEvents: 'none', userSelect: 'none' }} src={logo} />
        <TextInputStyle type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextInputStyle type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <SizedBox height="10px" />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button size="large" block onClick={handleLogin}>Login</Button>
      </ContainerLogin>
    </Container>
  );
};

export const Spinner = (props: { loading: boolean }): ReactElement => {
  return (
    <div style={{ background: '#F1F2F3', position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: props.loading ? 'flex' : 'none', zIndex: '5' }}>
      <img src={spinner} />
    </div>
  );
};

export const Login = (): ReactElement => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  });

  return (
    <React.Fragment>
      <Spinner loading={!loaded} />
      <LoginForm style={{ visibility: loaded ? 'visible' : 'hidden' }} />
    </React.Fragment>

  );
};
