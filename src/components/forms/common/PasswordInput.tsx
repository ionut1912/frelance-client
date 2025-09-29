import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: ReactNode;
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
  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);

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
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={togglePassword}
                onMouseDown={(e) => e.preventDefault()} // păstrează focusul în input
                aria-label="toggle password visibility"
                aria-pressed={showPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
