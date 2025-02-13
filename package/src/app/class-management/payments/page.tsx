"use client";
import { Grid, Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const PaymentsPage = () => {
  // Sample data - will be replaced with real data later
  const paymentStats = [
    { label: "Total Payments", value: "0", color: "primary" },
    { label: "Paid", value: "0", color: "success" },
    { label: "Pending", value: "0", color: "warning" },
    { label: "Overdue", value: "0", color: "error" },
  ];

  return (
    <PageContainer title="Payments" description="Payment management">
      <Box>
        <Grid container spacing={3}>
          {/* Payment Statistics */}
          {paymentStats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card>
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        mb={1}
                      >
                        {stat.label}
                      </Typography>
                      <Typography variant="h4">{stat.value}</Typography>
                    </Box>
                    <Chip
                      label={stat.label}
                      color={stat.color as "primary" | "success" | "warning" | "error"}
                      size="small"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Payment History */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h3" mb={3}>
                  Payment History
                </Typography>
                <Typography color="textSecondary">
                  Payment history will be displayed here. We will add:
                  <ul>
                    <li>Payment records table</li>
                    <li>Payment status tracking</li>
                    <li>Payment processing functionality</li>
                    <li>Payment reports and analytics</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default PaymentsPage;