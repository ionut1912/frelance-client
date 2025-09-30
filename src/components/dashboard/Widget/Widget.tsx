import { Box, BoxProps, Paper } from "@mui/material";
import { ReactNode } from "react";
import { WidgetContainer } from "./stylled/WidgetContainer";
import { WidgetTitleContainer } from "./stylled/WidgetTitleContainer";
import { WidgetTitle } from "./stylled/WidgetTitle";

export interface WidgetProps {
  title: string;
  children?: ReactNode;
  sx?: BoxProps["sx"];
  contentHeight?: string;
}

export default function Widget({
  title,
  children,
  sx,
  contentHeight,
}: WidgetProps) {
  return (
    <WidgetContainer sx={sx} as={Paper}>
      <WidgetTitleContainer>
        <WidgetTitle>{title}</WidgetTitle>
      </WidgetTitleContainer>
      <Box sx={{ flexGrow: 1, height: contentHeight }}>
        <Box height={"100%"}>{children}</Box>
      </Box>
    </WidgetContainer>
  );
}
