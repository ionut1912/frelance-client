import { useEffect } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddressData } from "../../models/UserProfile";
import { AppDispatch, RootState } from "../../store";
import { loadCities } from "../../store/city/thunks";
import { loadCountries } from "../../store/country/thunks";

interface AddressFormProps {
  addressData: AddressData;
  onChange: (field: keyof AddressData, value: string) => void;
}

export default function AddressForm({
  addressData,
  onChange,
}: AddressFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(
    (state: RootState) => state.country.countries || [],
  );
  const cities = useSelector((state: RootState) => state.city.cities || []);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (addressData.addressCountry) {
      dispatch(loadCities({ country: addressData.addressCountry }));
    }
  }, [addressData.addressCountry, dispatch]);

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
          <TextField
            {...params}
            label="City / Town / Village"
            fullWidth
            margin="normal"
          />
        )}
        disabled={!addressData.addressCountry}
      />
      <TextField
        label="Street"
        value={addressData.addressStreet}
        onChange={(e) => onChange("addressStreet", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Street Number"
        value={addressData.addressStreetNumber}
        onChange={(e) => onChange("addressStreetNumber", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ZIP"
        value={addressData.addressZip}
        onChange={(e) => onChange("addressZip", e.target.value)}
        fullWidth
        margin="normal"
      />
    </Box>
  );
}
