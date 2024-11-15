import { object } from 'dot-object';


import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  gender: Yup.string()
    .oneOf(["male", "female", "others"], "Invalid gender value.")
    ,
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
  panImage: Yup.string().required("PAN image is required."),
  aadharImage: Yup.string().required("Aadhar image is required."),
  clientImage: Yup.string().required("Client image is required."),
  phone: Yup.string()
    .required("Phone number is required."),
  panNumber: Yup.string()
    .required("PAN number is required."),
  aadharNumber: Yup.string()
    .required("Aadhar number is required.")
   ,
  address: Yup.string().required("Address is required."),
  bankName: Yup.string().required("Bank name is required."),
  accountNumber: Yup.string()
    .required("Account number is required.")
    ,
  ifscCode: Yup.string()
    .required("IFSC code is required.")
   ,
  accountType: Yup.string()
    .oneOf(["saving", "current"], "Invalid account type."),
    confirmPassword:
    Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password not matched')
      .required('Confirm password is required'),
 
});
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
});


/**
 *
 * @param {*} error
 * @returns
 */
export const parseYupError = (error) => {
  const message = {};
  error.inner.forEach((err) => {
    if (!message[err.path]) {
      message[err.path] = err.message;
    }
  });
  console.log(error.inner, 'error');
  return object(message);
};
/**
 *
 * @param {*} error
 * @returns
 */
export const isYupError = (error) => error?.name === 'ValidationError';