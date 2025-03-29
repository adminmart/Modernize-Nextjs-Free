'use client';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider, 
  Switch, 
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  status: 'connected' | 'disconnected' | 'error';
  features: string[];
  category: 'cms' | 'crm' | 'ads';
}

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'wordpress',
      name: 'WordPress',
      logo: '/wordpress-logo.png',
      description: 'Connect your WordPress site to track email clicks from your blog and pages.',
      connected: false,
      status: 'disconnected',
      features: ['Track email clicks from blog posts', 'Automatic tracking code insertion', 'WordPress user synchronization'],
      category: 'cms'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      logo: '/hubspot-logo.png',
      description: 'Integrate with HubSpot to sync email tracking data with your CRM.',
      connected: false,
      status: 'disconnected',
      features: ['Sync contacts', 'Track email engagement in HubSpot', 'Create workflows based on email activity'],
      category: 'crm'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      logo: '/salesforce-logo.png',
      description: 'Connect with Salesforce to enhance your sales pipeline with email tracking data.',
      connected: false,
      status: 'disconnected',
      features: ['Sync leads and contacts', 'Update opportunity data', 'Create custom Salesforce reports'],
      category: 'crm'
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      logo: '/google-ads-logo.png',
      description: 'Connect with Google Ads to track email clicks from your ad campaigns.',
      connected: false,
      status: 'disconnected',
      features: ['Track email clicks from Google Ads campaigns', 'Measure campaign ROI', 'Optimize ad spend based on email engagement'],
      category: 'ads'
    },
    {
      id: 'meta-ads',
      name: 'Meta Ads',
      logo: '/meta-ads-logo.png',
      description: 'Integrate with Meta Ads to track email clicks from Facebook and Instagram campaigns.',
      connected: false,
      status: 'disconnected',
      features: ['Track email clicks from Facebook & Instagram ads', 'Audience segmentation based on email activity', 'Retargeting campaigns'],
      category: 'ads'
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Ads',
      logo: '/linkedin-ads-logo.png',
      description: 'Connect with LinkedIn Ads to track email clicks from your professional network campaigns.',
      connected: false,
      status: 'disconnected',
      features: ['Track email clicks from LinkedIn campaigns', 'B2B audience targeting', 'Professional network engagement metrics'],
      category: 'ads'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [apiError, setApiError] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleConnectClick = (integration: Integration) => {
    setCurrentIntegration(integration);
    setApiKey('');
    setApiError('');
    setOpenDialog(true);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: false, status: 'disconnected' } 
        : integration
    ));
  };

  const handleConnect = () => {
    if (!apiKey.trim()) {
      setApiError('API Key is required');
      return;
    }

    if (!currentIntegration) return;

    // Simulate API connection
    // In a real app, you would make an API call to connect the integration
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === currentIntegration.id 
          ? { ...integration, connected: true, status: 'connected' } 
          : integration
      ));
      setOpenDialog(false);
    }, 1000);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'connected':
        return <Chip icon={<CheckCircleIcon />} label="Connected" color="success" size="small" />;
      case 'error':
        return <Chip icon={<ErrorIcon />} label="Error" color="error" size="small" />;
      default:
        return <Chip label="Disconnected" color="default" size="small" />;
    }
  };

  const filteredIntegrations = activeTab === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeTab);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Integrations
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="all" label="All Integrations" />
          <Tab value="cms" label="CMS" />
          <Tab value="crm" label="CRM" />
          <Tab value="ads" label="Advertising" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredIntegrations.map((integration) => (
          <Grid item xs={12} md={4} key={integration.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      bgcolor: 'background.default',
                      borderRadius: 1
                    }}
                  >
                    {/* Placeholder for logo - in a real app, use the actual logo */}
                    <Typography variant="h6">{integration.name.charAt(0)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">{integration.name}</Typography>
                    {getStatusChip(integration.status)}
                  </Box>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integration.connected}
                      onChange={() => integration.connected 
                        ? handleDisconnect(integration.id) 
                        : handleConnectClick(integration)
                      }
                      color="primary"
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {integration.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                  {integration.features.map((feature, index) => (
                    <Typography component="li" variant="body2" key={index}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant={integration.connected ? "outlined" : "contained"}
                  color={integration.connected ? "error" : "primary"}
                  fullWidth
                  startIcon={integration.connected ? null : <LinkIcon />}
                  onClick={() => integration.connected 
                    ? handleDisconnect(integration.id) 
                    : handleConnectClick(integration)
                  }
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Connection Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Connect to {currentIntegration?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To connect with {currentIntegration?.name}, please enter your API key. You can find this in your {currentIntegration?.name} dashboard under API settings.
          </DialogContentText>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="API Key"
            type="text"
            fullWidth
            variant="outlined"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            error={!!apiError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConnect} variant="contained" color="primary">
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 