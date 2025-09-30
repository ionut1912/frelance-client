import React from "react";
import { UserRole } from "../../models/UserProfile";
import { useCurrentUser } from "../../hooks/useCurerentUser";
import UserMenu from "./user-menu/UserMenu";
import { Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
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
      <TextField
        variant={"outlined"}
        size={"small"}
        placeholder={"Search..."}
        InputProps={{
          endAdornment: <Search sx={{ color: "grey.500" }} />,
        }}
      />
      <UserMenu profile={profile!} />
    </Stack>
  );
}
