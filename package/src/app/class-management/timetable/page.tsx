'use client';
import { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockClasses, mockCabinets, Class } from '@/mock/data';
import EditIcon from '@mui/icons-material/Edit';

const LEVELS = ['All Levels', 'A1', 'A2', 'B1', 'B2', 'IELTS'];

const Timetable = () => {
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00-10:30',
    '10:45-12:15',
    '13:00-14:30',
    '14:45-16:15',
    '16:30-18:00',
  ];

  const getCabinetInfo = (cabinetId: string) => {
    const cabinet = mockCabinets.find((c) => c.id === cabinetId);
    return {
      name: cabinet ? cabinet.name : 'Not assigned',
      capacity: cabinet ? cabinet.capacity : 0,
    };
  };

  const getClassStatus = (class_: Class) => {
    const cabinet = getCabinetInfo(class_.cabinetId);
    const studentCount = class_.students.length;
    const remainingSpots = cabinet.capacity - studentCount;

    if (remainingSpots === 0) return { label: 'Full', color: 'error' };
    if (remainingSpots < 5) return { label: 'Near Full', color: 'warning' };
    return { label: 'Available', color: 'success' };
  };

  const filteredClasses = useMemo(() => {
    let classes = [...mockClasses];
    
    // Sort by time
    classes.sort((a, b) => {
      const aTime = a.schedule[0]?.startTime || '';
      const bTime = b.schedule[0]?.startTime || '';
      return aTime.localeCompare(bTime);
    });

    // Filter by level if not "All Levels"
    if (selectedLevel !== 'All Levels') {
      classes = classes.filter(c => c.name.includes(selectedLevel));
    }

    return classes;
  }, [selectedLevel]);

  const getClassForTimeSlot = (day: string, timeSlot: string) => {
    const [slotStart] = timeSlot.split('-');
    return filteredClasses.find((class_) =>
      class_.schedule.some(
        (s) => s.day === day && s.startTime === slotStart
      )
    );
  };

  const handleLevelChange = (event: React.MouseEvent<HTMLElement>, newLevel: string) => {
    if (newLevel !== null) {
      setSelectedLevel(newLevel);
    }
  };

  return (
    <PageContainer title="Timetable" description="Weekly class schedule">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h3">Weekly Timetable</Typography>
                <ToggleButtonGroup
                  value={selectedLevel}
                  exclusive
                  onChange={handleLevelChange}
                  aria-label="level filter"
                  size="small"
                >
                  {LEVELS.map((level) => (
                    <ToggleButton key={level} value={level}>
                      {level}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>

              <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                      {days.map((day) => (
                        <TableCell key={day} sx={{ fontWeight: 'bold' }}>
                          {day}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timeSlots.map((timeSlot) => (
                      <TableRow key={timeSlot}>
                        <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                          {timeSlot}
                        </TableCell>
                        {days.map((day) => {
                          const class_ = getClassForTimeSlot(day, timeSlot);
                          const cabinet = class_ ? getCabinetInfo(class_.cabinetId) : null;
                          const status = class_ ? getClassStatus(class_) : null;

                          return (
                            <TableCell
                              key={`${day}-${timeSlot}`}
                              sx={{
                                backgroundColor: class_ ? 'action.hover' : 'inherit',
                                minWidth: '200px',
                              }}
                            >
                              {class_ ? (
                                <Box>
                                  <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                      {class_.name}
                                    </Typography>
                                    <Tooltip title="Edit Class">
                                      <IconButton size="small">
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                  <Typography variant="body2" color="textSecondary">
                                    {class_.teacher}
                                  </Typography>
                                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip
                                      label={cabinet?.name}
                                      size="small"
                                      color="primary"
                                    />
                                    <Chip
                                      label={`${class_.students.length}/${cabinet?.capacity}`}
                                      size="small"
                                      color={status?.color as any}
                                    />
                                    <Chip
                                      label={status?.label}
                                      size="small"
                                      color={status?.color as any}
                                      variant="outlined"
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ fontStyle: 'italic' }}
                                >
                                  No class scheduled
                                </Typography>
                              )}
                            </TableCell>
                          );
                        })}
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

export default Timetable;