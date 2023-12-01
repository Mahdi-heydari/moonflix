import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";

export default function MainLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {/* global loading */}
      <GlobalLoading />

      {/* loging Modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>

      {/* footer */}
    </>
  );
}
