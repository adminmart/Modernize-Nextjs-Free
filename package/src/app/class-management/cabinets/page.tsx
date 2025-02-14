'use client';
import { Grid, Card, CardContent, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockCabinets } from '@/mock/data';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Cabinets = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'warning';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="Cabinets" description="Manage classroom spaces">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h3">Cabinets</Typography>
                <Button variant="contained" color="primary">
                  Add New Cabinet
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>Equipment</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockCabinets.map((cabinet) => (
                      <TableRow key={cabinet.id}>
                        <TableCell>{cabinet.name}</TableCell>
                        <TableCell>{cabinet.location}</TableCell>
                        <TableCell>{cabinet.capacity} students</TableCell>
                        <TableCell>
                          {cabinet.equipment.map((item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={cabinet.status}
                            color={getStatusColor(cabinet.status) as any}
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

export default Cabinets;