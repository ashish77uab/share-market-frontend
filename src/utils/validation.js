import * as yup from "yup";
export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup.string().required("Please enter password."),
});
export const registerValidation = yup.object().shape({
    firstName: yup.string().max(40).required("Required"),
    lastName: yup.string().max(40).required("Required"),
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minumum 8 characters are required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match").required("confirmPassword is also required"),
});
export const updatePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Old Password is required"),
    newPassword: yup
        .string()
        .required("New Password is required"),
});
export const addDepositFormSchema = yup.object().shape({
    amount: yup
        .string()
        .required("Amount is required"),
    transactionId: yup
        .string()
        .required("Transaction unique id is required"),
});
export const withdrawFundFormSchema = yup.object().shape({
    amount: yup
        .string()
        .required("Amount is required"),
    panNumber: yup
        .string()
        .required("PAN Number is required"),
});
export const stockValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .required("Quantity is required"),
    startPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Buy')
        .required("Action Type is required"),
});
export const stockSellValidationSchema = (quantity) => yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .max(quantity, `Max Value is${quantity}`)
        .required("Quantity is required"),
    endPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Sell')
        .required("Action Type is required"),
});
export const contactValidationSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Name is required"),
    mobile: yup
        .string()
        .required("Mobile is required"),
    email: yup
        .string()
        .required("Email is required"),
    message: yup
        .string()
        .required("Message is required"),
});
