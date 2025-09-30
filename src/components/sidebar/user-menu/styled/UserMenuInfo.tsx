import { styled } from "@mui/material/styles";

export const UserMenuInfo = styled("li")(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5, 1.5),
  marginBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
