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
  Chip,
  IconButton,
} from '@mui/material';
import { Cabinet } from '@/mock/data';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface CabinetDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (cabinetData: Partial<Cabinet>) => void;
  onDelete?: () => void;
  cabinetData?: Cabinet;
  mode: 'create' | 'edit';
}

const statusOptions = ['available', 'occupied', 'maintenance'] as const;

const CabinetDialog = ({ open, onClose, onSave, onDelete, cabinetData, mode }: CabinetDialogProps) => {
  const [formData, setFormData] = useState<Partial<Cabinet>>({
    name: '',
    capacity: 15,
    equipment: [],
    status: 'available',
    location: '',
  });
  const [newEquipment, setNewEquipment] = useState('');

  useEffect(() => {
    if (cabinetData && mode === 'edit') {
      setFormData(cabinetData);
    } else {
      setFormData({
        name: '',
        capacity: 15,
        equipment: [],
        status: 'available',
        location: '',
      });
    }
  }, [cabinetData, mode]);

  const handleChange = (field: keyof Cabinet, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEquipment = () => {
    if (newEquipment.trim()) {
      handleChange('equipment', [...(formData.equipment || []), newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (index: number) => {
    const newEquipment = [...(formData.equipment || [])];
    newEquipment.splice(index, 1);
    handleChange('equipment', newEquipment);
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      const newCabinetData = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      };
      onSave(newCabinetData);
    } else {
      onSave(formData);
    }
  };

  const isValid = () => {
    return (
      formData.name?.trim() &&
      formData.location?.trim() &&
      formData.capacity &&
      formData.capacity > 0 &&
      formData.status
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'create' ? 'Create New Cabinet' : 'Edit Cabinet'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cabinet Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              error={!formData.name?.trim()}
              helperText={!formData.name?.trim() ? 'Name is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
              error={!formData.location?.trim()}
              helperText={!formData.location?.trim() ? 'Location is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Capacity"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', Number(e.target.value))}
              required
              error={!formData.capacity || formData.capacity <= 0}
              helperText={!formData.capacity || formData.capacity <= 0 ? 'Capacity must be greater than 0' : ''}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Equipment"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEquipment();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddEquipment}
                  disabled={!newEquipment.trim()}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.equipment?.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => handleRemoveEquipment(index)}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {mode === 'edit' && onDelete && (
          <Button onClick={onDelete} color="error" sx={{ mr: 'auto' }}>
            Delete Cabinet
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!isValid()}>
          {mode === 'create' ? 'Create' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CabinetDialog;