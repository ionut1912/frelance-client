import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loadCities } from "../store/city/thunks";
import { loadCountries } from "../store/country/thunks";

export const useAddressData = (country?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(
    (state: RootState) => state.country.countries || [],
  );
  const cities = useSelector((state: RootState) => state.city.cities || []);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (country) {
      dispatch(loadCities({ country }));
    }
  }, [country, dispatch]);

  return { countries, cities };
};
