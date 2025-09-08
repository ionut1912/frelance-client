import { useState } from "react";
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
import VerifyPhoto from "./VerifyPhoto";
import {
  AddressData,
  CreateClientProfileRequest,
  UserData,
} from "../models/UserProfile";
import AddressForm from "./forms/AddressForm";
import UserDataForm from "./forms/UserDataForm";
import { useNavigate } from "react-router-dom";
import { saveClientProfile } from "../store/user-profile/thunks";

export default function ClientPage() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(
    (state: RootState) => state.userProfile.clientProfiles?.[0],
  );
  const navigate = useNavigate();
  const steps = ["Address Details", "User Details"];
  const [activeStep, setActiveStep] = useState(0);

  const initialAddressData: AddressData = {
    addressCountry: "",
    addressCity: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressZip: "",
  };
  const initialUserData: UserData = { bio: "", image: "" };

  const [addressData, setAddressData] =
    useState<AddressData>(initialAddressData);
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (addressData && userData) {
        const createClientProfileRequest: CreateClientProfileRequest = {
          address: addressData,
          user: userData,
        };
        dispatch(saveClientProfile(createClientProfileRequest));
        navigate("/client");
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const isNextDisabled =
    (activeStep === 0 &&
      Object.values(addressData).every((value) => value === "")) ||
    (activeStep === 1 &&
      Object.values(userData).every((value) => value === ""));

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            addressData={addressData}
            onChange={(field, value) =>
              setAddressData({ ...addressData, [field]: value })
            }
          />
        );
      case 1:
        return (
          <UserDataForm
            userData={userData}
            onChange={(field, value) =>
              setUserData({ ...userData, [field]: value })
            }
          />
        );
      default:
        return "Unknown step";
    }
  };

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
        {activeStep !== steps.length && (
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
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
