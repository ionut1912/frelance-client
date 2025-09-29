import * as Yup from "yup";
import { useFormik, FormikProps, FormikValues } from "formik";

export function useForm<T extends FormikValues>(
  initialValues: T,
  validationSchema: Yup.AnyObjectSchema,
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
