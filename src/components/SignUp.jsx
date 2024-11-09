import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/auth.js';


function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth />
        <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <Typography>
        <Link to="/login">Already have an account? Login</Link>
      </Typography>
    </Container>
  );
}

export default SignUp;
