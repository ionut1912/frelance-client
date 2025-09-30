import React, { useState } from "react";

import { UserMenuContainer } from "./styled/UserMenuContainer";
import { UserMenuIconButton } from "./styled/UserMenuIconButton";
import UserAvatar from "../UserAvatar";
import { UserMenuMenu } from "./styled/UserMenuMenu";
import {
  ClientProfileDto,
  FreelancerProfileDto,
} from "../../../models/UserProfile";
import { UserMenuInfo } from "./styled/UserMenuInfo";
import { Typography } from "@mui/material";
import { UserMenuMenuItem } from "./styled/UserMenuMenuItem";
import { UserMenuMenuItemWithSeparator } from "./styled/UserMenuMenuItemWithSeparator";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth/slice";

interface UserMenuProps {
  profile: ClientProfileDto | FreelancerProfileDto;
}
export default function UserMenu({ profile }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <UserMenuContainer>
      <UserMenuIconButton sx={{ padding: 0 }} onClick={handleClick}>
        <UserAvatar profile={profile} />
      </UserMenuIconButton>
      <UserMenuMenu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <UserMenuInfo>
          <Typography fontSize={14} color={"text.secondary"}>
            {profile.user.email}
          </Typography>
        </UserMenuInfo>
        <UserMenuMenuItem onClick={handleClose}>Profile</UserMenuMenuItem>
        <UserMenuMenuItem onClick={handleClose}>My account</UserMenuMenuItem>
        <UserMenuMenuItemWithSeparator onClick={handleLogout}>
          Logout
        </UserMenuMenuItemWithSeparator>
      </UserMenuMenu>
    </UserMenuContainer>
  );
}
