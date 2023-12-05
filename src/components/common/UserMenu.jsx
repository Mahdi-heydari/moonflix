import { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import menuConfigs from "../../config/menu.configs";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";


export default function UserMenu() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>


      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
                <ListItemButton key={index} component={Link} to={item.path} onClick={()=> setAnchorEl(null)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText disableTypography primary={
                    <Typography textTransform="uppercase">{item.display}</Typography>}
                    />
                </ListItemButton>
            ))}

            <ListItemButton sx={{borderRadius:"10px"}} onClick={()=> setAnchorEl(null)}>
                <ListItemIcon><LogoutOutlined/></ListItemIcon>
                <ListItemText disableTypography primary={
                    <Typography textTransform="uppercase">sign out</Typography>
                }/>
            </ListItemButton>
          </Menu>
        </>
      )}



    </>
  );
}
