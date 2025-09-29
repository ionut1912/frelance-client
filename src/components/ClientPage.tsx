import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import AddressForm from "./forms/AddressForm";
import UserDataForm from "./forms/UserDataForm";
import {
  loadCurrentUserProfile,
  saveClientProfile,
} from "../store/user-profile/thunks";
import {
  AddressData,
  CreateClientProfileRequest,
  UserData,
} from "../models/UserProfile";
import VerifyPhoto from "./VerifyPhoto";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ClientPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const profile = useSelector(
    (state: RootState) => state.userProfile.clientProfiles?.[0],
  );
  const loading = useSelector((state: RootState) => state.userProfile.loading);
  const steps = ["Address Details", "User Details"];
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

  if (loading) return <Spinner />;

  if (profile) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h2">Hello, {profile.user.username}</Typography>
        {!profile.isVerified && <VerifyPhoto profile={profile} />}
      </Box>
    );
  }

  let content: React.ReactNode = null;

  if (activeStep === 0) {
    content = (
      <AddressForm
        key="step-0"
        initialValues={addressData}
        onSubmit={(vals) => {
          setAddressData(vals);
          setActiveStep(1);
        }}
      />
    );
  } else if (activeStep === 1) {
    content = (
      <UserDataForm
        key="step-1"
        initialValues={userData}
        onSubmit={async (vals) => {
          setUserData(vals);
          await dispatch(
            saveClientProfile({
              address: addressData,
              user: vals,
            } as CreateClientProfileRequest),
          );
          navigate("/client");
        }}
      />
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
        {content}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => s - 1)}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
