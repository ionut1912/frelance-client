import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { NavigationListItemButtonProps } from "../../../../models/Ui";

export const NavigationListItemButton = styled(ListItemButton, {
  name: "FoxUiNavigationItem",
  slot: "button",
  shouldForwardProp: (prop) => prop !== "active" && prop !== "nested",
})<PropsWithChildren<NavigationListItemButtonProps & ListItemButtonProps>>(
  ({ theme, active, nested }) => ({
    borderRadius: theme.shape.borderRadius,
    paddingLeft: nested ? theme.spacing(2) : theme.spacing(2),
    paddingTop: nested ? theme.spacing(0.5) : theme.spacing(1),
    paddingBottom: nested ? theme.spacing(0.5) : theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: "relative",
    gap: theme.spacing(1),
    minHeight: nested ? "0" : "55px",
    transition: theme.transitions.create([
      "background-color",
      "color",
      "border",
    ]),

    ".MuiSvgIcon-root": {
      transition: theme.transitions.create(["color"]),
    },

    "&:hover": {
      backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
    },
    ...(active && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      ".MuiSvgIcon-root": {
        color: theme.palette.primary.contrastText,
      },

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        ".MuiSvgIcon-root": {
          color: theme.palette.primary.contrastText,
        },
      },
    }),
  }),
);
