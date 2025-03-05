'use client';
import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
import { useDataFetching } from '@/hooks/useDataFetching';

// Example function to fetch data
const fetchEmailStats = async () => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return {
    totalEmails: 1245,
    openRate: 32.5,
    clickRate: 12.8,
    bounceRate: 2.1,
    lastUpdated: new Date().toISOString()
  };
};

export default function ExampleDataComponent() {
  const { 
    data: emailStats, 
    loading, 
    error, 
    refetch, 
    clearCache 
  } = useDataFetching(fetchEmailStats, {
    cacheKey: 'email-stats',
    cacheExpiration: 60 * 1000, // 1 minute cache
  });

  // Log when data changes
  useEffect(() => {
    if (emailStats) {
      console.log('Email stats updated:', emailStats);
    }
  }, [emailStats]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Email Performance Stats
      </Typography>
      
      {loading && <CircularProgress size={24} sx={{ my: 2 }} />}
      
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          Error loading data: {error.message}
        </Alert>
      )}
      
      {emailStats && !loading && (
        <Box sx={{ my: 2 }}>
          <Typography variant="body1">
            Total Emails: <strong>{emailStats.totalEmails}</strong>
          </Typography>
          <Typography variant="body1">
            Open Rate: <strong>{emailStats.openRate}%</strong>
          </Typography>
          <Typography variant="body1">
            Click Rate: <strong>{emailStats.clickRate}%</strong>
          </Typography>
          <Typography variant="body1">
            Bounce Rate: <strong>{emailStats.bounceRate}%</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date(emailStats.lastUpdated).toLocaleString()}
          </Typography>
        </Box>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => refetch(true)} 
          disabled={loading}
        >
          Refresh Data
        </Button>
        <Button 
          variant="text" 
          size="small" 
          onClick={clearCache} 
          disabled={loading}
        >
          Clear Cache
        </Button>
      </Box>
    </Box>
  );
} 