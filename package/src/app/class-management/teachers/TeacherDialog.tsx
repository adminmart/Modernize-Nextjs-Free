import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { Teacher } from '@/mock/data';

interface TeacherDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (teacher: Partial<Teacher>) => void;
  teacher?: Teacher;
}

const SUBJECTS = ['English', 'Math', 'Science', 'History', 'Geography'];
const QUALIFICATIONS = [
  'PhD',
  'Masters',
  'Bachelors',
  'CELTA',
  'DELTA',
  'TESOL',
  'TEFL',
];

const TeacherDialog: React.FC<TeacherDialogProps> = ({
  open,
  onClose,
  onSave,
  teacher,
}) => {
  const [formData, setFormData] = React.useState<Partial<Teacher>>({
    name: '',
    email: '',
    phone: '',
    subjects: [],
    qualifications: [],
    status: 'active',
    ...teacher,
  });

  React.useEffect(() => {
    if (teacher) {
      setFormData(teacher);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subjects: [],
        qualifications: [],
        status: 'active',
      });
    }
  }, [teacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {teacher ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Subjects</InputLabel>
              <Select
                multiple
                value={formData.subjects || []}
                onChange={(e) => setFormData({
                  ...formData,
                  subjects: e.target.value as string[],
                })}
                input={<OutlinedInput label="Subjects" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {SUBJECTS.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Qualifications</InputLabel>
              <Select
                multiple
                value={formData.qualifications || []}
                onChange={(e) => setFormData({
                  ...formData,
                  qualifications: e.target.value as string[],
                })}
                input={<OutlinedInput label="Qualifications" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {QUALIFICATIONS.map((qual) => (
                  <MenuItem key={qual} value={qual}>
                    {qual}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                name="status"
                onChange={(e) => setFormData({
                  ...formData,
                  status: e.target.value as 'active' | 'inactive',
                })}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {teacher ? 'Save Changes' : 'Add Teacher'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TeacherDialog;