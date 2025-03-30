'use client';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import { useState, useRef, ChangeEvent, useMemo } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { mockPayments, mockStudents, Payment } from '@/mock/data';
import { IconEdit, IconTrash, IconReceipt, IconFilter } from '@tabler/icons-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Payments = () => {
  // State management
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form refs
  const studentIdRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const methodRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // CRUD Functions
  /**
   * Creates a new payment or updates an existing one
   * @param paymentData Payment data to be saved
   */
  const savePayment = () => {
    const paymentData = {
      studentId: (studentIdRef.current as any)?.value,
      amount: Number((amountRef.current as any)?.value),
      date: (dateRef.current as any)?.value,
      method: (methodRef.current as any)?.value as 'cash' | 'card' | 'transfer',
      status: (statusRef.current as any)?.value as 'paid' | 'unpaid',
      description: (descriptionRef.current as any)?.value,
    };

    if (selectedPayment) {
      // Update existing payment
      setPayments(payments.map(payment => 
        payment.id === selectedPayment.id 
          ? { ...payment, ...paymentData }
          : payment
      ));
    } else {
      // Create new payment
      const newPayment: Payment = {
        ...paymentData,
        id: (Math.max(...payments.map(p => Number(p.id))) + 1).toString(),
      };
      setPayments([...payments, newPayment]);
    }
    handleCloseDialog();
  };

  /**
   * Deletes a payment
   * @param paymentId ID of the payment to delete
   */
  const deletePayment = (paymentId: string) => {
    setPayments(payments.filter(payment => payment.id !== paymentId));
    setIsDeleteDialogOpen(false);
  };

  // Filter functions
  const getFilteredPayments = () => {
    let filtered = payments;
    
    // Filter by selected student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(payment => payment.studentId === selectedStudent);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(payment => {
        const student = mockStudents.find(s => s.id === payment.studentId);
        return (
          payment.id.toLowerCase().includes(query) ||
          (student?.name.toLowerCase().includes(query)) ||
          payment.description.toLowerCase().includes(query) ||
          payment.amount.toString().includes(query) ||
          payment.method.toLowerCase().includes(query) ||
          payment.status.toLowerCase().includes(query)
        );
      });
    }
    
    return filtered;
  };

  const getStudentPaymentStats = (studentId: string) => {
    const studentPayments = payments.filter(p => p.studentId === studentId);
    return {
      total: studentPayments.reduce((sum, p) => sum + p.amount, 0),
      paid: studentPayments.filter(p => p.status === 'paid').length,
      unpaid: studentPayments.filter(p => p.status === 'unpaid').length,
    };
  };

  // Event handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStudentChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedStudent(event.target.value as string);
  };

  // Dialog handlers
  const handleOpenDialog = (payment?: Payment) => {
    setSelectedPayment(payment || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedPayment(null);
    setIsDialogOpen(false);
  };

  const handleOpenDeleteDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'unpaid':
        return 'error';
      default:
        return 'default';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'cash':
        return 'success';
      case 'card':
        return 'primary';
      case 'transfer':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const formatCurrency = (amount: number) => {
    // Format number with spaces between thousands
    const formattedNumber = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedNumber} UZS`;
  };

  return (
    <PageContainer title="Payments" description="Manage payments">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="All Payments" />
                  <Tab label="Student History" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h3">Payments</Typography>
                  <Box display="flex" gap={2} alignItems="center">
                    <TextField
                      placeholder="Search payments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size="small"
                      sx={{ width: 300 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconFilter size={20} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                      Record New Payment
                    </Button>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment ID</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getFilteredPayments().map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconReceipt size={16} style={{ marginRight: '8px' }} />
                              <Typography variant="body2">#{payment.id}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {getStudentName(payment.studentId)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              color={payment.status === 'paid' ? 'success.main' : 'inherit'}
                            >
                              {formatCurrency(payment.amount)}
                            </Typography>
                          </TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={payment.method}
                              color={getMethodColor(payment.method) as any}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={payment.status}
                              color={getStatusColor(payment.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              {payment.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              color="primary" 
                              size="small" 
                              sx={{ mr: 1 }}
                              onClick={() => handleOpenDialog(payment)}
                            >
                              <IconEdit size={18} />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              size="small"
                              onClick={() => handleOpenDeleteDialog(payment)}
                            >
                              <IconTrash size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h3">Student Payment History</Typography>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Select Student</InputLabel>
                    <Select
                      value={selectedStudent}
                      label="Select Student"
                      onChange={handleStudentChange as any}
                    >
                      <MenuItem value="all">All Students</MenuItem>
                      {mockStudents.map((student) => (
                        <MenuItem key={student.id} value={student.id}>
                          {student.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {selectedStudent !== 'all' && (
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Total Payments
                          </Typography>
                          <Typography variant="h4" color="primary">
                            {formatCurrency(getStudentPaymentStats(selectedStudent).total)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Paid
                          </Typography>
                          <Typography variant="h4" color="success.main">
                            {getStudentPaymentStats(selectedStudent).paid}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Unpaid
                          </Typography>
                          <Typography variant="h4" color="error.main">
                            {getStudentPaymentStats(selectedStudent).unpaid}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment ID</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getFilteredPayments().map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconReceipt size={16} style={{ marginRight: '8px' }} />
                              <Typography variant="body2">#{payment.id}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {getStudentName(payment.studentId)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              color={payment.status === 'paid' ? 'success.main' : 'inherit'}
                            >
                              {formatCurrency(payment.amount)}
                            </Typography>
                          </TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={payment.method}
                              color={getMethodColor(payment.method) as any}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={payment.status}
                              color={getStatusColor(payment.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              {payment.description}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payment Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPayment ? 'Edit Payment' : 'Record New Payment'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              select
              label="Student"
              inputRef={studentIdRef}
              defaultValue={selectedPayment?.studentId || ''}
              fullWidth
            >
              {mockStudents.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              type="number"
              inputRef={amountRef}
              defaultValue={selectedPayment?.amount || ''}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              inputRef={dateRef}
              defaultValue={selectedPayment?.date || new Date().toISOString().split('T')[0]}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Payment Method"
              inputRef={methodRef}
              defaultValue={selectedPayment?.method || 'cash'}
              fullWidth
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="transfer">Transfer</MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              inputRef={statusRef}
              defaultValue={selectedPayment?.status || 'unpaid'}
              fullWidth
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </TextField>
            <TextField
              label="Description"
              multiline
              rows={2}
              inputRef={descriptionRef}
              defaultValue={selectedPayment?.description || ''}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={savePayment}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete payment #{selectedPayment?.id}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => selectedPayment && deletePayment(selectedPayment.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Payments;