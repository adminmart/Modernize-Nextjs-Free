'use client';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Divider, 
  Card, 
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Alert
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface BillingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    name: 'John Doe',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States'
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleCancelSubscription = () => {
    // Here you would handle subscription cancellation
    console.log('Subscription cancellation requested');
    // Show confirmation dialog, etc.
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Billing Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Current Plan */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Current Plan
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Pro Plan
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      $49<Typography variant="caption" sx={{ fontSize: '1rem' }}>/month</Typography>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">Unlimited email tracking</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">Advanced analytics</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">Priority support</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">Custom domain</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Your subscription renews on <strong>April 15, 2024</strong>
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      You will be billed $49.00 on the renewal date.
                    </Alert>
                  </Box>
                  <Box>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={handleCancelSubscription}
                      sx={{ mt: 2 }}
                    >
                      Cancel Subscription
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <FormControl component="fieldset">
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel 
                  value="credit_card" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCardIcon sx={{ mr: 1 }} />
                      <Typography>Credit Card</Typography>
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="paypal" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PaymentIcon sx={{ mr: 1 }} />
                      <Typography>PayPal</Typography>
                    </Box>
                  } 
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'credit_card' && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      placeholder="**** **** **** 1234"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVC"
                      placeholder="123"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 3 }}
              startIcon={<CreditCardIcon />}
            >
              Update Payment Method
            </Button>
          </Paper>
        </Grid>

        {/* Billing Address */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Billing Address
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={billingAddress.name}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={billingAddress.address}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  name="state"
                  value={billingAddress.state}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  name="zip"
                  value={billingAddress.zip}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={billingAddress.country}
                  onChange={handleAddressChange}
                />
              </Grid>
            </Grid>

            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 3 }}
            >
              Update Billing Address
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 