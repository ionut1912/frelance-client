import { ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavigationListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "36px",
  fontSize: "0.5rem",
  color: theme.palette.text.primary,
}));
