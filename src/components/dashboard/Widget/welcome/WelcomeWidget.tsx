import React from "react";
import { WelcomeWidgetContainer } from "./styled/WelcomeWidgetContainer";
import { WelcomeWidgetContent } from "./styled/WelcomeWidgetContent";
import { Button, Typography } from "@mui/material";

interface WelcomeWidgetProps {
  title: string;
  description: string;
}

export default function WelcomeWidget({
  title,
  description,
}: WelcomeWidgetProps) {
  return (
    <WelcomeWidgetContainer>
      <WelcomeWidgetContent>
        <Typography variant={"h3"} fontWeight={"fontWeightBold"}>
          {title}
        </Typography>
        <Typography variant={"body1"} mb={1}>
          {description}
        </Typography>
        <Button color={"primary"} variant={"outlined"} size={"small"}>
          Documentation
        </Button>
      </WelcomeWidgetContent>
    </WelcomeWidgetContainer>
  );
}
