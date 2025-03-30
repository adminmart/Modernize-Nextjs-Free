import { useMediaQuery, Box, Drawer, styled, Typography } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '270px',
    border: 'none',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  },
}));

const LogoWrapper = styled(Box)({
  padding: '20px 20px 0px 20px',
  textAlign: 'center',
});

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarContent = (
    <>
      <LogoWrapper>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Innovative Centre
        </Typography>
      </LogoWrapper>
      <Box sx={{ px: 3 }}>
        <SidebarItems />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <StyledDrawer
        variant="permanent"
        open={isSidebarOpen}
        anchor="left"
        sx={{
          '& .MuiDrawer-paper': {
            transform: isSidebarOpen ? 'none' : 'translateX(-270px)',
          },
        }}
      >
        {sidebarContent}
      </StyledDrawer>
    );
  }

  return (
    <StyledDrawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': {
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {sidebarContent}
    </StyledDrawer>
  );
};

export default MSidebar;
