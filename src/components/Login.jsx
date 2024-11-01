// Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";




const LoginContainer = styled(Container)({
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
  backgroundColor: '#0070f3',
  borderRadius: '50%',
  width: 60,
  height: 60,
  marginBottom: '1rem',
  color: 'white',
});

const LoginForm = styled('form')({
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Bottom_Button = styled('div')({
  display: 'flex',
  justifyContent:'space-between'
})



function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isFetching, error} = useSelector((state) => state.user);

  const handleClick =(e)=>{
    e.preventDefault()
  
    // login(dispatch, {username,password})
  }


  return (
    <LoginContainer maxWidth="xs">
      <IconWrapper>
        <LockIcon fontSize="large" />
      </IconWrapper>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <LoginForm>
        <TextField
          label="username"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick} disabled={isFetching}
        >
          Sign In
        </Button>
        <Bottom_Button>
        
      <Typography  style={{cursor:'pointer', color:'',}}><Link to="/signup"> create new Account Sign Up</Link></Typography>
     
      <Typography variant='a' style={{cursor:'pointer', color:'blue',}}> Forgot Password</Typography>
      </Bottom_Button>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
