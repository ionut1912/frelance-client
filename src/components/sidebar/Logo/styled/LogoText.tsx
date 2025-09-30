import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";

export const LogoText = styled(Typography, {
  name: "FreelanceHubLogo",
  slot: "text",
})<PropsWithChildren<TypographyProps>>(({ theme }) => ({
  ...theme.typography.h4,
  fontSize: "1.5rem",
  fontWeight: theme.typography.fontWeightBold,
}));
