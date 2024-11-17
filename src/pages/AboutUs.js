import React from "react";
import BreadCrumb from "./components/BreadCrumb";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container relative z-[4] min-h-[600px] flex justify-center items-center text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-7xl max-w-[1240px] leading-[1.15] text-white font-bold"> About Us</h2>
            <BreadCrumb path={'/about'} title={'About Us'} />
          </div>
        </div>

      </div>
      <section className="py-20 bg-pink-50">
        <div className="container ">
          <div className="max-w-[1300px] mx-auto w-full grid grid-cols-2 place-items-center  gap-10 ">
            <div className="grid grid-cols-2 gap-8 ">
              <div className="flex justify-end items-end">
                <img className="w-[80%] rounded-lg" src="/images/ab1.png" alt="ab1" />
              </div>
              <div>
                <img className="w-full rounded-lg" src="/images/ab2.png" alt="ab2" />
              </div>
              <div className="flex justify-end items-start">
                <img className="w-[90%] rounded-lg" src="/images/ab3.png" alt="ab3" />
              </div>
              <div className="flex justify-start items-start">
                <img className="w-[80%] rounded-lg" src="/images/ab4.png" alt="ab1" />
              </div>
            </div>
            <div>
              <h3 className="heading-3 leading-[1.2]">India's First Algo Trading Platform with Auto Login Feature </h3>
              <p className="text-muted my-4">
                We Provide an affordable trading platform to help everyone to switch into an effortless trading system which offers Autologin features with Best & Pre-tested Profitable Strategies with Real Time Execution and Zero Latency.
              </p>
              <div className="my-10">
                <Link to='/contact' className="btn-primary py-3 ">Contact us</Link>
              </div>
            </div>

          </div>
        </div>
      </section>


    </section>
  );
};

export default AboutUs;
