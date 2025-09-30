import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WidgetContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "column",
  height: "100%",
  display: "flex",
}));
