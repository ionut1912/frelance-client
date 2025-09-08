import { useFormik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";

export function useForm<T extends FormikValues>(
  initialValues: T,
  validationSchema: Yup.ObjectSchema<T>,
  onSubmit: (values: T) => void,
  validateOnMount: boolean = false,
): FormikProps<T> {
  return useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount,
  });
}
