'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { Class, mockTeachers, mockCabinets } from '@/mock/data';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (classData: Partial<Class>) => void;
  onDelete?: () => void;
  classData?: Class;
  mode: 'create' | 'edit';
}

const defaultSchedule = {
  day: 'Monday',
  startTime: '09:00',
  endTime: '10:30',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const levels = ['A1', 'A2', 'B1', 'B2', 'IELTS'];

const ClassDialog = ({ open, onClose, onSave, onDelete, classData, mode }: ClassDialogProps) => {
  const [formData, setFormData] = useState<Partial<Class>>({
    name: '',
    teacher: '',
    subject: 'English',
    level: 'A1',
    cabinetId: '',
    schedule: [defaultSchedule],
    students: [],
    courseAmount: 500000,
  });

  useEffect(() => {
    if (classData && mode === 'edit') {
      setFormData(classData);
    } else {
      setFormData({
        name: '',
        teacher: '',
        subject: 'English',
        level: 'A1',
        cabinetId: '',
        schedule: [defaultSchedule],
        students: [],
        courseAmount: 500000,
      });
    }
  }, [classData, mode]);

  const handleChange = (field: keyof Class, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (index: number, field: keyof typeof defaultSchedule, value: string) => {
    const newSchedule = [...(formData.schedule || [])];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    handleChange('schedule', newSchedule);
  };

  const addSchedule = () => {
    handleChange('schedule', [...(formData.schedule || []), defaultSchedule]);
  };

  const removeSchedule = (index: number) => {
    const newSchedule = [...(formData.schedule || [])];
    newSchedule.splice(index, 1);
    handleChange('schedule', newSchedule);
  };

  const handleSubmit = () => {
    // Add createdAt and id for new classes
    if (mode === 'create') {
      const newClassData = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        openingDate: new Date().toISOString().split('T')[0],
      };
      onSave(newClassData);
    } else {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {mode === 'create' ? 'Create New Class' : 'Edit Class'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Class Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Teacher</InputLabel>
              <Select
                value={formData.teacher}
                label="Teacher"
                onChange={(e) => handleChange('teacher', e.target.value)}
              >
                {mockTeachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={formData.level}
                label="Level"
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Cabinet</InputLabel>
              <Select
                value={formData.cabinetId}
                label="Cabinet"
                onChange={(e) => handleChange('cabinetId', e.target.value)}
              >
                {mockCabinets.map((cabinet) => (
                  <MenuItem key={cabinet.id} value={cabinet.id}>
                    {cabinet.name} ({cabinet.capacity} seats)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Course Amount (UZS)"
              value={formData.courseAmount}
              onChange={(e) => handleChange('courseAmount', Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Schedule
              </Typography>
              {formData.schedule?.map((schedule, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Day</InputLabel>
                    <Select
                      value={schedule.day}
                      label="Day"
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                    >
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={schedule.startTime}
                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                  />
                  <TextField
                    label="End Time"
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => removeSchedule(index)}
                    disabled={formData.schedule?.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={addSchedule}
                variant="outlined"
                size="small"
              >
                Add Schedule
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {mode === 'edit' && onDelete && (
          <Button onClick={onDelete} color="error" sx={{ mr: 'auto' }}>
            Delete Class
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === 'create' ? 'Create' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDialog;