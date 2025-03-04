'use client';
import { Box, Typography, Grid, Paper, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const salesData = {
    series: [{
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line' as const,
        zoom: { enabled: false }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  };

  const monthlyData = {
    series: [76, 24],
    options: {
      chart: { type: 'donut' as const },
      labels: ['Completed', 'Pending'],
      colors: ['#1976d2', '#e0e0e0']
    }
  };

  const recentTransactions = [
    { time: '09:30 am', description: 'Email sent to John Doe', status: 'Sent', id: '#ML-3467' },
    { time: '10:00 am', description: 'Response received from client', status: 'Received', id: '#ML-3468' },
    { time: '12:00 pm', description: 'Meeting scheduled with team', status: 'Scheduled', id: '#ML-3469' },
    { time: '02:30 pm', description: 'Follow-up email drafted', status: 'Draft', id: '#ML-3470' }
  ];

  const productPerformance = [
    { id: 1, name: 'Marketing Emails', priority: 'High', responses: '85%', status: 'Active' },
    { id: 2, name: 'Newsletter', priority: 'Medium', responses: '72%', status: 'Pending' },
    { id: 3, name: 'Support Tickets', priority: 'Low', responses: '95%', status: 'Completed' },
    { id: 4, name: 'Customer Surveys', priority: 'Critical', responses: '68%', status: 'Active' }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Sales Overview */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Sales Overview</Typography>
            <Chart
              options={salesData.options}
              series={salesData.series}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Monthly Earnings */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Monthly Earnings</Typography>
            <Chart
              options={monthlyData.options}
              series={monthlyData.series}
              type="donut"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Recent Transactions</Typography>
            <Stack spacing={2}>
              {recentTransactions.map((transaction) => (
                <Box key={transaction.id} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">{transaction.time}</Typography>
                      <Typography>{transaction.description}</Typography>
                      <Typography variant="caption" color="textSecondary">{transaction.id}</Typography>
                    </Box>
                    <Chip label={transaction.status} color="primary" size="small" />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Product Performance */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Email Performance</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Response Rate</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productPerformance.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={product.priority} 
                        color={
                          product.priority === 'High' ? 'error' :
                          product.priority === 'Medium' ? 'warning' :
                          product.priority === 'Critical' ? 'error' : 'success'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{product.responses}</TableCell>
                    <TableCell>{product.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}