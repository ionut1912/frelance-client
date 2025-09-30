import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LogoImg = styled(Box, { name: "FreelanceHubLogo", slot: "img" })<
  BoxProps<"img">
>(({ theme }) => ({
  maxWidth: "40px",
  marginRight: theme.spacing(2),
  filter: `invert(${theme.palette.mode === "light" ? "0" : "1"})`,
}));
