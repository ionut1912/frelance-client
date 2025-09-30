import React, { useCallback } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import NavigationItemSimple from "./NavigationItemSimple";
import { NavigationItemNestedType } from "../../../models/Ui";
import { NavigationListItemButton } from "./styled/NavigationListItemButton";
import { NavigationListItemIcon } from "./styled/NavigationListItemIcon";
import { Collapse, List, ListItemText, Stack, Typography } from "@mui/material";
import { listItemPrimaryTypographyProps } from "./constants/listItemProps";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
interface Props {
  item: NavigationItemNestedType;
}
export default function NavigationItemNested({ item }: Props) {
  const { getIsOpen, toggleNavigationId } = useAppNavigation();
  const isOpen = getIsOpen(item.label);

  const handleToggleOpen = useCallback(() => {
    toggleNavigationId(item.label);
  }, [item.label, toggleNavigationId]);

  const nestedItems = item.items.map((item) => {
    return (
      <NavigationItemSimple
        key={item.path}
        item={item}
        nested
        animateOn={isOpen}
      />
    );
  });

  return (
    <>
      <NavigationListItemButton
        onClick={handleToggleOpen}
        disabled={item.disabled}
      >
        <NavigationListItemIcon>{item.icon({})}</NavigationListItemIcon>
        <Stack flex={1}>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={listItemPrimaryTypographyProps}
            sx={{ margin: 0 }}
          />
          {item?.description ? (
            <Typography variant={"caption"}>{item.description}</Typography>
          ) : null}
        </Stack>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </NavigationListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div">{nestedItems}</List>
      </Collapse>
    </>
  );
}
