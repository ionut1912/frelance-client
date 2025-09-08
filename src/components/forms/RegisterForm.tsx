import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { registerUser } from "../../store/auth/thunks";
import { RegisterDto } from "../../models/Accounts";
import { useForm } from "../../hooks/useForm";
import * as Yup from "yup";
import PasswordInput from "./common/PasswordInput";

const INITIAL_VALUES: Omit<RegisterDto, "role"> = {
  email: "",
  username: "",
  password: "",
  phoneNumber: "",
};

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);

  const formik = useForm<Omit<RegisterDto, "role">>(
    INITIAL_VALUES,
    Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password too short")
        .required("Password is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Only digits")
        .required("Phone number is required"),
    }),
    (values) =>
      role &&
      dispatch(registerUser({ payload: { ...values, role }, navigate })),
    true,
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={4}>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            {["email", "username", "phoneNumber"].map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                margin="normal"
                value={formik.values[field as keyof typeof INITIAL_VALUES]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(
                    formik.touched[field as keyof typeof INITIAL_VALUES] &&
                    formik.errors[field as keyof typeof INITIAL_VALUES]
                  )
                }
                helperText={
                  formik.touched[field as keyof typeof INITIAL_VALUES] &&
                  formik.errors[field as keyof typeof INITIAL_VALUES]
                }
                name={field}
              />
            ))}
            <PasswordInput
              label="Password"
              value={formik.values.password}
              onChange={(value) => formik.setFieldValue("password", value)}
              onBlur={() => formik.setFieldTouched("password", true)}
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                type="submit"
                variant="contained"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Create Account
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
