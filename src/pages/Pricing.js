import React from "react";
import { homeSection2Data, homeSection5Data, homeSection6Data, homeSection7Data, homeSection8Data, pricingFeatures, pricingFeaturesList } from "../utils/constants";
import { Link } from "react-router-dom";
import ContactUsForm from "./components/ContactUsForm";
import { reactIcons } from "../utils/icons";

const Pricing = () => {
  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container relative z-[4] min-h-[700px] flex justify-center items-center text-center">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-7xl max-w-[1240px] leading-[1.15] text-white font-bold"> Pricing Plans for every level of Ambition</h2>
            <p className="text-primary-white font-medium">“Setting a goal is not the main thing. It is deciding how you will go about achieving it and staying with that plan.”</p>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <h4 className="heading-4 mb-4">
          Choose one of our plans:
        </h4>
        <div className="flex items-center gap-4">
          <p >Type of subscription plans</p>
          <div className="flex items-center gap-4">{
            ['Monthly', 'Quarterly', 'Yearly']?.map((item) => (
              <div className="border border-primary-gray px-4 py-2 rounded-md  flex items-center gap-4 cursor-pointer">
                <input type="radio" id={item} name="subscription" className="text-primary-pink" />
                <label htmlFor={item}>{item}</label>
              </div>
            ))

          }

          </div>
        </div>
        <div className="flex gap-1 my-10">
          <div className="px-6 rounded-md shaodw-price py-8 bg-white max-w-[250px]">
            <h6 className="font-semibold text-base">Features / Plans</h6>
            <h4 className="text-3xl font-bold">Price</h4>
            <ul className="my-4">
              {
                pricingFeatures?.map((feature) => (
                  <li className="py-4 border-b text-sm border-b-zinc-100 last:border-none">
                    {feature}
                  </li>
                ))
              }
            </ul>


          </div>{
            pricingFeaturesList?.map((item) => (
              <div className="px-6 flex-1 rounded-md shaodw-price py-8 bg-white max-w-xs text-center">
                <div className="flex-1">
                  <h6 className="font-semibold text-base">{item?.title}</h6>
                  <h4 className="text-3xl font-bold">Rs. {item?.price}</h4>
                  <ul className="my-4">
                    {
                      item?.list?.map((feature) => (
                        <li className="py-4 border-b text-sm border-b-zinc-100 last:border-none">
                          {feature?.type === 'string' ? <span>{feature?.value}</span> : <div className={`flex text-3xl justify-center ${feature?.isCheck ? 'text-green-600' : 'text-red-500'}`}><span>{feature.value}</span></div>}
                        </li>
                      ))
                    }

                  </ul>
                </div>
                <div>
                  <button className="btn-primary btn-sm mt-4">Choose Plan</button>
                </div>



              </div>
            ))
          }


        </div>

      </div>


    </section>
  );
};

export default Pricing;
