import React from 'react'
import TextInput from '../../components/forms/TextInput'
import { Form, Formik } from 'formik'

const ContactUsForm = () => {
    return (
        <div>
            <Formik
                // initialValues={{}}
                // validationSchema={userValidationSchema}
                // onSubmit={handleSubmit}
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
                        <Form className="flex items-center gap-4">
                            <TextInput
                                isFormik={false}
                                type="text"
                                placeholder="Full name"
                            />
                            <TextInput
                                isFormik={false}
                                type="email"
                                placeholder="Enter email"
                            />
                            <TextInput
                                isFormik={false}
                                type="text"
                                placeholder="Enter mobile"
                            />
                            <TextInput
                                isFormik={false}
                                type="text"
                                placeholder="Enter message"
                            />
                            <button className="btn-primary">Subscribe</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ContactUsForm