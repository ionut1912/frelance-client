import * as React from "react";
import { Box, TextField, Autocomplete, Button } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { AddressData } from "../../models/UserProfile";
import { useAddressData } from "../../hooks/useAddressData";
import Spinner from "../Spinner";
import * as Yup from "yup";
import { useForm } from "../../hooks/useForm";

interface AddressFormProps {
  initialValues?: AddressData;
  onSubmit: (values: AddressData) => void;
}

const DEFAULT_ADDR: AddressData = {
  addressCountry: "",
  addressCity: "",
  addressStreet: "",
  addressStreetNumber: "",
  addressZip: "",
};

export default function AddressForm({
  initialValues = DEFAULT_ADDR,
  onSubmit,
}: AddressFormProps) {
  const frozenInitials = React.useRef(initialValues).current;

  const validationSchema = Yup.object({
    addressCountry: Yup.string().required("Country is required"),
    addressCity: Yup.string().required("City is required"),
    addressStreet: Yup.string().required("Street is required"),
    addressStreetNumber: Yup.string().required("Street number is required"),
    addressZip: Yup.string().required("Zip is required"),
  });

  const formik = useForm<AddressData>(
    frozenInitials,
    validationSchema,
    onSubmit,
    true,
  );

  const { countries = [], cities = [] } = useAddressData(
    formik.values.addressCountry,
  );
  const loadingCountries = useSelector(
    (state: RootState) => state.country.loading,
  );
  const loadingCities = useSelector((state: RootState) => state.city.loading);

  const showCountriesLoading = loadingCountries && countries.length === 0;
  const showCitiesLoading = loadingCities && cities.length === 0;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Autocomplete<string, false, false, false>
        options={countries}
        value={formik.values.addressCountry || null}
        onChange={(_, newValue) => {
          formik.setFieldValue("addressCountry", newValue ?? "");
          formik.setFieldValue("addressCity", "");
          formik.setFieldTouched("addressCountry", true);
        }}
        loading={showCountriesLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            fullWidth
            margin="normal"
            error={
              !!(formik.touched.addressCountry && formik.errors.addressCountry)
            }
            helperText={
              formik.touched.addressCountry && formik.errors.addressCountry
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {showCountriesLoading ? <Spinner /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Autocomplete<string, false, false, false>
        options={cities}
        value={formik.values.addressCity || null}
        onChange={(_, newValue) => {
          formik.setFieldValue("addressCity", newValue ?? "");
          formik.setFieldTouched("addressCity", true);
        }}
        loading={showCitiesLoading}
        disabled={!formik.values.addressCountry}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            fullWidth
            margin="normal"
            error={!!(formik.touched.addressCity && formik.errors.addressCity)}
            helperText={formik.touched.addressCity && formik.errors.addressCity}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {showCitiesLoading ? <Spinner /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <TextField
        label="Street"
        name="addressStreet"
        value={formik.values.addressStreet}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.addressStreet && formik.errors.addressStreet)}
        helperText={formik.touched.addressStreet && formik.errors.addressStreet}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Street Number"
        name="addressStreetNumber"
        value={formik.values.addressStreetNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          !!(
            formik.touched.addressStreetNumber &&
            formik.errors.addressStreetNumber
          )
        }
        helperText={
          formik.touched.addressStreetNumber &&
          formik.errors.addressStreetNumber
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Zip"
        name="addressZip"
        value={formik.values.addressZip}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.addressZip && formik.errors.addressZip)}
        helperText={formik.touched.addressZip && formik.errors.addressZip}
        fullWidth
        margin="normal"
      />

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          type="submit"
          variant="contained"
          disabled={!formik.isValid || !formik.dirty}
        >
          Save Address
        </Button>
      </Box>
    </Box>
  );
}
