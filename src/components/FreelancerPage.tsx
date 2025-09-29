import { useState, useEffect } from "react";
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
import FreelancerDataForm from "./forms/FreelancerDataForm";
import VerifyPhoto from "./VerifyPhoto";
import {
  loadCurrentUserProfile,
  saveFreelancerProfile,
} from "../store/user-profile/thunks";
import {
  AddressData,
  CreateFreelancerProfileRequest,
  FreelancerData,
  UserData,
} from "../models/UserProfile";
import Spinner from "./Spinner";

const steps = ["Address Details", "User Details", "Freelancer Details"];

export default function FreelancerPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector(
    (state: RootState) => state.userProfile.freelancerProfiles?.[0],
  );
  const loading = useSelector((state: RootState) => state.userProfile.loading);

  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState<AddressData>({
    addressCountry: "",
    addressCity: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressZip: "",
  });
  const [userData, setUserData] = useState<UserData>({ bio: "", image: "" });
  const [freelancerData, setFreelancerData] = useState<FreelancerData>({
    programmingLanguages: [],
    areas: [],
    foreignLanguages: [],
    experience: "",
    rate: 0,
    currency: "",
    portfolioUrl: "",
  });

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

  let content = null;
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
        onSubmit={(vals) => {
          setUserData(vals);
          setActiveStep(2);
        }}
      />
    );
  } else {
    content = (
      <FreelancerDataForm
        key="step-2"
        initialValues={freelancerData}
        onSubmit={(vals) => {
          setFreelancerData(vals);
          dispatch(
            saveFreelancerProfile({
              address: addressData,
              user: userData,
              freelancer: vals,
            } as CreateFreelancerProfileRequest),
          );
          navigate("/freelancer");
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
