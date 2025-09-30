import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WelcomeWidgetContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 6),
  minHeight: "235px",
  display: "flex",
  position: "relative",
  overflow: "hidden",
}));
