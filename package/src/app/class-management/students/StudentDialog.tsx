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
} from '@mui/material';
import { Student } from '@/mock/data';

interface StudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (student: Partial<Student>) => void;
  student?: Student;
}

const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  onClose,
  onSave,
  student,
}) => {
  const [formData, setFormData] = React.useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    ...student,
  });

  React.useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'active',
      });
    }
  }, [student]);

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
      paymentStatus: formData.paymentStatus || 'pending', // Default payment status for new students
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {student ? 'Edit Student' : 'Add New Student'}
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
            {student && (
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={`Payment Status: ${formData.paymentStatus}`}
                  color={
                    formData.paymentStatus === 'paid'
                      ? 'success'
                      : formData.paymentStatus === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                  sx={{ width: '100%', height: 32 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {student ? 'Save Changes' : 'Add Student'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentDialog;