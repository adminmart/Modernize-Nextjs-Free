'use client';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockStudents } from '@/mock/data';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Students = () => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="Students" description="Manage students">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h3">Students</Typography>
                <Button variant="contained" color="primary">
                  Add New Student
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 35,
                                height: 35,
                                mr: 2,
                                background: 'primary.main',
                              }}
                            >
                              {student.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {student.name}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                {student.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={student.status}
                            color={getStatusColor(student.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={student.paymentStatus}
                            color={getPaymentStatusColor(student.paymentStatus) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton color="error" size="small">
                            <IconTrash size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Students;