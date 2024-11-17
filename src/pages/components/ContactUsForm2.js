import React from 'react'
import TextInput from '../../components/forms/TextInput'
import { Form, Formik } from 'formik'
import TextArea from '../../components/forms/TextArea'

const ContactUsForm2 = () => {
    return (
        <div>
            <Formik
                initialValues={{}}
                // validationSchema={userValidationSchema}
                onSubmit={()=>{
                    
                }}
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
                        <Form className="grid grid-cols-2 gap-4">
                            <TextInput
                                isFormik={false}
                                type="text"
                                placeholder="First name"
                            />
                            <TextInput
                                isFormik={false}
                                type="text"
                                placeholder="Last name"
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
                            <div className='col-span-2'>
                            <TextArea
                                isFormik={false}
                                placeholder="Enter message"
                            />
                            </div>
                            <div className='flex col-span-2 justify-center items-center'>
                               <button type='submit' className="btn-primary">Submit</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ContactUsForm2