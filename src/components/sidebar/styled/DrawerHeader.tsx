import { styled } from "@mui/material/styles";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(4, 1, 0, 4),
  // necessary for content to be below app bar
  justifyContent: "space-between",
}));
