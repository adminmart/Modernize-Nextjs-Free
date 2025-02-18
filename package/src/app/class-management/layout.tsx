"use client";
import { styled, Container, Box, useMediaQuery, Theme } from "@mui/material";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { useState, useEffect } from "react";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  position: "relative",
}));

const PageWrapper = styled("div")<{ isSidebarOpen: boolean }>(({ theme, isSidebarOpen }) => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  transition: "width 0.2s ease-in-out, padding-left 0.2s ease-in-out",
  width: "100%",
  paddingLeft: isSidebarOpen ? "270px" : "0",
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "0",
    width: "100%",
  },
}));

export default function ClassManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  // Close sidebar on mobile by default
  useEffect(() => {
    if (!lgUp) {
      setSidebarOpen(false);
    }
  }, [lgUp]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper isSidebarOpen={isSidebarOpen}>
        <Header 
          toggleMobileSidebar={toggleMobileSidebar}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}