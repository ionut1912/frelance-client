import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LogoImgContainer = styled(Box, {
  name: "FreelanceHubLogo",
  slot: "imgContainer",
  shouldForwardProp: (prop) => prop !== "invertImage",
})<{ invertImage?: boolean }>(({ invertImage }) => ({
  filter: `invert(${invertImage ? "1" : "0"})`,
}));
