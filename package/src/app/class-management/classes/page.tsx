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
  IconButton,
  Chip,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockClasses, mockCabinets } from '@/mock/data';
import { IconEdit, IconTrash, IconCalendar } from '@tabler/icons-react';

const Classes = () => {
  const getCabinetName = (cabinetId: string) => {
    const cabinet = mockCabinets.find(c => c.id === cabinetId);
    return cabinet ? cabinet.name : 'Not assigned';
  };

  const formatSchedule = (schedule: { day: string; startTime: string; endTime: string }[]) => {
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ');
  };

  return (
    <PageContainer title="Classes" description="Manage classes">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h3">Classes</Typography>
                <Button variant="contained" color="primary">
                  Add New Class
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class Name</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Cabinet</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockClasses.map((class_) => (
                      <TableRow key={class_.id}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {class_.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{class_.teacher}</TableCell>
                        <TableCell>
                          <Chip
                            label={class_.subject}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getCabinetName(class_.cabinetId)}
                            size="small"
                            color="secondary"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconCalendar size={16} style={{ marginRight: '8px' }} />
                            <Typography variant="body2">
                              {formatSchedule(class_.schedule)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${class_.students.length} students`}
                            size="small"
                            color="info"
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

export default Classes;