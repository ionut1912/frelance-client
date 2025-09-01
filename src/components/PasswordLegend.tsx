import { memo, useMemo } from "react";
import { Typography } from "@mui/material";

export type PasswordLegendProps = {
  password: string;
};

const rules = [
  { label: "min 8 characters", test: (s: string) => s.length >= 8 },
  {
    label: "a special character",
    test: (s: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(s),
  },
  { label: "an uppercase letter", test: (s: string) => /[A-Z]/.test(s) },
  { label: "a lowercase letter", test: (s: string) => /[a-z]/.test(s) },
] as const;

function PasswordLegend({ password }: PasswordLegendProps) {
  const unmetRules = useMemo(() => {
    return rules.filter((rule) => !rule.test(password));
  }, [password]);

  if (unmetRules.length === 0) return null;

  return (
    <Typography
      component="ul"
      sx={{ pl: 2, listStyleType: "disc" }}
      className="text-sm text-gray-600 mt-2"
      role="list"
      aria-label="password requirements"
    >
      {unmetRules.map((rule) => (
        <li key={rule.label}>{rule.label}</li>
      ))}
    </Typography>
  );
}

export default memo(PasswordLegend);
