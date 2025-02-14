'use client';
import { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Collapse,
  Tooltip,
  useTheme,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockClasses, mockStudents, mockCabinets, Class, Student } from '@/mock/data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Timetable = () => {
  const theme = useTheme();
  const [selectedTeacher, setSelectedTeacher] = useState<string>('All Teachers');
  const [expandedClasses, setExpandedClasses] = useState<string[]>([]);

  const teachers = useMemo(() => {
    const uniqueTeachers = Array.from(new Set(mockClasses.map(c => c.teacher)));
    return ['All Teachers', ...uniqueTeachers];
  }, []);

  const filteredClasses = useMemo(() => {
    let classes = [...mockClasses];
    if (selectedTeacher !== 'All Teachers') {
      classes = classes.filter(c => c.teacher === selectedTeacher);
    }
    return classes;
  }, [selectedTeacher]);

  const mwfClasses = useMemo(() => 
    filteredClasses.filter(c => 
      c.schedule.some(s => ['Monday', 'Wednesday', 'Friday'].includes(s.day))
    ),
    [filteredClasses]
  );

  const ttsClasses = useMemo(() => 
    filteredClasses.filter(c => 
      c.schedule.some(s => ['Tuesday', 'Thursday', 'Saturday'].includes(s.day))
    ),
    [filteredClasses]
  );

  const getStudentsForClass = (classInfo: Class) => {
    return mockStudents.filter(student => classInfo.students.includes(student.id));
  };

  const getCabinetInfo = (cabinetId: string) => {
    const cabinet = mockCabinets.find((c) => c.id === cabinetId);
    return {
      name: cabinet ? cabinet.name : 'Not assigned',
      capacity: cabinet ? cabinet.capacity : 0,
    };
  };

  const toggleClassExpansion = (classId: string) => {
    setExpandedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const renderClassCard = (classInfo: Class) => {
    const students = getStudentsForClass(classInfo);
    const cabinet = getCabinetInfo(classInfo.cabinetId);
    const isExpanded = expandedClasses.includes(classInfo.id);
    const scheduleStr = classInfo.schedule
      .map(s => `${s.day} ${s.startTime}-${s.endTime}`)
      .join(', ');

    return (
      <Card key={classInfo.id} sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" component="div">
                {classInfo.name}
              </Typography>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                {scheduleStr}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => toggleClassExpansion(classInfo.id)}>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} mt={1}>
            <Chip 
              label={cabinet.name}
              size="small"
              color="primary"
            />
            <Chip 
              label={`${students.length}/${cabinet.capacity} students`}
              size="small"
              color={students.length >= cabinet.capacity ? "error" : "success"}
            />
            <Chip 
              label={formatCurrency(classInfo.courseAmount)}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Collapse in={isExpanded}>
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Students
              </Typography>
              <List dense>
                {students.map((student) => (
                  <ListItem
                    key={student.id}
                    secondaryAction={
                      <Chip
                        label={student.paymentStatus}
                        size="small"
                        color={
                          student.paymentStatus === 'paid'
                            ? 'success'
                            : student.paymentStatus === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    }
                  >
                    <ListItemText
                      primary={student.name}
                      secondary={student.phone}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageContainer title="Timetable" description="Class schedule by teacher">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" gutterBottom>Class Schedule</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Teacher</InputLabel>
          <Select
            value={selectedTeacher}
            label="Select Teacher"
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: { xs: 2, md: 0 } }}>
            <Typography variant="h5" gutterBottom color="primary">
              Monday/Wednesday/Friday
            </Typography>
            {mwfClasses.map(renderClassCard)}
            {mwfClasses.length === 0 && (
              <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
                No classes scheduled
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Tuesday/Thursday/Saturday
            </Typography>
            {ttsClasses.map(renderClassCard)}
            {ttsClasses.length === 0 && (
              <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
                No classes scheduled
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Timetable;