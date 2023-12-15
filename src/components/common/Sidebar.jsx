import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";

import Logo from "./Logo";
import menuConfigs from "../../config/menu.configs";
import uiConfigs from "../../config/ui.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";



export default function Sidebar({ open, onToggleSidebar }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwithTheme = () => {
    const theme = themeMode === "dark" ? "light" : "dark";
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>

      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">MENU</Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => onToggleSidebar(false)}
          >
            {/*    */}
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
            {/*    */}
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">PERSONAL</Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => onToggleSidebar(false)}
              >
                {/*    */}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
                {/*    */}
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">THEME</Typography>
        <ListItemButton>
          <ListItemIcon>
            {themeMode === "dark" && <DarkModeOutlined />}
            {themeMode === "light" && <WbSunnyOutlined />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography textTransform="uppercase">{themeMode === themeMode.dark ? "dark mode" : "light mode"}</Typography>}
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => onToggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >{drawer}</Drawer>
  );
}
