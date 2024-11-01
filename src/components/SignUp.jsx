// SignUp.js
import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

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
  return (
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
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign Up
        </Button>
      </SignUpForm>
    <Typography> <Link to="/login"><div> Already Created Account</div></Link></Typography>
     
    </SignUpContainer>
  );
}

export default SignUp;
