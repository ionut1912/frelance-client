import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.fontSize * 2.5,
  fontWeight: theme.typography.fontWeightBold,
}));
