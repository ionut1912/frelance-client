import { styled } from "@mui/material/styles";
import { UserMenuMenuItem } from "./UserMenuMenuItem";

export const UserMenuMenuItemWithSeparator = styled(UserMenuMenuItem)(
  ({ theme }) => ({
    position: "relative",
    marginTop: theme.spacing(2),

    "&:before": {
      content: '""',
      position: "absolute",
      top: theme.spacing(-1),
      left: 0,
      right: 0,
      width: "100%",
      height: "1px",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  }),
);
