import React from "react";
import { NavigationItemType } from "../../../models/Ui";
import NavigationItemHeader from "./NavigationItemHeader";

import NavigationItemNested from "./NavigationItemNested";
import NavigationItemSimple from "./NavigationItemSimple";
interface Props {
  item: NavigationItemType;
}

export default function NavigationItem({ item }: Props) {
  const isSimple = "path" in item;
  const isHeader = "header" in item;

  if (isHeader) {
    return <NavigationItemHeader header={item.header} />;
  }

  return isSimple ? (
    <NavigationItemSimple item={item} />
  ) : (
    <NavigationItemNested item={item} />
  );
}
