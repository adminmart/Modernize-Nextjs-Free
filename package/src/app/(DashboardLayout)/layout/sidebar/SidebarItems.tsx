import React from "react";
import Menuitems from "./MenuItems";
import { Box, Typography } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";


const renderMenuItems = (items: any, pathDirect: any) => {



  return items.map((item: any) => {


    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader

      return (
        <Box sx={{
          margin: "0 -24px", textTransform: 'uppercase',

        }
        } key={item.subheader} >
          <Menu
            subHeading={item.subheader}
            key={item.subheader}

          />
        </Box >
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <MenuItem
        key={item.id}
        isSelected={pathDirect === item?.href}
        borderRadius='8px'
        icon={
          item.icon ? React.createElement(item.icon, { stroke: 1.5, size: "1.3rem" }) : <IconPoint stroke={1.5} size="1.3rem" />
        }
        component="div"
        link={item.href && item.href !== "" ? item.href : undefined}
        target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}
        disabled={item.disabled}
      >
        <Link href={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component='span' color={pathDirect === item?.href ? '#fff' : 'inherit'}>
            {item.title}</Typography>
        </Link>
      </MenuItem >


    );
  });
};


const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: "24px", overflowX: 'hidden' }}>
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#5D87FF"} themeSecondaryColor={'#49beff'}>
        <Box sx={{ margin: "0 -24px", }}>
          <Logo img='/images/logos/dark-logo.svg' component={Link} to="/" >Modernize</Logo>
        </Box>
        {renderMenuItems(Menuitems, pathDirect)}
      </MUI_Sidebar>
      <Upgrade />
    </Box>
  );
};
export default SidebarItems;
