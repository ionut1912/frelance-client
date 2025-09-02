import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loadCurrentUserProfile } from "../store/user-profile/thunks";
import VerifyPhoto from "./VerifyPhoto";

export default function ClientPage() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(
    (state: RootState) => state.userProfile.clientProfiles?.[0],
  );

  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Address Details", "User Details"];

  useEffect(() => {
    dispatch(loadCurrentUserProfile());
  }, [dispatch]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField label="First Name" fullWidth margin="normal" />
            <TextField label="Last Name" fullWidth margin="normal" />
          </Box>
        );
      case 1:
        return (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Phone" fullWidth margin="normal" />
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  if (profile) {
    return (
      <div className="text-center p-4">
        <Typography variant="h2">Hello, {profile.user.username}</Typography>
        {!profile.isVerified && <VerifyPhoto profile={profile} />}
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed!</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep)}
            <Box sx={{ mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
