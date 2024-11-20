import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  createStock,
  updateStock,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import { stockValidationSchema } from "../../utils/validation";
const initialState = {
  name: '',
  quantity: '',
  startPrice: '',
  endPrice: '',
  stockId: '',
  actionType: '',
  userId: '',
};
const PurchaseStock = ({ isOpen, closeModal, stock, stockId }) => {
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState(initialState)
  const handleSubmit = async (values, actionForm) => {
    setLoading(true)
    try {
      const res = stock
        ? await updateStock(
          values,
          stockId
        )
        : await createStock(values);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Purchased Successfully`} />);
        actionForm.resetForm();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (stock) {
      setInitialValue({
        name: stock?.name,
        quantity: stock?.quantity,
        startPrice: stock?.startPrice,
        endPrice: stock?.endPrice,
        stockId: stock?.stockId,
        actionType: stock?.actionType,
        userId: stock?.userId,
      });
    }
  }, [stock]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                onSubmit={handleSubmit}
                as="form"
                className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Purchase Stock
                </Dialog.Title>
                <Formik
                  initialValues={initialValue}
                  validationSchema={stockValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                  }) => {
                    return (
                      <Form className="w-full space-y-4 mt-4">
                        <TextInput
                          label={"Name of Stock"}
                          placeholder="Enter old password"
                          name="oldPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.oldPassword}

                        />
                        <TextInput
                          label={"New Password"}
                          placeholder="Enter new password"
                          name="newPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}

                        />

                        <footer className="py-4 text-center font-medium">
                          <button type="submit" className="btn-outline-primary">
                            {loading ? 'Loading...' : 'Update'}
                          </button>
                        </footer>
                      </Form>
                    )
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseStock;
