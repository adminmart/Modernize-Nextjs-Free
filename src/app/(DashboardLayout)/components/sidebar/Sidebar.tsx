'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Person as ProfileIcon,
  CreditCard as BillingIcon,
  Security as SecurityIcon,
  Extension as IntegrationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
  { text: 'Integrations', href: '/integrations', icon: <IntegrationsIcon /> },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />,
    subItems: [
      { text: 'Profile', href: '/settings/profile', icon: <ProfileIcon /> },
      { text: 'Billing', href: '/settings/billing', icon: <BillingIcon /> },
      { text: 'Security & Access', href: '/settings/security', icon: <SecurityIcon /> },
    ]
  },
];

interface SidebarProps {
  isSidebarOpen?: boolean;
  isMobileSidebarOpen?: boolean;
  onSidebarClose?: () => void;
}

export default function Sidebar({ isMobileSidebarOpen = false, onSidebarClose }: SidebarProps) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [openSettings, setOpenSettings] = useState(false);

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const drawer = (
    <Box sx={{ px: 2 }}>
      <List>
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                <ListItem
                  button
                  onClick={handleSettingsClick}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        component={Link}
                        href={subItem.href}
                        sx={{
                          pl: 4,
                          color: 'rgba(0, 0, 0, 0.87)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                component={Link}
                href={item.href}
                sx={{
                  color: 'rgba(0, 0, 0, 0.87)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 },
      }}
    >
      {lgUp ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: '#ffffff',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isMobileSidebarOpen}
          onClose={onSidebarClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
} 