import { useState, useCallback } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string | undefined | boolean;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );

  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={togglePassword}
              aria-label="toggle password"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
