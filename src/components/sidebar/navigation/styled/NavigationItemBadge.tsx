import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavigationItemBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    display: "flex",
    position: "relative",
    transform: "none",
  },
}));
