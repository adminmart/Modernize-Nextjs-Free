'use client';
import { useState, Suspense } from 'react';
import { styled, Container, Box, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

// Lazy load components
const Header = dynamic(() => import('./components/header/Header'), {
  loading: () => <Box sx={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress size={24} /></Box>
});

const Sidebar = dynamic(() => import('./components/sidebar/Sidebar'), {
  loading: () => <Box sx={{ width: '270px' }}><CircularProgress size={24} sx={{ m: 2 }} /></Box>
});

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%'
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent'
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper>
      <Suspense fallback={<Box sx={{ width: '270px' }}><CircularProgress size={24} sx={{ m: 2 }} /></Box>}>
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      </Suspense>
      <PageWrapper>
        <Suspense fallback={<Box sx={{ height: '64px' }}><CircularProgress size={24} sx={{ m: 2 }} /></Box>}>
          <Header 
            toggleMobileSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)} 
          />
        </Suspense>
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: { xs: '100%', lg: '1200px' }
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
              </Box>
            }>
              {children}
            </Suspense>
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
} 