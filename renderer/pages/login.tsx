import React, { useState } from 'react';
import { styled } from '../stitches.config';
import { loginUser, createUser } from '../src/components/utils/utils';

let ipcRenderer;
if (typeof window !== 'undefined') {
    ipcRenderer = window.require('electron').ipcRenderer;
}

const LoginContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#09090A',
});

const LoginBox = styled('div', {
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
  color: '#000',
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

export default function Login() {
  const [username, setUsername] = useState('');
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = async () => {
    if (username === '' || matricula === '' || password === '') {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      const matriculaInt = parseInt(matricula, 10);  // Converte matricula para número
      await createUser(username, matriculaInt, password);
      alert('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro durante a criação do usuário:', error);
      setError('Falha na criação do usuário.');
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Criar Usuário</Title>
        <Input
          type="text"
          placeholder="Nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleCreateUser}>Criar Usuário</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginBox>
    </LoginContainer>
  );
}
