import React, { useState, useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../store/auth/actions";
import { UserRole } from "../store/auth/types";

export default function RoleSelection() {
  const dispatch = useDispatch();
  const [role, setRoleState] = useState<UserRole>("Client");

  const roles = [
    {
      value: "Client" as const,
      icon: "👔",
      label: "I'm a client, hiring for a project",
    },
    {
      value: "Freelancer" as const,
      icon: "💻",
      label: "I'm a freelancer, looking for work",
    },
  ];

  const choose = useCallback(
    (newRole: UserRole) => {
      setRoleState(newRole);
      dispatch(setRole(newRole));
    },
    [dispatch],
  );

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen px-4">
      <RadioGroup
        value={role}
        onChange={(e) => choose(e.target.value as UserRole)}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: 700, mx: "auto" }}
        >
          {roles.map(({ value, icon, label }) => (
            <Grid key={value} size={{ xs: 12, sm: 6 }}>
              <Card
                className={`w-full h-full shadow-lg ${
                  role === value ? "border-2 border-blue-500" : ""
                }`}
              >
                <CardActionArea onClick={() => choose(value)}>
                  <FormControlLabel
                    value={value}
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <CardContent className="flex flex-col items-center py-8">
                        <span className="text-4xl mb-4">{icon}</span>
                        <Typography
                          variant="h6"
                          align="center"
                          className="font-semibold"
                        >
                          {label}
                        </Typography>
                      </CardContent>
                    }
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>

      <Box className="w-full max-w-sm flex flex-col items-center mt-10">
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          className="w-full"
          sx={{ textTransform: "none", py: 1.5 }}
        >
          Join as {role}
        </Button>
        <Typography variant="body2" className="text-center mt-3">
          <Link to="/login" className="text-gray-700">
            Already have an account?{" "}
            <span className="text-green-600">Log In</span>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
