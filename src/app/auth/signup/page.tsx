'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

const steps = ['Account Details', 'Company Information', 'Confirmation'];

export default function SignupPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [formData, setFormData] = useState({
    // Account details
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Company information
    companyName: '',
    website: '',
    industry: '',
    // Terms
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      // Validate account details
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setSignupError('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setSignupError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setSignupError('Password must be at least 8 characters long');
        return;
      }
    } else if (activeStep === 1) {
      // Validate company information
      if (!formData.companyName || !formData.website) {
        setSignupError('Please fill in all required fields');
        return;
      }
    }

    setSignupError('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation
    if (!formData.agreeToTerms) {
      setSignupError('You must agree to the terms and conditions');
      return;
    }

    // Clear any previous errors
    setSignupError('');

    // In a real app, you would register the user with your backend here
    console.log('Signup attempt with:', formData);
    
    // Simulate successful registration
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="website"
                  label="Website"
                  name="website"
                  placeholder="www.example.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="industry"
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Review Your Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">First Name</Typography>
                  <Typography variant="body1" gutterBottom>{formData.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Last Name</Typography>
                  <Typography variant="body1" gutterBottom>{formData.lastName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1" gutterBottom>{formData.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Company</Typography>
                  <Typography variant="body1" gutterBottom>{formData.companyName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Website</Typography>
                  <Typography variant="body1" gutterBottom>{formData.website}</Typography>
                </Grid>
                {formData.industry && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Industry</Typography>
                    <Typography variant="body1" gutterBottom>{formData.industry}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  color="primary"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link href="/terms" style={{ textDecoration: 'none' }}>
                    <Typography component="span" variant="body2" color="primary">
                      Terms of Service
                    </Typography>
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" style={{ textDecoration: 'none' }}>
                    <Typography component="span" variant="body2" color="primary">
                      Privacy Policy
                    </Typography>
                  </Link>
                </Typography>
              }
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Account
              </Button>
            </Box>
          </>
        );
      default:
        return 'Unknown step';
    }
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
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Create an Account
        </Typography>

        <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {signupError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {signupError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ py: 1.2 }}
              >
                Sign up with Google
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{ py: 1.2 }}
              >
                Sign up with GitHub
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
} 