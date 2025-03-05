'use client';
import { Box, Typography, Grid, Paper, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow, TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FilterListIcon from '@mui/icons-material/FilterList';

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

export default function DashboardPage() {
  // State for filters
  const [dateFilter, setDateFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [trafficSourceFilter, setTrafficSourceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Total emails sent over time
  const emailTrendsOptions = {
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
  };

  const emailTrendsSeries = [{
    name: 'Total Emails Sent',
    data: [28, 45, 35, 52, 48, 62, 71, 84, 98]
  }];

  // Channel distribution
  const channelOptions = {
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
  };

  const channelSeries = [{
    name: 'Total Emails',
    data: [44, 32, 18, 12]
  }];

  const recentEmails = [
    { 
      id: 1,
      senderEmail: 'john@example.com',
      date: '2024-03-04 09:30',
      source: 'google',
      medium: 'organic',
      trafficSource: 'Organic Search'
    },
    {
      id: 2,
      senderEmail: 'sarah@company.com',
      date: '2024-03-04 10:15',
      source: 'google',
      medium: 'cpc',
      trafficSource: 'Paid Search'
    },
    {
      id: 3,
      senderEmail: 'mike@business.net',
      date: '2024-03-04 11:45',
      source: '(direct)',
      medium: 'none',
      trafficSource: 'Direct'
    },
    {
      id: 4,
      senderEmail: 'lisa@client.org',
      date: '2024-03-04 13:20',
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
      date: '2024-03-05 14:30',
      source: 'facebook.com',
      medium: 'referral',
      trafficSource: 'Referral'
    }
  ];

  // Get unique values for filter dropdowns
  const uniqueDates = [...new Set(recentEmails.map(email => email.date.split(' ')[0]))];
  const uniqueSources = [...new Set(recentEmails.map(email => email.source))];
  const uniqueMediums = [...new Set(recentEmails.map(email => email.medium))];
  const uniqueTrafficSources = [...new Set(recentEmails.map(email => email.trafficSource))];

  // Filter emails based on selected filters
  const filteredEmails = recentEmails.filter(email => {
    return (
      (dateFilter === '' || email.date.includes(dateFilter)) &&
      (sourceFilter === '' || email.source === sourceFilter) &&
      (mediumFilter === '' || email.medium === mediumFilter) &&
      (trafficSourceFilter === '' || email.trafficSource === trafficSourceFilter)
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setDateFilter('');
    setSourceFilter('');
    setMediumFilter('');
    setTrafficSourceFilter('');
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
            <Typography variant="h6" color="textSecondary">Total Emails Today</Typography>
            <Typography variant="h3">124</Typography>
            <Typography variant="subtitle2" color="success.main">↑ 12% vs yesterday</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Active Pages</Typography>
            <Typography variant="h3">15</Typography>
            <Typography variant="subtitle2">with mailto links</Typography>
          </Paper>
        </Grid>

        {/* Email Trends Chart */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <ChartWrapper
              options={emailTrendsOptions}
              series={emailTrendsSeries}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>

        {/* Channel Distribution */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <ChartWrapper
              options={channelOptions}
              series={channelSeries}
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
              <Button 
                startIcon={<FilterListIcon />} 
                onClick={toggleFilters}
                variant={showFilters ? "contained" : "outlined"}
                color="primary"
                size="small"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Box>

            {/* Filters */}
            {showFilters && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Date</InputLabel>
                      <Select
                        value={dateFilter}
                        label="Date"
                        onChange={(e) => setDateFilter(e.target.value)}
                      >
                        <MenuItem value="">All Dates</MenuItem>
                        {uniqueDates.map(date => (
                          <MenuItem key={date} value={date}>{date}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                {filteredEmails.map((email) => (
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
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}