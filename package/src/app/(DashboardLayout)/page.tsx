'use client'
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockStudents, mockTeachers, mockClasses, mockCabinets, mockPayments } from '@/mock/data';

// Stats Card Component
const StatsCard = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
  <Card sx={{ p: 3 }}>
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
    </Stack>
  </Card>
);

// Class Levels Component
const ClassLevels = () => {
  const levels = mockClasses.reduce((acc, cls) => {
    acc[cls.level] = (acc[cls.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>Class Distribution</Typography>
      <Stack spacing={2}>
        {Object.entries(levels).map(([level, count]) => (
          <Box key={level} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">{level}</Typography>
            <Typography variant="h6" color="primary">{count} classes</Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

// Recent Payments Component
const RecentPayments = () => (
  <Card sx={{ p: 3 }}>
    <Typography variant="h6" mb={2}>Recent Payments</Typography>
    <Stack spacing={2}>
      {mockPayments.map(payment => {
        const student = mockStudents.find(s => s.id === payment.studentId);
        return (
          <Box key={payment.id} display="flex" justifyContent="space-between" alignItems="center">
            <Stack>
              <Typography variant="subtitle2">{student?.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {payment.date}
              </Typography>
            </Stack>
            <Typography 
              variant="subtitle1" 
              color={payment.status === 'completed' ? 'success.main' : 'warning.main'}
            >
              ${payment.amount.toLocaleString()}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  </Card>
);

// Cabinet Status Component
const CabinetStatus = () => (
  <Card sx={{ p: 3 }}>
    <Typography variant="h6" mb={2}>Cabinet Status</Typography>
    <Stack spacing={2}>
      {mockCabinets.map(cabinet => (
        <Box key={cabinet.id} display="flex" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="subtitle2">{cabinet.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              Capacity: {cabinet.capacity}
            </Typography>
          </Stack>
          <Typography 
            variant="subtitle2" 
            sx={{
              color: cabinet.status === 'available' 
                ? 'success.main' 
                : cabinet.status === 'occupied' 
                ? 'warning.main' 
                : 'error.main'
            }}
          >
            {cabinet.status.charAt(0).toUpperCase() + cabinet.status.slice(1)}
          </Typography>
        </Box>
      ))}
    </Stack>
  </Card>
);

const Dashboard = () => {
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const activeTeachers = mockTeachers.filter(t => t.status === 'active').length;
  const totalClasses = mockClasses.length;

  return (
    <PageContainer title="Dashboard" description="Centre Overview">
      <Box>
        <Grid container spacing={3}>
          {/* Stats Overview */}
          <Grid item xs={12} sm={4}>
            <StatsCard 
              title="Active Students" 
              value={activeStudents}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard 
              title="Active Teachers" 
              value={activeTeachers}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard 
              title="Total Classes" 
              value={totalClasses}
              color="warning.main"
            />
          </Grid>

          {/* Class Levels */}
          <Grid item xs={12} md={6}>
            <ClassLevels />
          </Grid>

          {/* Recent Payments */}
          <Grid item xs={12} md={6}>
            <RecentPayments />
          </Grid>

          {/* Cabinet Status */}
          <Grid item xs={12}>
            <CabinetStatus />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
