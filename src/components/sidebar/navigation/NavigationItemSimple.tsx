import React, { useCallback } from "react";
import {
  NavigationItemIconProps,
  NavigationItemSimpleType,
  NavigationItemSimpleTypeWithoutIcon,
} from "../../../models/Ui";
import { useNavigate } from "react-router-dom";
import { NavigationListItemButton } from "./styled/NavigationListItemButton";
import { NavigationListItemIcon } from "./styled/NavigationListItemIcon";
import { NavigationListItemNestedIcon } from "./styled/NavigationListItemNestedIcon";
import { ListItemText, Stack, Typography, Zoom } from "@mui/material";
import { Circle, Launch } from "@mui/icons-material";
import { listItemPrimaryTypographyProps } from "./constants/listItemProps";
import { NavigationItemBadge } from "./styled/NavigationItemBadge";

interface Props {
  iconColor?: NavigationItemIconProps["color"];
  nested?: boolean;
  item: NavigationItemSimpleType | NavigationItemSimpleTypeWithoutIcon;
  animateOn?: boolean;
}

export default function NavigationItemSimple({
  item,
  nested = false,
  animateOn,
}: Props) {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const isActive = location === item.path;
  const handleClick = useCallback(() => {
    navigate(item.path);
  }, [item.path, navigate]);

  const iconProps: NavigationItemIconProps = {
    fontSize: nested ? "small" : "medium",
  };

  const shouldDisplayBadge = Boolean(item?.badgeText) && !item?.external;
  const shouldDisplayLaunchIcon = item?.external && !shouldDisplayBadge;

  return (
    <NavigationListItemButton
      nested={nested}
      onClick={handleClick}
      active={isActive}
      disabled={item.disabled}
    >
      {!nested && "icon" in item ? (
        <NavigationListItemIcon>{item.icon(iconProps)}</NavigationListItemIcon>
      ) : (
        <NavigationListItemNestedIcon>
          <Zoom in={animateOn}>
            <Circle color={"inherit"} fontSize={"inherit"} />
          </Zoom>
        </NavigationListItemNestedIcon>
      )}
      <Stack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        minWidth={0}
        overflow={"hidden"}
        flex={1}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={listItemPrimaryTypographyProps}
          sx={{ margin: 0, minWidth: 0, maxWidth: "100%" }}
        />
        {item?.description ? (
          <Typography
            variant={"caption"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            maxWidth={"100%"}
          >
            {item.description}
          </Typography>
        ) : null}
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {shouldDisplayLaunchIcon ? <Launch /> : null}
        {shouldDisplayBadge ? (
          <NavigationItemBadge
            badgeContent={item.badgeText}
            sx={{ display: "flex" }}
            color={item?.badgeColor ? item.badgeColor : "default"}
          />
        ) : null}
      </Stack>
    </NavigationListItemButton>
  );
}
