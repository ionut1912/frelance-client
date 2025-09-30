import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WelcomeWidgetContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  alignItems: "flex-start",
  gap: theme.spacing(1),
  boxShadow: "inner",
  zIndex: 2,
}));
