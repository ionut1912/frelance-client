import * as React from "react";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Autocomplete, Button } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { useForm } from "../../hooks/useForm";
import { FreelancerData, SkillDto } from "../../models/UserProfile";
import { AppDispatch, RootState } from "../../store";
import { loadSkills } from "../../store/skills/thunks";
import { loadLanguages } from "../../store/language/thunks";
import { Language } from "../../models/ExternalApis";
import Spinner from "../Spinner";

interface FreelancerDataFormProps {
  initialValues?: FreelancerData;
  onSubmit: (values: FreelancerData) => void;
}

const DEFAULT_FREELANCER: FreelancerData = {
  programmingLanguages: [],
  areas: [],
  foreignLanguages: [],
  experience: "",
  rate: 0,
  currency: "",
  portfolioUrl: "",
};

const languageFilter = createFilterOptions<string>({
  ignoreAccents: true,
  ignoreCase: true,
  matchFrom: "any",
  stringify: (o) => o,
  limit: 200,
});

export default function FreelancerDataForm({
  initialValues = DEFAULT_FREELANCER,
  onSubmit,
}: FreelancerDataFormProps) {
  const frozenInitials = React.useRef(initialValues).current;

  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((s: RootState) => s.skill.skills) ?? [];
  const languagesRaw =
    useSelector((s: RootState) => s.language.languages) ?? [];
  const loadingSkills = useSelector((s: RootState) => s.skill.loading);
  const loadingLanguages = useSelector((s: RootState) => s.language.loading);

  useEffect(() => {
    dispatch(loadSkills());
    dispatch(loadLanguages());
  }, [dispatch]);

  const programmingLanguageOptions = useMemo(
    () =>
      Array.from(
        new Set(
          skills
            .map((s: SkillDto) => s?.programmingLanguage)
            .filter((v): v is string => !!v),
        ),
      ).sort(),
    [skills],
  );

  const areaOptions = useMemo(
    () =>
      Array.from(
        new Set(
          skills.map((s: SkillDto) => s?.area).filter((v): v is string => !!v),
        ),
      ).sort(),
    [skills],
  );

  const languageOptions = useMemo(
    () =>
      Array.from(
        new Set(
          languagesRaw
            .map((l: Language) =>
              "name" in l ? (l.name as string) : (l as string),
            )
            .filter((v): v is string => !!v),
        ),
      ).sort(),
    [languagesRaw],
  );

  const validationSchema: Yup.ObjectSchema<FreelancerData> = Yup.object({
    programmingLanguages: Yup.array()
      .of(Yup.string().trim().required())
      .min(1, "Select at least one language")
      .required(),

    areas: Yup.array()
      .of(Yup.string().trim().required())
      .min(1, "Select at least one area")
      .required(),

    foreignLanguages: Yup.array()
      .of(Yup.string().trim().required())
      .max(10, "Too many items")
      .required(),

    experience: Yup.string()
      .trim()
      .min(3, "Too short")
      .required("Experience is required"),

    rate: Yup.number()
      .typeError("Must be a number")
      .min(0, "Must be >= 0")
      .max(10000, "Too high")
      .required("Rate is required"),

    currency: Yup.string()
      .trim()
      .matches(/^[A-Za-z]{3}$/, "Use 3-letter code")
      .required("Currency is required"),

    portfolioUrl: Yup.string()
      .trim()
      .url("Invalid URL")
      .required("Portfolio is required"),
  });

  const formik = useForm<FreelancerData>(
    frozenInitials,
    validationSchema,
    onSubmit,
    true,
  );

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Autocomplete<string, true, false, false>
        multiple
        disableCloseOnSelect
        filterSelectedOptions
        options={programmingLanguageOptions}
        value={formik.values.programmingLanguages || []}
        onChange={(_, v) => {
          formik.setFieldValue("programmingLanguages", v);
          formik.setFieldTouched("programmingLanguages", true);
        }}
        loading={loadingSkills}
        loadingText="Se încarcă limbajele..."
        noOptionsText={loadingSkills ? "Se încarcă..." : "Fără opțiuni"}
        isOptionEqualToValue={(o, v) => o === v}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Programming Languages"
            fullWidth
            margin="normal"
            aria-busy={loadingSkills}
            error={
              !!(
                formik.touched.programmingLanguages &&
                formik.errors.programmingLanguages
              )
            }
            helperText={
              formik.touched.programmingLanguages &&
              formik.errors.programmingLanguages
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingSkills ? <Spinner /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Autocomplete<string, true, false, false>
        multiple
        disableCloseOnSelect
        filterSelectedOptions
        options={areaOptions}
        value={formik.values.areas || []}
        onChange={(_, v) => {
          formik.setFieldValue("areas", v);
          formik.setFieldTouched("areas", true);
        }}
        loading={loadingSkills}
        loadingText="Se încarcă ariile..."
        noOptionsText={loadingSkills ? "Se încarcă..." : "Fără opțiuni"}
        isOptionEqualToValue={(o, v) => o === v}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Areas"
            fullWidth
            margin="normal"
            aria-busy={loadingSkills}
            error={!!(formik.touched.areas && formik.errors.areas)}
            helperText={formik.touched.areas && formik.errors.areas}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingSkills ? <Spinner /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Autocomplete<string, true, false, true>
        multiple
        freeSolo
        disableCloseOnSelect
        filterSelectedOptions
        options={languageOptions}
        filterOptions={languageFilter}
        value={formik.values.foreignLanguages || []}
        onChange={(_, v) => {
          formik.setFieldValue("foreignLanguages", v as string[]);
          formik.setFieldTouched("foreignLanguages", true);
        }}
        loading={loadingLanguages}
        loadingText="Se încarcă limbile străine..."
        noOptionsText={loadingLanguages ? "Se încarcă..." : "Fără opțiuni"}
        isOptionEqualToValue={(o, v) => o === v}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Foreign Languages"
            fullWidth
            margin="normal"
            aria-busy={loadingLanguages}
            error={
              !!(
                formik.touched.foreignLanguages &&
                formik.errors.foreignLanguages
              )
            }
            helperText={
              formik.touched.foreignLanguages && formik.errors.foreignLanguages
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingLanguages ? <Spinner /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <TextField
        label="Experience"
        name="experience"
        value={formik.values.experience || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.experience && formik.errors.experience)}
        helperText={formik.touched.experience && formik.errors.experience}
        fullWidth
        margin="normal"
        placeholder="ex: 5+ ani în dezvoltare backend"
      />

      <TextField
        label="Rate"
        type="number"
        inputProps={{ step: "0.01", min: "0" }}
        value={formik.values.rate ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          formik.setFieldValue("rate", raw === "" ? 0 : Number(raw));
        }}
        onBlur={() => formik.setFieldTouched("rate", true)}
        error={!!(formik.touched.rate && formik.errors.rate)}
        helperText={formik.touched.rate && formik.errors.rate}
        fullWidth
        margin="normal"
        placeholder="ex: 50"
      />

      <TextField
        label="Currency"
        name="currency"
        value={formik.values.currency || ""}
        onChange={(e) =>
          formik.setFieldValue("currency", e.target.value.toUpperCase())
        }
        onBlur={formik.handleBlur}
        error={!!(formik.touched.currency && formik.errors.currency)}
        helperText={formik.touched.currency && formik.errors.currency}
        fullWidth
        margin="normal"
        placeholder="ex: EUR, USD, RON"
      />

      <TextField
        label="Portfolio URL"
        name="portfolioUrl"
        type="url"
        value={formik.values.portfolioUrl || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.portfolioUrl && formik.errors.portfolioUrl)}
        helperText={formik.touched.portfolioUrl && formik.errors.portfolioUrl}
        fullWidth
        margin="normal"
        placeholder="https://example.com"
      />

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          type="submit"
          variant="contained"
          disabled={!formik.isValid || !formik.dirty}
        >
          Save Freelancer Details
        </Button>
      </Box>
    </Box>
  );
}
