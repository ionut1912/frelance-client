import React, { memo, useState, useCallback, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordLegend from "../PasswordLegend";
import { RegisterDto } from "../../models/Accounts";
import { registerUser } from "../../store/auth/thunks";
import { RootState, AppDispatch } from "../../store";

const INITIAL_VALUES: Omit<RegisterDto, "role"> = {
  email: "",
  username: "",
  password: "",
  phoneNumber: "",
};

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const role = useSelector((state: RootState) => state.auth.role);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        username: Yup.string().required("Required"),
        password: Yup.string().min(6, "Too short").required("Required"),
        phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, "Only digits")
          .required("Required"),
      }),
    [],
  );

  const formik = useFormik<Omit<RegisterDto, "role">>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: (values) => {
      if (role) {
        dispatch(registerUser({ payload: { ...values, role }, navigate }));
      }
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" mb={4}>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && (
              <PasswordLegend password={formik.values.password} />
            )}
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              margin="normal"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
};

export default memo(RegisterForm);
