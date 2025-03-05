'use client';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        {!lgUp && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div">
            Email Tracking Analytics
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Add Tracking Code
          </Button>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <Avatar
            sx={{
              width: 35,
              height: 35,
              cursor: 'pointer',
            }}
            alt="User"
            src="/user-avatar.png"
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
} 