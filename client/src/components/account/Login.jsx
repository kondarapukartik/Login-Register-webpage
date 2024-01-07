/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)({
  width: 400,
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: 8,
  overflow: 'hidden',
});

const Image = styled('img')({
  width: '100%',
  display: 'block',
});

const FormWrapper = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const StyledTextField = styled(TextField)({
  width: '100%',
});

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
}));

const ErrorText = styled(Typography)({
  fontSize: 12,
  color: 'red',
  marginTop: '8px',
});

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [signup, setSignup] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [account, setAccount] = useState('login');

  const navigate = useNavigate();
  const theme = useTheme();

  const imageURL = 'https://img.freepik.com/premium-photo/3d-word-blog-white-background-3d-rendering_519469-7001.jpg';

  useEffect(() => {
    setError('');
  }, [login, signup]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const response = await API.userLogin(login);
      if (response.isSuccess) {
        setError('');
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ name: response.data.name, username: response.data.username });
        isUserAuthenticated(true);
        setLogin({ username: '', password: '' });
        navigate('/');
      } else {
        setError('Something went wrong! Please try again later');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
    }
  };

  const signupUser = async () => {
    try {
      const response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError('');
        setSignup({ name: '', username: '', password: '' });
        setAccount('login');
      } else {
        setError('Something went wrong! Please try again later');
      }
    } catch (error) {
      console.error('Error while signing up:', error);
    }
  };

  const toggleSignup = () => {
    setAccount(account === 'signup' ? 'login' : 'signup');
  };

  return (
    <Container>
      <Image src={imageURL} alt="blog" />
      <FormWrapper>
        {account === 'login' ? (
          <>
            <StyledTextField
              variant="outlined"
              label="Enter Username"
              value={login.username}
              onChange={onValueChange}
              name="username"
            />
            <StyledTextField
              variant="outlined"
              label="Enter Password"
              value={login.password}
              onChange={onValueChange}
              name="password"
              type="password"
            />
            {error && <ErrorText>{error}</ErrorText>}
            <ActionButton variant="contained" onClick={loginUser}>
              Login
            </ActionButton>
            <Typography align="center">OR</Typography>
            <ActionButton onClick={toggleSignup}>Create an account</ActionButton>
          </>
        ) : (
          <>
            <StyledTextField
              variant="outlined"
              label="Enter Name"
              value={signup.name}
              onChange={onInputChange}
              name="name"
            />
            <StyledTextField
              variant="outlined"
              label="Enter Username"
              value={signup.username}
              onChange={onInputChange}
              name="username"
            />
            <StyledTextField
              variant="outlined"
              label="Enter Password"
              value={signup.password}
              onChange={onInputChange}
              name="password"
              type="password"
            />
            <ActionButton onClick={signupUser}>Signup</ActionButton>
            <Typography align="center">OR</Typography>
            <ActionButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </ActionButton>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};

export default Login;
