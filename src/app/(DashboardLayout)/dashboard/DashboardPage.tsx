'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  Select,
  Menu,
  Tooltip,
  CircularProgress,
  Popover,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { format, subDays, parseISO, isWithinInterval } from 'date-fns';
import dynamic from 'next/dynamic';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';

// Import ApexCharts dynamically with SSR disabled and no loading component
const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading chart...</div>
});

// Define types for the ChartWrapper component
interface ChartWrapperProps {
  options: any;
  series: any[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';
  height: number;
}

// Create a wrapper component for the charts
const ChartWrapper = ({ options, series, type, height }: ChartWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading chart...</div>;
  }

  return (
    <div id="chart">
      <ReactApexChart 
        options={options} 
        series={series} 
        type={type} 
        height={height} 
      />
    </div>
  );
};

// Email data interface
interface EmailData {
  id: number;
  senderEmail: string;
  date: string;
  source: string;
  medium: string;
  trafficSource: string;
}

// Date filter types
type DateFilterOption = '7days' | '30days' | '60days' | '90days' | 'custom' | '';

export default function DashboardPage() {
  // State for filters
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('');
  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);
  const [sourceFilter, setSourceFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [trafficSourceFilter, setTrafficSourceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [customDateDialogOpen, setCustomDateDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Total emails sent over time
  const emailTrendsOptions = useMemo(() => ({
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    title: {
      text: 'Total Emails Sent Over Time',
      align: 'left'
    }
  }), []);

  const emailTrendsSeries = useMemo(() => [{
    name: 'Total Emails Sent',
    data: [28, 45, 35, 52, 48, 62, 71, 84, 98]
  }], []);

  // Channel distribution
  const channelOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '60%'
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
    xaxis: {
      categories: ['Organic Search', 'Paid Search', 'Direct', 'Referral'],
    },
    title: {
      text: 'Total Emails by Channel',
      align: 'left'
    }
  }), []);

  const channelSeries = useMemo(() => [{
    name: 'Total Emails',
    data: [44, 32, 18, 12]
  }], []);

  // Sample email data
  const recentEmails = useMemo(() => [
    { 
      id: 1,
      senderEmail: 'john@example.com',
      date: '2024-01-04 09:30',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 2,
      senderEmail: 'sarah@company.com',
      date: '2024-01-15 10:15',
      source: 'google',
      medium: 'cpc',
      trafficSource: 'Paid Search'
    },
    {
      id: 3,
      senderEmail: 'mike@business.net',
      date: '2024-02-04 11:45',
      source: '(direct)',
      medium: 'none',
      trafficSource: 'Direct'
    },
    {
      id: 4,
      senderEmail: 'lisa@client.org',
      date: '2024-02-20 13:20',
      source: 'linkedin.com',
      medium: 'referral',
      trafficSource: 'Referral'
    },
    { 
      id: 5,
      senderEmail: 'david@example.com',
      date: '2024-03-05 08:45',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 6,
      senderEmail: 'emma@company.com',
      date: '2024-03-15 14:30',
      source: 'facebook.com',
      medium: 'referral',
      trafficSource: 'Referral'
    },
    {
      id: 7,
      senderEmail: 'alex@tech.com',
      date: '2024-04-02 11:20',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 8,
      senderEmail: 'jessica@startup.io',
      date: '2024-04-18 09:45',
      source: 'google',
      medium: 'cpc',
      trafficSource: 'Paid Search'
    },
    {
      id: 9,
      senderEmail: 'ryan@agency.net',
      date: '2024-05-07 16:30',
      source: '(direct)',
      medium: 'none',
      trafficSource: 'Direct'
    },
    {
      id: 10,
      senderEmail: 'olivia@corp.org',
      date: '2024-05-22 13:15',
      source: 'twitter.com',
      medium: 'referral',
      trafficSource: 'Referral'
    },
    {
      id: 11,
      senderEmail: 'ethan@example.com',
      date: '2024-06-03 10:30',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 12,
      senderEmail: 'sophia@company.com',
      date: '2024-06-19 15:45',
      source: 'google',
      medium: 'cpc',
      trafficSource: 'Paid Search'
    },
    {
      id: 13,
      senderEmail: 'noah@business.net',
      date: '2024-07-05 08:20',
      source: '(direct)',
      medium: 'none',
      trafficSource: 'Direct'
    },
    {
      id: 14,
      senderEmail: 'ava@client.org',
      date: '2024-07-21 14:10',
      source: 'instagram.com',
      medium: 'referral',
      trafficSource: 'Referral'
    },
    {
      id: 15,
      senderEmail: 'liam@tech.com',
      date: '2024-08-08 11:30',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 16,
      senderEmail: 'mia@startup.io',
      date: '2024-08-24 09:15',
      source: 'google',
      medium: 'cpc',
      trafficSource: 'Paid Search'
    },
    {
      id: 17,
      senderEmail: 'logan@agency.net',
      date: '2024-09-10 16:45',
      source: '(direct)',
      medium: 'none',
      trafficSource: 'Direct'
    },
    {
      id: 18,
      senderEmail: 'charlotte@corp.org',
      date: '2024-09-26 13:30',
      source: 'linkedin.com',
      medium: 'referral',
      trafficSource: 'Referral'
    }
  ], []);

  // Get unique values for filter dropdowns
  const uniqueDates = useMemo(() => 
    [...new Set(recentEmails.map(email => email.date.split(' ')[0]))],
    [recentEmails]
  );
  
  const uniqueSources = useMemo(() => 
    [...new Set(recentEmails.map(email => email.source))],
    [recentEmails]
  );
  
  const uniqueMediums = useMemo(() => 
    [...new Set(recentEmails.map(email => email.medium))],
    [recentEmails]
  );
  
  const uniqueTrafficSources = useMemo(() => 
    [...new Set(recentEmails.map(email => email.trafficSource))],
    [recentEmails]
  );

  // Date filter handlers
  const handleDateFilterChange = (option: DateFilterOption) => {
    setDateFilter(option);
    if (option === 'custom') {
      setCustomDateDialogOpen(true);
    } else {
      handleDateMenuClose();
    }
  };

  const handleDateMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateMenuClose = () => {
    setDateAnchorEl(null);
  };

  const handleCustomDateDialogOpen = () => {
    setCustomDateDialogOpen(true);
    handleDateMenuClose();
  };

  const handleCustomDateDialogClose = () => {
    setCustomDateDialogOpen(false);
  };

  const handleApplyCustomDate = () => {
    if (startDate && endDate) {
      setDateFilter('custom');
      setCustomDateDialogOpen(false);
    }
  };

  const getDateFilterLabel = useCallback(() => {
    const today = new Date();
    
    switch (dateFilter) {
      case '7days':
        return `Last 7 Days (${format(subDays(today, 7), 'MMM d')} - ${format(today, 'MMM d')})`;
      case '30days':
        return `Last 30 Days (${format(subDays(today, 30), 'MMM d')} - ${format(today, 'MMM d')})`;
      case '60days':
        return `Last 60 Days (${format(subDays(today, 60), 'MMM d')} - ${format(today, 'MMM d')})`;
      case '90days':
        return `Last 90 Days (${format(subDays(today, 90), 'MMM d')} - ${format(today, 'MMM d')})`;
      case 'custom':
        if (startDate && endDate) {
          return `${format(new Date(startDate), 'MMM d, yyyy')} - ${format(new Date(endDate), 'MMM d, yyyy')}`;
        }
        return 'Custom Date Range';
      default:
        return 'All Dates';
    }
  }, [dateFilter, startDate, endDate]);

  // Filter emails based on selected filters
  const filteredEmails = useMemo(() => 
    recentEmails.filter(email => {
      // Date filtering
      if (dateFilter) {
        const emailDate = parseISO(email.date.split(' ')[0]);
        const today = new Date();
        
        if (dateFilter === '7days') {
          const sevenDaysAgo = subDays(today, 7);
          if (emailDate < sevenDaysAgo) return false;
        } else if (dateFilter === '30days') {
          const thirtyDaysAgo = subDays(today, 30);
          if (emailDate < thirtyDaysAgo) return false;
        } else if (dateFilter === '60days') {
          const sixtyDaysAgo = subDays(today, 60);
          if (emailDate < sixtyDaysAgo) return false;
        } else if (dateFilter === '90days') {
          const ninetyDaysAgo = subDays(today, 90);
          if (emailDate < ninetyDaysAgo) return false;
        } else if (dateFilter === 'custom' && startDate && endDate) {
          // Custom date range filtering
          try {
            if (!isWithinInterval(emailDate, {
              start: new Date(startDate),
              end: new Date(endDate)
            })) {
              return false;
            }
          } catch (error) {
            console.error('Date filtering error:', error);
          }
        }
      }

      // Other filters
      return (
        (sourceFilter === '' || email.source === sourceFilter) &&
        (mediumFilter === '' || email.medium === mediumFilter) &&
        (trafficSourceFilter === '' || email.trafficSource === trafficSourceFilter)
      );
    }),
    [recentEmails, dateFilter, startDate, endDate, sourceFilter, mediumFilter, trafficSourceFilter]
  );

  // Generate chart data based on filtered emails
  const filteredChartData = useMemo(() => {
    // Group emails by month for the trends chart
    const monthlyData = new Map();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize with zeros
    months.forEach(month => {
      monthlyData.set(month, 0);
    });
    
    // Count emails by month
    filteredEmails.forEach(email => {
      const date = parseISO(email.date.split(' ')[0]);
      const month = months[date.getMonth()];
      monthlyData.set(month, monthlyData.get(month) + 1);
    });
    
    // Convert to array for chart
    const trendsData = months.map(month => monthlyData.get(month));
    
    // Group emails by traffic source for the channel chart
    const channelData = new Map();
    const channels = ['Organic Search', 'Paid Search', 'Direct', 'Referral'];
    
    // Initialize with zeros
    channels.forEach(channel => {
      channelData.set(channel, 0);
    });
    
    // Count emails by channel
    filteredEmails.forEach(email => {
      channelData.set(email.trafficSource, channelData.get(email.trafficSource) + 1);
    });
    
    // Convert to array for chart
    const channelsData = channels.map(channel => channelData.get(channel));
    
    return {
      trendsData,
      channelsData
    };
  }, [filteredEmails]);

  // Update chart series with filtered data
  const filteredEmailTrendsSeries = useMemo(() => [{
    name: 'Total Emails Sent',
    data: filteredChartData.trendsData
  }], [filteredChartData.trendsData]);

  const filteredChannelSeries = useMemo(() => [{
    name: 'Total Emails',
    data: filteredChartData.channelsData
  }], [filteredChartData.channelsData]);

  // Get chart title with date filter info
  const getChartTitle = useCallback((baseTitle: string) => {
    if (dateFilter) {
      return `${baseTitle} - ${getDateFilterLabel()}`;
    }
    return baseTitle;
  }, [dateFilter, getDateFilterLabel]);

  // Update chart options with filtered title
  const filteredEmailTrendsOptions = useMemo(() => ({
    ...emailTrendsOptions,
    title: {
      ...emailTrendsOptions.title,
      text: getChartTitle('Total Emails Sent Over Time')
    }
  }), [emailTrendsOptions, getChartTitle]);

  const filteredChannelOptions = useMemo(() => ({
    ...channelOptions,
    title: {
      ...channelOptions.title,
      text: getChartTitle('Total Emails by Channel')
    }
  }), [channelOptions, getChartTitle]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setDateFilter('');
    setStartDate('');
    setEndDate('');
    setSourceFilter('');
    setMediumFilter('');
    setTrafficSourceFilter('');
  }, []);

  // Toggle filter visibility
  const toggleFilters = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  // Export menu handlers
  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  // Export functions
  const exportToCSV = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      try {
        // Create CSV content
        const headers = ['Sender Email', 'Date', 'Source', 'Medium', 'Traffic Source'];
        const csvContent = [
          headers.join(','),
          ...filteredEmails.map(email => 
            [
              email.senderEmail,
              email.date,
              email.source,
              email.medium,
              email.trafficSource
            ].join(',')
          )
        ].join('\n');
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `email_clicks_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        handleExportClose();
      } catch (error) {
        console.error('Export failed:', error);
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  const exportToExcel = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      alert('Excel export would be implemented here with a library like xlsx');
      setIsExporting(false);
      handleExportClose();
    }, 500);
  };

  const exportToPDF = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      alert('PDF export would be implemented here with a library like jsPDF');
      setIsExporting(false);
      handleExportClose();
    }, 500);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Email Click Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Total Emails</Typography>
            <Typography variant="h3">{filteredEmails.length}</Typography>
            <Typography variant="subtitle2">{getDateFilterLabel()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Active Pages</Typography>
            <Typography variant="h3">{[...new Set(filteredEmails.map(email => email.source))].length}</Typography>
            <Typography variant="subtitle2">with mailto links</Typography>
          </Paper>
        </Grid>

        {/* Email Trends Chart */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <ChartWrapper
              options={filteredEmailTrendsOptions}
              series={filteredEmailTrendsSeries}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Channel Distribution */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <ChartWrapper
              options={filteredChannelOptions}
              series={filteredChannelSeries}
              type="bar"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Recent Email Clicks Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">Recent Email Clicks</Typography>
              <Box>
                <Button 
                  startIcon={<FilterListIcon />} 
                  onClick={toggleFilters}
                  variant={showFilters ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Button
                  startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
                  onClick={handleExportClick}
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled={isExporting}
                >
                  Export
                </Button>
                <Menu
                  anchorEl={exportAnchorEl}
                  open={Boolean(exportAnchorEl)}
                  onClose={handleExportClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={exportToCSV}>Export as CSV</MenuItem>
                  <MenuItem onClick={exportToExcel}>Export as Excel</MenuItem>
                  <MenuItem onClick={exportToPDF}>Export as PDF</MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Filters */}
            {showFilters && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleDateMenuOpen}
                      endIcon={<CalendarMonthIcon />}
                      sx={{ height: '40px', justifyContent: 'space-between', textAlign: 'left' }}
                    >
                      {getDateFilterLabel()}
                    </Button>
                    <Menu
                      anchorEl={dateAnchorEl}
                      open={Boolean(dateAnchorEl)}
                      onClose={handleDateMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      PaperProps={{
                        sx: { width: '250px' }
                      }}
                    >
                      <MenuItem onClick={() => handleDateFilterChange('')}>
                        All Dates
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => handleDateFilterChange('7days')}>
                        Last 7 Days
                      </MenuItem>
                      <MenuItem onClick={() => handleDateFilterChange('30days')}>
                        Last 30 Days
                      </MenuItem>
                      <MenuItem onClick={() => handleDateFilterChange('60days')}>
                        Last 60 Days
                      </MenuItem>
                      <MenuItem onClick={() => handleDateFilterChange('90days')}>
                        Last 90 Days
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleCustomDateDialogOpen}>
                        <DateRangeIcon fontSize="small" sx={{ mr: 1 }} />
                        Custom Date Range
                      </MenuItem>
                    </Menu>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Source</InputLabel>
                      <Select
                        value={sourceFilter}
                        label="Source"
                        onChange={(e) => setSourceFilter(e.target.value)}
                      >
                        <MenuItem value="">All Sources</MenuItem>
                        {uniqueSources.map(source => (
                          <MenuItem key={source} value={source}>{source}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Medium</InputLabel>
                      <Select
                        value={mediumFilter}
                        label="Medium"
                        onChange={(e) => setMediumFilter(e.target.value)}
                      >
                        <MenuItem value="">All Mediums</MenuItem>
                        {uniqueMediums.map(medium => (
                          <MenuItem key={medium} value={medium}>{medium}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Traffic Source</InputLabel>
                      <Select
                        value={trafficSourceFilter}
                        label="Traffic Source"
                        onChange={(e) => setTrafficSourceFilter(e.target.value)}
                      >
                        <MenuItem value="">All Traffic Sources</MenuItem>
                        {uniqueTrafficSources.map(trafficSource => (
                          <MenuItem key={trafficSource} value={trafficSource}>{trafficSource}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" size="small" onClick={resetFilters} sx={{ mr: 1 }}>
                    Reset Filters
                  </Button>
                </Box>
              </Box>
            )}

            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sender Email</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Traffic Source</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell>{email.senderEmail}</TableCell>
                        <TableCell>{email.date}</TableCell>
                        <TableCell>{email.source}</TableCell>
                        <TableCell>{email.medium}</TableCell>
                        <TableCell>
                          <Chip 
                            label={email.trafficSource}
                            color={
                              email.trafficSource === 'Organic Search' ? 'success' :
                              email.trafficSource === 'Paid Search' ? 'primary' :
                              email.trafficSource === 'Direct' ? 'secondary' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1" color="text.secondary">
                          No email data found matching the selected filters.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Custom Date Range Dialog */}
      <Dialog open={customDateDialogOpen} onClose={handleCustomDateDialogClose}>
        <DialogTitle>Select Custom Date Range</DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 2, px: 3, minWidth: '300px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Start Date</Typography>
              <TextField
                type="date"
                fullWidth
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>End Date</Typography>
              <TextField
                type="date"
                fullWidth
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: startDate }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomDateDialogClose}>Cancel</Button>
          <Button 
            onClick={handleApplyCustomDate} 
            variant="contained" 
            disabled={!startDate || !endDate}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 