import React from "react";
import { UserRole } from "../../models/UserProfile";
import { useCurrentUser } from "../../hooks/useCurerentUser";
import UserMenu from "./user-menu/UserMenu";
import { Stack } from "@mui/material";
import Spinner from "../Spinner";
interface ToolbarElementsProps {
  role: UserRole;
}
export default function ToolbarElements({ role }: ToolbarElementsProps) {
  const { freelancerProfile, clientProfile, loading } = useCurrentUser();
  if (loading) {
    return <Spinner />;
  }
  const profile = role === "Freelancer" ? freelancerProfile : clientProfile;

  return (
    <Stack direction={"row"} spacing={2}>
      <UserMenu profile={profile!} />
    </Stack>
  );
}
