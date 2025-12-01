import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  const onLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const onRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || json.message || 'Login failed');

      if (json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('userEmail', json.data?.email || loginData.email);
      }

      setSuccess(json.message || 'Login successful');
      setTimeout(() => {
        if (loginData.email === 'admin@example.com') router.push('/admin/dashboard');
        else router.push('/');
      }, 600);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || json.message || 'Registration failed');

      setSuccess(json.message || 'Registered successfully');
      setTimeout(() => {
        setMode('login');
        setLoginData({ email: registerData.email, password: '' });
      }, 800);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }} elevation={3}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
              </Typography>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {mode === 'login' ? (
              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={onLoginChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={onLoginChange}
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button variant="outlined" onClick={() => setMode('register')}>
                    Create Account
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleRegister}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={onRegisterChange}
                  />
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={onRegisterChange}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={onRegisterChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={onRegisterChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone (optional)"
                  name="phone"
                  value={registerData.phone}
                  onChange={onRegisterChange}
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                  </Button>
                  <Button variant="outlined" onClick={() => setMode('login')}>
                    Already have an account
                  </Button>
                </Stack>
              </Box>
            )}

            <Typography variant="caption" display="block" sx={{ mt: 3, color: 'text.secondary' }}>
              By continuing you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;