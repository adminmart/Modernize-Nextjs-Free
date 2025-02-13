"use client";
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const TimeSlots = ["9:00 - 10:30", "10:30 - 12:00", "14:00 - 15:30", "15:30 - 17:00", "17:00 - 18:30", "18:30 - 20:00"];
const Days = ["Monday", "Wednesday", "Friday", "Tuesday", "Thursday", "Saturday"];

const TimetablePage = () => {
  return (
    <PageContainer title="Timetable" description="Class schedule management">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h3" mb={3}>Class Timetable</Typography>
                <Box sx={{ overflowX: 'auto' }}>
                  <Grid container spacing={1}>
                    {/* Header */}
                    <Grid item xs={2}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                        <Typography>Time</Typography>
                      </Paper>
                    </Grid>
                    {Days.map((day) => (
                      <Grid item xs={2} key={day}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                          <Typography>{day}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                    
                    {/* Time slots */}
                    {TimeSlots.map((time) => (
                      <>
                        <Grid item xs={2} key={time}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
                            <Typography>{time}</Typography>
                          </Paper>
                        </Grid>
                        {Days.map((day) => (
                          <Grid item xs={2} key={`${day}-${time}`}>
                            <Paper 
                              sx={{ 
                                p: 2, 
                                textAlign: 'center',
                                minHeight: '80px',
                                cursor: 'pointer',
                                '&:hover': {
                                  bgcolor: 'action.hover'
                                }
                              }}
                            >
                              <Typography variant="body2" color="textSecondary">
                                Click to add class
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TimetablePage;