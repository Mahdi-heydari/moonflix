import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";

export default function GlobalLoading() {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsloading(true);
    } else {
      setTimeout(() => {
        setIsloading(false);
      }, 10000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
}
