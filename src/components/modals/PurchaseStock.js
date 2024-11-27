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
import { useParams } from "react-router-dom";
const initialState = {
  name: '',
  quantity: '',
  startPrice: '',
  // endPrice: 0,
  actionType: 'Buy',
};
const PurchaseStock = ({ isOpen, closeModal, stock, fetchData }) => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState(initialState)
  const handleSubmit = async (values, actionForm) => {
    setLoading(true)
    try {
      const res = stock
        ? await updateStock(
          { ...values, userId },
          stock?._id
        )
        : await createStock({ ...values, userId });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Purchased Successfully`} />);
        actionForm.resetForm();
        closeModal()
        fetchData()
        setInitialValue(initialState)
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
                className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Purchase Stock
                </Dialog.Title>
                <Formik
                  enableReinitialize
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
                          placeholder="Enter stock name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}

                        />
                        <TextInput
                          type='number'
                          label={"Quantity of Stock"}
                          placeholder="eg. 4"
                          name="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}

                        />
                        <TextInput
                          type='number'
                          label={"Limit price"}
                          placeholder="eg. 400"
                          name="startPrice"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.startPrice}

                        />
                        <footer className="py-4  font-medium">
                          <button type="submit" className="btn-outline-primary">
                            {loading ? 'Loading...' : stock ? 'Update' : 'Create'}
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
