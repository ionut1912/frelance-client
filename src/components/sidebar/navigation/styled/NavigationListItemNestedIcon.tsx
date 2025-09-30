import { ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavigationListItemNestedIcon = styled(ListItemIcon)(
  ({ theme }) => ({
    minWidth: "36px",
    fontSize: "0.5rem",
    paddingLeft: theme.spacing(1),
  }),
);
