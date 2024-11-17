import React from "react";
import BreadCrumb from "./components/BreadCrumb";
import { reactIcons } from "../utils/icons";
import ContactUsForm2 from "./components/ContactUsForm2";

const ContactUs = () => {
  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container relative z-[4] min-h-[600px] flex justify-center items-center text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-7xl max-w-[1240px] leading-[1.15] text-white font-bold"> Contact Us</h2>
            <BreadCrumb path={'/contact'} title={'Contact Us'} />
          </div>
        </div>

      </div>
      <section className="py-20 bg-pink-50">
        <div className="container ">
          <div className="max-w-[1300px] mx-auto w-full grid grid-cols-6  gap-10 ">
            <div className="col-span-3">
              <div className="py-10">
                <h3 className="heading-3">Contact Information</h3>
                <p className="mt-2 text-muted">Fill up the form and our team will get back to you within 24 hours.</p>
                <ul className="mt-8 space-y-8">
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink'>{reactIcons.mobile}</span>
                    <span className="text-lg font-medium">044 2450 0009</span>
                  </li>
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink' >{reactIcons.location}</span>
                    <span className="text-lg font-medium">Block A, International Tech Park, 334, Rajiv Gandhi Salai, Ezhil Nagar, Elcot Sez, Sholinganallur, Chennai, Tamil Nadu 600119</span>
                  </li>
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink' >{reactIcons.email}</span>
                    <span className="text-lg font-medium text-primary-pink">info@staralgosecurities.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3">
              <div className="bg-white shadow-card p-10 rounded-md">
                <h3 className="heading-3">Get In touch</h3>
                <p className="mt-2 text-muted">We are here for you. How we can help?</p>
                <div className="my-4">
                  <ContactUsForm2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </section>
  );
};

export default ContactUs;
