import { Menu } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UserMenuMenu = styled(Menu)(({ theme }) => ({
  marginTop: theme.spacing(1),
  "& .MuiPaper-root": {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[0],
  },
}));
