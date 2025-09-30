import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UserMenuMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  fontSize: "14px",
  minWidth: "160px",
}));
