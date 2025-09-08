import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { loginUser } from "../../store/auth/thunks";
import { LoginDto } from "../../models/Accounts";
import { useForm } from "../../hooks/useForm";
import * as Yup from "yup";
import PasswordInput from "./common/PasswordInput";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useForm<LoginDto>(
    { username: "", password: "" },
    Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    (values) => dispatch(loginUser({ payload: values, navigate })),
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
      <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={3}>
            Log In
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <PasswordInput
              label="Password"
              value={formik.values.password}
              onChange={(value) => formik.setFieldValue("password", value)}
              onBlur={() => formik.setFieldTouched("password", true)}
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                Log In
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
