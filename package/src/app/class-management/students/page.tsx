"use client";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const StudentsPage = () => {
  return (
    <PageContainer title="Students" description="Manage your students">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h3">Students</Typography>
                  <Button variant="contained" color="primary">
                    Add New Student
                  </Button>
                </Box>
                <Typography>
                  This is a basic student management page. We will add student listings,
                  registration forms, and student profiles here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default StudentsPage;