'use client';
import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Snackbar, Alert, Select, MenuItem, styled, SelectChangeEvent } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockCabinets, mockClasses, mockTeachers, Cabinet } from '@/mock/data';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import CabinetDialog from './CabinetDialog';

// Styled components for uniform grid
const StyledTableCell = styled(TableCell)({
  width: '150px',
  padding: '8px',
  textAlign: 'center',
  '&.time-cell': {
    width: '80px',
  },
  '&.mwf': {
    backgroundColor: '#f5f5f5',
  },
  '&.tts': {
    backgroundColor: '#e8f4fd',
  },
});

const StyledSelect = styled(Select<string>)({
  width: '100%',
  '& .MuiSelect-select': {
    padding: '8px',
  },
});

type ScheduleType = 'MWF' | 'TTS';

const Cabinets = () => {
  const [cabinets, setCabinets] = useState<Cabinet[]>(mockCabinets);
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<{[key: string]: { MWF: string; TTS: string }}>({});
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

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

  // Generate time slots from 9:00 to 20:00
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleCreateCabinet = () => {
    setSelectedCabinet(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleEditCabinet = (cabinet: Cabinet) => {
    setSelectedCabinet(cabinet);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleDeleteCabinet = (cabinetId: string) => {
    const isInUse = mockClasses.some(cls => cls.cabinetId === cabinetId);
    if (isInUse) {
      setNotification({
        open: true,
        message: 'Cannot delete cabinet that is in use by classes',
        severity: 'error',
      });
      return;
    }

    const newCabinets = cabinets.filter(cab => cab.id !== cabinetId);
    setCabinets(newCabinets);
    setNotification({
      open: true,
      message: 'Cabinet deleted successfully',
      severity: 'success',
    });
  };

  const handleSaveCabinet = (cabinetData: Partial<Cabinet>) => {
    try {
      if (dialogMode === 'create') {
        const newCabinet = cabinetData as Cabinet;
        setCabinets([...cabinets, newCabinet]);
        setNotification({
          open: true,
          message: 'Cabinet created successfully',
          severity: 'success',
        });
      } else {
        const updatedCabinets = cabinets.map(cab =>
          cab.id === cabinetData.id ? { ...cab, ...cabinetData } : cab
        );
        setCabinets(updatedCabinets);
        setNotification({
          open: true,
          message: 'Cabinet updated successfully',
          severity: 'success',
        });
      }
      setDialogOpen(false);
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred while saving the cabinet',
        severity: 'error',
      });
    }
  };

  const handleScheduleChange = (time: string, cabinetId: string, scheduleType: ScheduleType, event: SelectChangeEvent<string>) => {
    const key = `${time}-${cabinetId}`;
    setScheduleData(prev => ({
      ...prev,
      [key]: {
        ...prev[key] || { MWF: '', TTS: '' },
        [scheduleType]: event.target.value
      }
    }));
  };

  const getTeacherForSlot = (time: string, cabinetId: string, scheduleType: ScheduleType) => {
    const key = `${time}-${cabinetId}`;
    return scheduleData[key]?.[scheduleType] || '';
  };

  return (
    <PageContainer title="Cabinets" description="Manage classroom spaces">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h3">Cabinets</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateCabinet}>
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
                    {cabinets.map((cabinet) => (
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
                          <IconButton 
                            color="primary" 
                            size="small" 
                            sx={{ mr: 1 }}
                            onClick={() => handleEditCabinet(cabinet)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleDeleteCabinet(cabinet.id)}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Schedule Grid */}
              <Box mt={4} sx={{ overflowX: 'auto' }}>
                <Typography variant="h4" mb={2}>Schedule</Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 'max-content' }}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className="time-cell">Time</StyledTableCell>
                        {cabinets.map((cabinet) => (
                          <>
                            <StyledTableCell key={`${cabinet.id}-mwf`} className="mwf">
                              {cabinet.name} (M/W/F)
                            </StyledTableCell>
                            <StyledTableCell key={`${cabinet.id}-tts`} className="tts">
                              {cabinet.name} (T/T/S)
                            </StyledTableCell>
                          </>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timeSlots.map((time) => (
                        <TableRow key={time} sx={{ height: '52px' }}>
                          <StyledTableCell className="time-cell">{time}</StyledTableCell>
                          {cabinets.map((cabinet) => (
                            <>
                              <StyledTableCell key={`${time}-${cabinet.id}-mwf`} className="mwf">
                                <StyledSelect
                                  value={getTeacherForSlot(time, cabinet.id, 'MWF')}
                                  onChange={(e: SelectChangeEvent<string>) => 
                                    handleScheduleChange(time, cabinet.id, 'MWF', e)
                                  }
                                  size="small"
                                  displayEmpty
                                >
                                  <MenuItem value="">empty</MenuItem>
                                  {mockTeachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.name}>
                                      {teacher.name}
                                    </MenuItem>
                                  ))}
                                </StyledSelect>
                              </StyledTableCell>
                              <StyledTableCell key={`${time}-${cabinet.id}-tts`} className="tts">
                                <StyledSelect
                                  value={getTeacherForSlot(time, cabinet.id, 'TTS')}
                                  onChange={(e: SelectChangeEvent<string>) => 
                                    handleScheduleChange(time, cabinet.id, 'TTS', e)
                                  }
                                  size="small"
                                  displayEmpty
                                >
                                  <MenuItem value="">empty</MenuItem>
                                  {mockTeachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.name}>
                                      {teacher.name}
                                    </MenuItem>
                                  ))}
                                </StyledSelect>
                              </StyledTableCell>
                            </>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CabinetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveCabinet}
        onDelete={selectedCabinet ? () => handleDeleteCabinet(selectedCabinet.id) : undefined}
        cabinetData={selectedCabinet || undefined}
        mode={dialogMode}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Cabinets;