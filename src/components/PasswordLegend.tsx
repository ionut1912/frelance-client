import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  password: string;
}

const PasswordLegend: React.FC<Props> = ({ password }) => {
  const isMinLengthMet = password.length >= 8;
  const isSpecialCharMet = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isUpperCaseMet = /[A-Z]/.test(password);
  const isLowerCaseMet = /[a-z]/.test(password);

  return (
    <div className="text-sm text-gray-600 mt-2">
      <Typography component="ul" sx={{ pl: 2, listStyleType: 'disc' }}>
        {!isMinLengthMet && <li>min 8 characters</li>}
        {!isSpecialCharMet && <li>a special character</li>}
        {!isUpperCaseMet && <li>an uppercase letter</li>}
        {!isLowerCaseMet && <li>a lowercase letter</li>}
      </Typography>
    </div>
  );
};

export default PasswordLegend;
