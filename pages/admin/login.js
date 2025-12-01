import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Avatar,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      // Store admin token
      localStorage.setItem('adminToken', 'admin-token-' + Date.now());
      localStorage.setItem('adminEmail', email);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              Admin Panel
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
              Secure Login - Please enter your credentials
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
              <TextField
              size='small'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />

              <TextField
              size='small'
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>

              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  borderLeft: '4px solid #667eea',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  📝 Demo Credentials:
                </Typography>
                <Typography variant="caption">
                  Email: <strong>admin@example.com</strong>
                </Typography>
                <br />
                <Typography variant="caption">
                  Password: <strong>admin123</strong>
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AdminLogin;