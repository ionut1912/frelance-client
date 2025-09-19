import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import AddressForm from "./forms/AddressForm";
import UserDataForm from "./forms/UserDataForm";
import VerifyPhoto from "./VerifyPhoto";
import {
  loadCurrentUserProfile,
  saveClientProfile,
} from "../store/user-profile/thunks";
import {
  AddressData,
  CreateClientProfileRequest,
  UserData,
} from "../models/UserProfile";

const steps = ["Address Details", "User Details"];

export default function ClientPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector(
    (state: RootState) => state.userProfile.clientProfiles?.[0],
  );

  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState<AddressData>({
    addressCountry: "",
    addressCity: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressZip: "",
  });
  const [userData, setUserData] = useState<UserData>({ bio: "", image: "" });
  useEffect(() => {
    dispatch(loadCurrentUserProfile());
  }, [dispatch]);
  const handleNext = useCallback(() => {
    if (activeStep === steps.length - 1) {
      dispatch(
        saveClientProfile({
          address: addressData,
          user: userData,
        } as CreateClientProfileRequest),
      );
      navigate("/client");
    } else setActiveStep((prev) => prev + 1);
  }, [activeStep, addressData, userData, dispatch, navigate]);

  const handleBack = useCallback(() => setActiveStep((prev) => prev - 1), []);

  const isNextDisabled =
    activeStep === 0
      ? Object.values(addressData).every((v) => !v)
      : Object.values(userData).every((v) => !v);

  const getStepContent = useCallback(
    (step: number) => {
      const handlers = [
        <AddressForm
          key={step}
          addressData={addressData}
          onChange={(field, value) =>
            setAddressData({ ...addressData, [field]: value })
          }
        />,
        <UserDataForm
          key={step}
          userData={userData}
          onChange={(field, value) =>
            setUserData({ ...userData, [field]: value })
          }
        />,
      ];
      return handlers[step] || null;
    },
    [addressData, userData],
  );

  if (profile) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h2">Hello, {profile.user.username}</Typography>
        {!profile.isVerified && <VerifyPhoto profile={profile} />}
      </Box>
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
        {getStepContent(activeStep)}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
