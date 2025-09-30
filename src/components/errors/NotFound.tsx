import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { navigateByRole } from "../../utils/authUtils";

export default function NotFound() {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  const handleReturnHome = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigateByRole(role!, navigate);
    }
  };
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-9xl font-bold text-primary-600">404</div>
        <Typography variant="h4" className="text-gray-700">
          Page Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReturnHome}
          className="mt-8"
        >
          Return Home
        </Button>
      </div>
    </Container>
  );
}
