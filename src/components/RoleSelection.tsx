import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function RoleSelection() {
  const [role, setRole] = useState("Client");

  const roles = [
    {
      value: "Client",
      icon: "👔",
      label: "I'm a client, hiring for a project",
    },
    {
      value: "Freelancer",
      icon: "💻",
      label: "I'm a freelancer, looking for work",
    },
  ];

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen px-4">

      <RadioGroup value={role} onChange={(e) => setRole(e.target.value)}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: 700, marginX: "auto" }} 
        >
          {roles.map(({ value, icon, label }) => (
            <Grid item xs={12} sm={6} key={value}>
              <Card className="w-full h-full shadow-lg">
                <CardActionArea>
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

      {/* action area */}
      <Box className="w-full max-w-sm flex flex-col items-center mt-10">
        <Button
          component={Link}
          to="/register"
          state={{ role }}
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
