import { Box, TextField } from "@mui/material";
import { UserData } from "../../models/UserProfile";
import CameraCapture from "../CameraCapture";

interface UserDataFormProps {
  userData: UserData;
  onChange: (field: keyof UserData, value: string | null) => void;
}

export default function UserDataForm({
  userData,
  onChange,
}: UserDataFormProps) {
  return (
    <Box mt={2}>
      <TextField
        label="Bio"
        value={userData.bio}
        onChange={(e) => onChange("bio", e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <CameraCapture userData={userData} onChange={onChange} />
    </Box>
  );
}
