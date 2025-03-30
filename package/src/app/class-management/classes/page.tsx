'use client';
import { useState, useMemo, useCallback } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Collapse,
  Button,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockClasses, mockStudents, mockCabinets, Class, Student } from '@/mock/data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import ClassDialog from './ClassDialog';

interface DialogState {
  open: boolean;
  mode: 'create' | 'edit';
  classData?: Class;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Classes = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [expandedClasses, setExpandedClasses] = useState<string[]>([]);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    mode: 'create'
  });

  const levels = ['A1', 'A2', 'B1', 'B2', 'IELTS'];

  const handleOpenCreate = () => {
    setDialogState({
      open: true,
      mode: 'create'
    });
  };

  const handleOpenEdit = (classData: Class) => {
    setDialogState({
      open: true,
      mode: 'edit',
      classData
    });
  };

  const handleClose = () => {
    setDialogState({
      open: false,
      mode: 'create'
    });
  };

  const handleSave = (classData: Partial<Class>) => {
    if (dialogState.mode === 'create') {
      setClasses(prev => [...prev, classData as Class]);
    } else {
      setClasses(prev =>
        prev.map(c => c.id === classData.id ? { ...c, ...classData } : c)
      );
    }
    handleClose();
  };

  const handleDelete = useCallback(() => {
    if (dialogState.classData) {
      setClasses(prev => prev.filter(c => c.id !== dialogState.classData?.id));
      handleClose();
    }
  }, [dialogState.classData]);

  const getTimeUntilStart = (openingDate?: string) => {
    if (!openingDate) return null;
    
    const start = new Date(openingDate);
    const now = new Date();
    const diffDays = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getStartDateColor = (daysUntilStart: number | null) => {
    if (daysUntilStart === null) return 'default';
    if (daysUntilStart <= 0) return 'success';
    if (daysUntilStart <= 3) return 'warning';
    if (daysUntilStart <= 7) return 'info';
    return 'default';
  };

  const getCabinetFillColor = (students: Student[], capacity: number) => {
    const remainingSeats = capacity - students.length;
    if (remainingSeats <= 0) return 'error';
    if (remainingSeats <= 2) return 'error';
    if (remainingSeats <= 5) return 'warning';
    return 'success';
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(c => c.level === selectedLevel);
  }, [selectedLevel, classes]);

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
    const scheduleStr = classInfo.schedule.length > 0
      ? `${classInfo.schedule[0].startTime} - ${classInfo.schedule[0].endTime}`
      : 'No time set';

    const daysUntilStart = getTimeUntilStart(classInfo.openingDate);
    const startDateColor = getStartDateColor(daysUntilStart);
    const cabinetFillColor = getCabinetFillColor(students, cabinet.capacity);

    const startDateText = daysUntilStart !== null
      ? daysUntilStart <= 0
        ? 'Started'
        : `Starts in ${daysUntilStart} days`
      : 'Start date not set';

    return (
      <Card key={classInfo.id} sx={{ mb: 2, minHeight: '150px' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" component="div">
                {classInfo.level}
              </Typography>
              <Typography color="textSecondary" sx={{ fontSize: '1.1rem' }} gutterBottom>
                Teacher: {classInfo.teacher}
              </Typography>
              <Typography color="textSecondary" sx={{ fontSize: '1.1rem' }} gutterBottom>
                {scheduleStr}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => toggleClassExpansion(classInfo.id)}>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <IconButton size="small" onClick={() => handleOpenEdit(classInfo)}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} mt={1}>
            <Chip
              label={cabinet.name}
              size="small"
              color="primary"
              sx={{ fontSize: '1rem' }}
            />
            <Chip
              label={`${students.length}/${cabinet.capacity} students`}
              size="small"
              color={cabinetFillColor}
              sx={{ fontSize: '1rem' }}
            />
            <Chip
              label={startDateText}
              size="small"
              color={startDateColor}
              sx={{ fontSize: '1rem' }}
            />
          </Stack>

          <Collapse in={isExpanded}>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Students
              </Typography>
              <Grid container spacing={2}>
                {students.map((student) => (
                  <Grid item xs={12} key={student.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        py: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2, fontSize: '1.1rem' }}>
                        <Typography>{student.name}</Typography>
                        <Typography color="textSecondary">{student.phone}</Typography>
                      </Box>
                      <Chip
                        label={student.paymentStatus}
                        size="small"
                        sx={{ fontSize: '0.9rem' }}
                        color={
                          student.paymentStatus === 'paid'
                            ? 'success'
                            : student.paymentStatus === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageContainer title="Classes" description="Manage classes by level">
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h3">Classes</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenCreate}>
            Add New Class
          </Button>
        </Box>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Level</InputLabel>
          <Select
            value={selectedLevel}
            label="Select Level"
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
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

      <ClassDialog
        open={dialogState.open}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={dialogState.mode === 'edit' ? handleDelete : undefined}
        classData={dialogState.classData}
        mode={dialogState.mode}
      />
    </PageContainer>
  );
};

export default Classes;