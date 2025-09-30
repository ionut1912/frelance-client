import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UserMenuIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `2px solid ${theme.palette.divider}`,

  "& img": {
    width: "100%",
  },
}));
