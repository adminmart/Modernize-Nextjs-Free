'use client';
import {
  Card,
  Grid,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { mockTeachers, mockClasses, mockStudents, Teacher } from '@/mock/data';
import TeacherDialog from './TeacherDialog';
import { useState } from 'react';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);

  const handleAddTeacher = () => {
    setSelectedTeacher(undefined);
    setOpenDialog(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setDeleteTeacher(teacher);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTeacher) {
      setTeachers(teachers.filter(t => t.id !== deleteTeacher.id));
      setDeleteConfirmOpen(false);
      setDeleteTeacher(null);
    }
  };

  const handleSaveTeacher = (teacherData: Partial<Teacher>) => {
    if (selectedTeacher) {
      // Edit existing teacher
      setTeachers(teachers.map(t =>
        t.id === selectedTeacher.id ? { ...selectedTeacher, ...teacherData } : t
      ));
    } else {
      // Add new teacher
      const newTeacher: Teacher = {
        id: (Math.max(...teachers.map(t => parseInt(t.id))) + 1).toString(),
        ...teacherData as Omit<Teacher, 'id'>,
      };
      setTeachers([...teachers, newTeacher]);
    }
    setOpenDialog(false);
  };

  // Calculate statistics for each teacher
  const teacherStats = teachers.map(teacher => {
    const teacherClasses = mockClasses.filter(cls => cls.teacher === teacher.name);
    const uniqueStudentIds = new Set(teacherClasses.flatMap(cls => cls.students));
    const teacherStudents = Array.from(uniqueStudentIds).map(id => 
      mockStudents.find(student => student.id === id)
    ).filter(Boolean);

    const paidStudents = teacherStudents.filter(student => student?.paymentStatus === 'paid');
    const unpaidStudents = teacherStudents.filter(student => student?.paymentStatus !== 'paid');
    const newStudents = teacherStudents.filter(student => {
      const joinDate = new Date(student?.joinDate || '');
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return joinDate >= oneMonthAgo;
    });

    // Group classes by level
    const levelGroups = teacherClasses.reduce((acc, cls) => {
      acc[cls.level] = (acc[cls.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      ...teacher,
      classCount: teacherClasses.length,
      totalStudents: teacherStudents.length,
      paidStudents: paidStudents.length,
      unpaidStudents: unpaidStudents.length,
      newStudents: newStudents.length,
      levelGroups,
    };
  });

  return (
    <PageContainer title="Teachers" description="Teacher Information and Statistics">
      {/* Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus />}
          onClick={handleAddTeacher}
        >
          Add Teacher
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Overall Statistics */}
        <Grid item xs={12}>
          <DashboardCard title="Overall Statistics">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h3">{mockTeachers.length}</Typography>
                  <Typography variant="subtitle1">Total Teachers</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h3">{mockClasses.length}</Typography>
                  <Typography variant="subtitle1">Total Classes</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h3">
                    {(mockClasses.length / mockTeachers.length).toFixed(1)}
                  </Typography>
                  <Typography variant="subtitle1">Avg Classes per Teacher</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h3">
                    {(mockStudents.length / mockTeachers.length).toFixed(1)}
                  </Typography>
                  <Typography variant="subtitle1">Avg Students per Teacher</Typography>
                </Card>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

        {/* Teacher Details Table */}
        <Grid item xs={12}>
          <DashboardCard title="Teacher Details">
            <Box sx={{ overflow: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Teacher</strong></TableCell>
                    <TableCell><strong>Classes</strong></TableCell>
                    <TableCell><strong>Students</strong></TableCell>
                    <TableCell><strong>New Students</strong></TableCell>
                    <TableCell><strong>Paid/Unpaid</strong></TableCell>
                    <TableCell><strong>Groups by Level</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherStats.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {teacher.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {teacher.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{teacher.classCount}</TableCell>
                      <TableCell>{teacher.totalStudents}</TableCell>
                      <TableCell>{teacher.newStudents}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip 
                            label={`${teacher.paidStudents} paid`}
                            color="success"
                            size="small"
                          />
                          <Chip 
                            label={`${teacher.unpaidStudents} unpaid`}
                            color="error"
                            size="small"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {Object.entries(teacher.levelGroups).map(([level, count]) => (
                            <Chip
                              key={level}
                              label={`${level}: ${count}`}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEditTeacher(teacher)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(teacher)}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Individual Teacher Cards */}
        {teacherStats.map((teacher) => (
          <Grid item xs={12} md={6} key={teacher.id}>
            <DashboardCard title={teacher.name}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Contact: {teacher.email} | {teacher.phone}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Joined: {new Date(teacher.joinDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {teacher.qualifications.map((qual, index) => (
                      <Chip key={index} label={qual} size="small" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{teacher.classCount}</Typography>
                    <Typography variant="body2">Classes</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{teacher.totalStudents}</Typography>
                    <Typography variant="body2">Students</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{teacher.newStudents}</Typography>
                    <Typography variant="body2">New</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">
                      {((teacher.paidStudents / teacher.totalStudents) * 100).toFixed(0)}%
                    </Typography>
                    <Typography variant="body2">Payment Rate</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Teacher Dialog */}
      <TeacherDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveTeacher}
        teacher={selectedTeacher}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Teacher</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deleteTeacher?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default TeachersPage;