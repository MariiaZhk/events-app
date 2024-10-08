import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .test(
      "email-format",
      "Email should contain '@' and a valid domain",
      (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
    ),
  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date must not be in the future"),
  heardFrom: yup.string().required("Please select an option"),
});
