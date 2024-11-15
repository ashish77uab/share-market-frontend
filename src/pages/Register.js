import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ToastMsg from "../components/toast/ToastMsg";
import { register } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { reactIcons } from "../utils/icons";
import TextInput from "../components/forms/TextInput";
import {  userValidationSchema } from "../utils/yup";
import { serialize } from 'object-to-formdata'
import Spinner from "../components/loaders/Spinner";
import ReactSelect from "../components/forms/ReactSelect";
const genders = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]
const accounts = [{ label: "Saving", value: "saving" }, { label: "Current", value: "current" }]
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "others",
  panImage: "",
  aadharImage: "",
  clientImage: "",
  phone: "",
  panNumber: "",
  aadharNumber: "",
  address: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "saving",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [select, setSelect] = useState({
    gender: {label:'Others',value:'others'},
    account: {label:'Savings',value:'saving'},
  });
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleReset = () => {
    setSelect({
      gender: '',
      account: '',
    })
  };

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      console.log(values,'values')
      let formData = { ...values };
      delete formData.confirmPassword;
      const res = await register(serialize(formData));
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Register Successfully`} />);
        handleReset();
        navigate("/login");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error,'register error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-10 px-8">
        <Formik
          initialValues={initialState}
          validationSchema={userValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            setFieldError,
          }) => {
            return (
              <Form className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg">
                <header className="py-4 text-center text-3xl font-bold">
                  Register
                </header>
                <div className="px-4 space-y-2">
                  <div className="flex items-start gap-4">
                    <TextInput
                      label={"First Name"}
                      type="text"
                      placeholder="first name"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}

                    />

                    <TextInput
                      label={"Last Name"}
                      type="text"
                      placeholder="last name"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Email"}
                      type="text"
                      placeholder="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Phone"}
                      type="text"
                      placeholder="phone"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Pan Number"}
                      type="text"
                      placeholder="pan number"
                      name="panNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.panNumber}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"PAN Image"}
                      type="file"
                      name="panImage"
                      onChange={(e)=>{
                        setFieldValue('panImage', e.target.files[0])
                      }}
                      onBlur={handleBlur}

                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Aadhar Number"}
                      type="text"
                      placeholder="aadhar number"
                      name="aadharNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.aadharNumber}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Aadhar Image"}
                      type="file"
                      name="aadharImage"
                      onChange={(e)=>{
                        setFieldValue('aadharImage', e.target.files[0])
                      }}
                      onBlur={handleBlur}

                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Client Image"}
                      type="file"
                      name="clientImage"
                      onChange={(e)=>{
                        setFieldValue('clientImage', e.target.files[0])
                      }}
                      onBlur={handleBlur}

                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Address"}
                      type="text"
                      placeholder="address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                  </div>
                  
                  <div>
                    <TextInput
                      label={"Bank Name"}
                      type="text"
                      placeholder="bank name"
                      name="bankName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bankName}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={"Account Number"}
                      type="text"
                      placeholder="account number"
                      name="accountNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accountNumber}
                    />
                  </div>
                  
                  <div>
                    <TextInput
                      label={"IFSC Code"}
                      type="text"
                      placeholder="IFSC Code"
                      name="ifscCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ifscCode}
                    />
                  </div>
                  <div>
                    <ReactSelect
                      name='gender'
                      label={"Select Gender"}
                      options={genders}
                      value={select?.gender}
                      onChange={(e) => {
                        setFieldValue('gender', e.value)
                        setSelect({ ...select, gender: e })

                      }}
                    />
                  </div>
                  <div>
                    <ReactSelect
                      name='accountType'
                      label={"Select Account Type"}
                      options={accounts}
                      value={select?.account}
                      onChange={(e) => {
                        setFieldValue('accountType', e.value)
                        setSelect({ ...select, account: e })

                      }}
                    />
                  </div>
                  <TextInput
                    label={"Password"}
                    type={toggle ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    addonRight={
                      <span
                        onClick={() => setToggle(!toggle)}
                        className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                      >
                        {toggle ? reactIcons.eye : reactIcons.eyeslash}
                      </span>
                    }
                  />
                  <TextInput
                    label={"Confirm Password"}
                    type={toggle ? "text" : "password"}
                    placeholder="confirm password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    addonRight={
                      <span
                        onClick={() => setToggle(!toggle)}
                        className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                      >
                        {toggle ? reactIcons.eye : reactIcons.eyeslash}
                      </span>
                    }
                  />
                  <div>
                    <p className="text-muted">
                      Already have an account?{" "}
                      <Link className="ml-2 text-blue-500 underline" to="/login">
                        Login
                      </Link>
                    </p>{" "}
                  </div>
                </div>
                <footer className="py-4 text-center font-medium">
                  <button type="submit" className="btn-green">
                    {isLoading ? 'Loading...' : 'Register'}
                  </button>
                </footer>
              </Form>
            )
          }}
        </Formik>

      </div>
    </>
  );
};

export default Register;
