import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export default function Logo() {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Moon <span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
}
