import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { Sidebar, Logo } from 'react-mui-sidebar';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Logo img="/images/logos/dark-logo.svg" />
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar >
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Logo img="/images/logos/dark-logo.svg" />
          {/* ------------------------------------------- */}
          {/* Sidebar Items */}
          {/* ------------------------------------------- */}
          <SidebarItems />
          <Upgrade />
        </Sidebar>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}

    </Drawer>
  );
};

export default MSidebar;


// import SidebarItems from "./SidebarItems";
// import { Upgrade } from "./Updrade";
// import { Sidebar, Logo } from 'react-mui-sidebar';

// interface ItemType {
//   isMobileSidebarOpen: boolean;
//   onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
//   isSidebarOpen: boolean;
// }

// const MSidebar = ({
//   isMobileSidebarOpen,
//   onSidebarClose,
//   isSidebarOpen,
// }: ItemType) => {
//   const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));


//   if (lgUp) {
//     return (

//       <Drawer
//         anchor="left"

//         onClose={onSidebarClose}
//         open={isSidebarOpen}
//         variant="permanent"
//         PaperProps={{
//           sx: {
//             width: '270px',
//           },
//         }}
//       >
//         <Sidebar
//           width={'270px'}
//           collapsewidth="80px"
//           open={isSidebarOpen}
//           themeColor="#5d87ff"
//           themeSecondaryColor="#49beff"

//         >
//           {/* ------------------------------------------- */}
//           {/* Logo */}
//           {/* ------------------------------------------- */}
//           <Logo img="/images/logos/dark-logo.svg" />
//           <Box>
//             {/* ------------------------------------------- */}
//             {/* Sidebar Items */}
//             {/* ------------------------------------------- */}
//             <SidebarItems />
//             <Upgrade />
//           </Box>
//         </Sidebar >
//       </Drawer>

//     );
//   }

//   return (
//     <Drawer
//       anchor="left"
//       open={isMobileSidebarOpen}
//       onClose={onSidebarClose}
//       variant="temporary"
//       PaperProps={{
//         sx: {
//           width: '270px',
//           border: '0 !important',
//           boxShadow: (theme) => theme.shadows[8],
//         },
//       }}
//     >
//       <Sidebar
//         width={'270px'}
//         collapsewidth="80px"
//         isCollapse={false}
//         mode="light"
//         direction="ltr"
//         themeColor="#5d87ff"
//         themeSecondaryColor="#49beff"
//       >

//         <Logo img="/images/logos/dark-logo.svg" />

//         <SidebarItems />
//         <Upgrade />
//       </Sidebar>
//     </Drawer >
//   );
// };

// export default MSidebar;
