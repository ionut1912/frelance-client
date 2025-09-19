import { Box, TextField, Autocomplete } from "@mui/material";
import { AddressData } from "../../models/UserProfile";
import { useAddressData } from "../../hooks/useAddressData";

interface AddressFormProps {
  addressData: AddressData;
  onChange: (field: keyof AddressData, value: string) => void;
}

export default function AddressForm({
  addressData,
  onChange,
}: AddressFormProps) {
  const { countries, cities } = useAddressData(addressData.addressCountry);

  return (
    <Box sx={{ mt: 2 }}>
      <Autocomplete
        options={countries}
        value={addressData.addressCountry}
        onChange={(_, newValue) => onChange("addressCountry", newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="Country" fullWidth margin="normal" />
        )}
      />
      <Autocomplete
        options={cities}
        value={addressData.addressCity}
        onChange={(_, newValue) => onChange("addressCity", newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="City" fullWidth margin="normal" />
        )}
        disabled={!addressData.addressCountry}
      />
      {["Street", "Street Number", "Zip"].map((label) => {
        const key = `address${label.replace(" ", "")}` as keyof AddressData;
        return (
          <TextField
            key={key}
            label={label}
            value={addressData[key]}
            onChange={(e) => onChange(key, e.target.value)}
            fullWidth
            margin="normal"
          />
        );
      })}
    </Box>
  );
}
