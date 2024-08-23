import React, { useState } from 'react';
import { styled } from '../stitches.config';
import { loginUser, createUser } from '../src/components/utils/utils';

let ipcRenderer;
if (typeof window !== 'undefined') {
    ipcRenderer = window.require('electron').ipcRenderer;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#09090A',
});

const Box = styled('div', {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '400px',
  textAlign: 'center',
});

const Title = styled('h2', {
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
});

const Input = styled('input', {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: '#000',
  fontSize: '16px',
});

const Button = styled('button', {
  width: '100%',
  padding: '10px',
  backgroundColor: '#1A73E8',
  color: 'white',
  borderRadius: '5px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '20px',

  '&:hover': {
    backgroundColor: '#155AB5',
  },
});

const ErrorMessage = styled('div', {
  color: 'red',
  marginTop: '10px',
});

export default function AuthScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false); 

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setError('Username e Password são obrigatórios');
      return;
    }

    try {
      const response = await loginUser(username, password); // Chama a função de login
      localStorage.setItem('token', response.access_token); // Armazena o token JWT no localStorage
      ipcRenderer.send('load-main'); // Agora, pode-se carregar a interface principal
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  const handleCreateUser = async () => {
    if (username === '' || password === '') {
      setError('Nome e Password são obrigatórios');
      return;
    }
  
    try {
      const matricula = Math.floor(Math.random() * 1000000000); // Exemplo para gerar uma matrícula aleatória
      const response = await createUser(username, matricula, password);
  
      if (response && response.id_usuario) {
        alert('Usuário criado com sucesso!');
        setIsCreatingUser(false); // Volta para a tela de login
      } else {
        setError('Falha na criação do usuário. Resposta inesperada do servidor.');
      }
    } catch (error) {
      console.error('Erro durante a criação do usuário:', error);
      setError('Falha na criação do usuário. Por favor, tente novamente mais tarde.');
    }
  };
  

  return (
    <Container>
      <Box>
        <Title>{isCreatingUser ? 'Criar Usuário' : 'Login'}</Title>
        <Input
          type="text"
          placeholder={isCreatingUser ? "Nome" : "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isCreatingUser ? (
          <Button onClick={handleCreateUser}>Criar Usuário</Button>
        ) : (
          <Button onClick={handleLogin}>Entrar</Button>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={() => setIsCreatingUser(!isCreatingUser)}>
          {isCreatingUser ? 'Voltar para Login' : 'Criar uma conta'}
        </Button>
      </Box>
    </Container>
  );
}
