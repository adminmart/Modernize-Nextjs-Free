"use client";
import { Box, Grid } from '@mui/material';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import InvoiceControl from '@/app/(DashboardLayout)/components/dashboard/InvoiceControl';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <InvoiceControl />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
