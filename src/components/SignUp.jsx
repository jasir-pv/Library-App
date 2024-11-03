// SignUp.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { signup } from '../actions/auth';
import { useDispatch } from 'react-redux';

const SignUpContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4caf50',
  borderRadius: '50%',
  width: 60,
  height: 60,
  marginBottom: '1rem',
  color: 'white',
});

const SignUpForm = styled('form')({
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

function SignUp() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    signup(dispatch, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <>
    <SignUpContainer maxWidth="xs">
      <IconWrapper>
        <PersonAddIcon fontSize="large" />
      </IconWrapper>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <SignUpForm>
        <TextField
          label="username"
          name="username"
          variant="outlined"
          value={formData.username} 
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Email Address"
           name="email"
           value={formData.email}        
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
            name="password"
            value={formData.password} 
          variant="outlined"
          type="password"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
           name="confirmPassword"
           value={formData.confirmPassword}
          variant="outlined"
          type="password"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </SignUpForm>
    <Typography> <Link to="/login"> Already Created Account</Link></Typography>
     
    </SignUpContainer>
    </>
  );
}

export default SignUp;
