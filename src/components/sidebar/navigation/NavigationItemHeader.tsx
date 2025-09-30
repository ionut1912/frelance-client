import { ListSubheader } from "@mui/material";
import React from "react";

interface NavigationItemHeaderProps {
  header: string;
}

export default function NavigationItemHeader({
  header,
}: NavigationItemHeaderProps) {
  return (
    <ListSubheader
      component="div"
      id="nested-list-subheader"
      sx={{
        textTransform: "uppercase",
        fontSize: "12px",
        fontWeight: "fontWeightBold",
        pl: 2.2,
        color: "text.secondary",
        backgroundColor: "transparent",
        position: "relative",
        letterSpacing: "1px",
      }}
    >
      {header}
    </ListSubheader>
  );
}
