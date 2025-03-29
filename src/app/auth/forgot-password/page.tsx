'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear any previous errors
    setError('');

    // In a real app, you would send a password reset email here
    console.log('Password reset requested for:', email);
    
    // Simulate successful submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <EmailIcon sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
          <Typography component="h1" variant="h4">
            Email Tracking Analytics
          </Typography>
        </Box>
        
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Reset Password
        </Typography>

        {!submitted ? (
          <>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.2 }}
              >
                Send Reset Link
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Back to Sign In
                  </Typography>
                </Link>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Check Your Email
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We've sent a password reset link to:
            </Typography>
            <Typography variant="body1" fontWeight="bold" paragraph>
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              If you don't see the email, check your spam folder or make sure you entered the correct email address.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Button variant="outlined">
                  Back to Sign In
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
} 