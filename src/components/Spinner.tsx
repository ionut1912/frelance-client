import React from "react";
import { Box, CircularProgress } from "@mui/material";

/**
 * Full-page centered loading spinner.
 * Adjust size/thickness or wrapper styles as desired.
 */
const Spinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100vh", // fills viewport; tweak if you want a shorter block
    }}
  >
    <CircularProgress size={48} thickness={4} />
  </Box>
);

export default Spinner;
