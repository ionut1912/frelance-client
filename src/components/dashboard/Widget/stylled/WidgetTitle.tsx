import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WidgetTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.primary,
}));
