"use client";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const ClassesPage = () => {
  return (
    <PageContainer title="Classes" description="Manage your classes">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h3">Classes</Typography>
                  <Button variant="contained" color="primary">
                    Add New Class
                  </Button>
                </Box>
                <Typography>
                  This is a basic class management page. We will add class listings, creation forms,
                  and student management features here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ClassesPage;