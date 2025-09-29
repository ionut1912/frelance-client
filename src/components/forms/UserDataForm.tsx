import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "../../hooks/useForm";
import { UserData } from "../../models/UserProfile";
import CameraCapture from "../CameraCapture";

interface UserDataFormProps {
  initialValues?: UserData;
  onSubmit: (values: UserData) => void;
}

const DEFAULT_USER: UserData = { bio: "", image: "" };

export default function UserDataForm({
  initialValues = DEFAULT_USER,
  onSubmit,
}: UserDataFormProps) {
  const frozenInitials = React.useRef(initialValues).current;

  const validationSchema = Yup.object({
    bio: Yup.string()
      .trim()
      .min(10, "Bio must be at least 10 characters")
      .required("Bio is required"),
    image: Yup.string().required("Image is required"),
  });

  const formik = useForm<UserData>(
    frozenInitials,
    validationSchema,
    onSubmit,
    true,
  );

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Bio"
        name="bio"
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.bio && formik.errors.bio)}
        helperText={formik.touched.bio && formik.errors.bio}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <CameraCapture
        userData={formik.values}
        onChange={(field, value) => {
          formik.setFieldValue(field, value ?? "");
          formik.setFieldTouched(field, true);
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          type="submit"
          variant="contained"
          disabled={!formik.isValid || !formik.dirty}
        >
          Save User Details
        </Button>
      </Box>
    </Box>
  );
}
