import React, { ReactNode } from "react";
import { UserRole } from "../../models/UserProfile";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { AppBar } from "./styled/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ToolbarElements from "./ToolbarElements";
import { drawerWidth } from "./constants";
import { DrawerHeader } from "./styled/DrawerHeader";
import { Logo } from "./Logo/Logo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navigation from "./navigation/Navigation";
import { Main } from "./styled/Main";

interface SideBarLayoutProps {
  children: ReactNode;
  role: UserRole;
}
export default function SideBarLayout({ children, role }: SideBarLayoutProps) {
  const theme = useTheme();
  const { isSidebarOpen, toggleSidebar } = useAppNavigation();

  return (
    <Box>
      <AppBar position="relative" open={isSidebarOpen} color="transparent">
        <Toolbar>
          <Stack
            justifyContent={isSidebarOpen ? "flex-end" : "space-between"}
            direction={"row"}
            flex={1}
            alignItems={"center"}
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            <IconButton
              color="inherit"
              aria-label="open navigation"
              onClick={toggleSidebar}
              edge="start"
              sx={{ mr: 2, ...(isSidebarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <ToolbarElements role={role} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        elevation={0}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Logo role={role} />
          </Stack>
          <IconButton onClick={toggleSidebar}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Navigation role={role} />
      </Drawer>
      <Main open={isSidebarOpen}>
        {/*<DrawerHeader />*/}
        {children}
      </Main>
    </Box>
  );
}
