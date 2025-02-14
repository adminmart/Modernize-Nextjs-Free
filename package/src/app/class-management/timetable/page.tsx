'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockClasses, mockStudents, mockCabinets, Class, Student } from '@/mock/data';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import ClassDialog from '../classes/ClassDialog';

interface DialogState {
  open: boolean;
  mode: 'create' | 'edit';
  classData?: Class;
}

interface StudentDialogState {
  open: boolean;
  classId: string | null;
}

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
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    mode: 'create'
  });
  const [studentDialogState, setStudentDialogState] = useState<StudentDialogState>({
    open: false,
    classId: null
  });
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  
  // Get first teacher as default instead of 'All Teachers'
  const teachers = useMemo(() =>
    Array.from(new Set(classes.map(c => c.teacher))),
    [classes]
  );
  const [selectedTeacher, setSelectedTeacher] = useState<string>(teachers[0] || '');
  const [expandedClasses, setExpandedClasses] = useState<string[]>([]);

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

  const handleOpenAddStudents = (classId: string) => {
    const currentClass = classes.find(c => c.id === classId);
    if (currentClass) {
      // Filter out students already in the class
      const studentsNotInClass = mockStudents.filter(
        student => !currentClass.students.includes(student.id)
      );
      setAvailableStudents(studentsNotInClass);
      setStudentDialogState({
        open: true,
        classId
      });
    }
  };

  const handleCloseAddStudents = () => {
    setStudentDialogState({
      open: false,
      classId: null
    });
  };

  const handleDeleteStudent = (classId: string, studentId: string) => {
    setClasses(prev =>
      prev.map(c =>
        c.id === classId
          ? { ...c, students: c.students.filter(id => id !== studentId) }
          : c
      )
    );
  };

  const handleAddStudent = (studentId: string) => {
    if (studentDialogState.classId) {
      const currentClass = classes.find(c => c.id === studentDialogState.classId);
      const cabinet = mockCabinets.find(c => c.id === currentClass?.cabinetId);
      
      if (currentClass && cabinet) {
        // Check if adding this student would exceed cabinet capacity
        if (currentClass.students.length >= cabinet.capacity) {
          alert('Cannot add more students. Cabinet capacity reached.');
          return;
        }

        setClasses(prev =>
          prev.map(c =>
            c.id === studentDialogState.classId
              ? { ...c, students: [...c.students, studentId] }
              : c
          )
        );

        // Update available students list
        setAvailableStudents(prev => prev.filter(s => s.id !== studentId));
      }
    }
  };

  const filteredClasses = useMemo(() =>
    classes.filter(c => c.teacher === selectedTeacher),
    [selectedTeacher, classes]
  );

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

  const getClassStatus = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const classTime = new Date();
    classTime.setHours(hours, minutes, 0);
    
    const now = new Date();
    const diffMs = now.getTime() - classTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins >= -15 && diffMins <= 90) { // Class is in progress (including 15 min before)
      return 'in-progress';
    } else if (diffMins < -15) { // More than 15 min before class
      return 'upcoming';
    } else { // Class has ended
      return 'completed';
    }
  };

  const renderClassCard = (classInfo: Class) => {
    const students = getStudentsForClass(classInfo);
    const cabinet = getCabinetInfo(classInfo.cabinetId);
    const isExpanded = expandedClasses.includes(classInfo.id);
    const scheduleStr = classInfo.schedule.length > 0
      ? `${classInfo.schedule[0].startTime} - ${classInfo.schedule[0].endTime}`
      : 'No time set';
    
    const classStatus = classInfo.schedule.length > 0
      ? getClassStatus(classInfo.schedule[0].startTime)
      : 'no-time';

    const getStatusColor = () => {
      switch (classStatus) {
        case 'in-progress':
          return theme.palette.success.main;
        case 'upcoming':
          return theme.palette.info.main;
        case 'completed':
          return theme.palette.text.secondary;
        default:
          return theme.palette.warning.main;
      }
    };

    return (
      <Card key={classInfo.id} sx={{ mb: 2, minHeight: '150px' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" component="div">
                {classInfo.level}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  color="textSecondary"
                  sx={{ fontSize: '1.1rem' }}
                >
                  {scheduleStr}
                </Typography>
                <Tooltip title={`Class ${classStatus}`}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(),
                    }}
                  />
                </Tooltip>
              </Box>
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
              color={students.length >= cabinet.capacity ? "error" : "success"}
              sx={{ fontSize: '1rem' }}
            />
          </Stack>

          <Collapse in={isExpanded}>
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Students
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenAddStudents(classInfo.id)}
                  variant="outlined"
                  size="small"
                >
                  Add Student
                </Button>
              </Box>
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
                      <Stack direction="row" spacing={1} alignItems="center">
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
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteStudent(classInfo.id, student.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Stack>
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

      <ClassDialog
        open={dialogState.open}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={dialogState.mode === 'edit' ? handleDelete : undefined}
        classData={dialogState.classData}
        mode={dialogState.mode}
      />

      <Dialog
        open={studentDialogState.open}
        onClose={handleCloseAddStudents}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Student to Class</DialogTitle>
        <DialogContent>
          <List>
            {availableStudents.map((student) => (
              <ListItem
                key={student.id}
                secondaryAction={
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddStudent(student.id)}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText
                  primary={student.name}
                  secondary={`${student.phone} - ${student.paymentStatus}`}
                />
              </ListItem>
            ))}
            {availableStudents.length === 0 && (
              <ListItem>
                <ListItemText primary="No available students to add" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddStudents}>Close</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Timetable;