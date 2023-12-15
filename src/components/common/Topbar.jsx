import { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useScrollTrigger,
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import menuConfigs from "../../config/menu.configs";
import { Link } from "react-router-dom";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import UserMenu from "./UserMenu";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Sidebar from "./Sidebar";

const ScrollAppBar = function ({ window, children }) {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === "dark"
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === "dark"
        ? "transparent"
        : "background.paper",
    },
  });
};

function Topbar() {
  const dispatch = useDispatch();
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const onSwithTheme = () => {
    const theme = themeMode === "dark" ? "light" : "dark";
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} onToggleSidebar={toggleSidebar}/>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* Main Menu */}
            <Box
              flexGrow={1}
              alignContent="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
                {themeMode === "dark" && <DarkModeOutlined />}
                {themeMode === "light" && <WbSunnyOutlined />}
              </IconButton>
            </Box>

            {/* User Menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && <Button variant="contained" onClick={()=> dispatch(setAuthModalOpen(true))}>sign in</Button>}
            </Stack>
            {user && <UserMenu/>}

          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
}

export default Topbar;
