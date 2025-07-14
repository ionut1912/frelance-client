import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import PasswordLegend from '../PasswordLegend';


const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);


  const validationSchema = Yup.object({
    email: Yup.string()
      .email('The given email address is not in an email format')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // dispatch(login({ payload: values }));
      console.log('login payload', values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent>
          <Typography variant="h5" component="h2" className="text-center mb-6">
            Log In
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            {/* Email */}
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Username */}
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              margin="normal"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            {/* Password */}
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              margin="normal"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password legend (visible after first focus/blur) */}
            {formik.touched.password && (
              <PasswordLegend password={formik.values.password} />
            )}

            <div className="flex justify-end mt-6">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!formik.isValid}
              >
                Log In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
