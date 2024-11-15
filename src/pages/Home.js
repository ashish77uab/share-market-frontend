import React from "react";
import { homeSection2Data, homeSection5Data, homeSection6Data, homeSection7Data, homeSection8Data } from "../utils/constants";
import { Link } from "react-router-dom";
import TextInput from "../components/forms/TextInput";
import ContactUsForm from "./components/ContactUsForm";

const Home = () => {

  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container relative z-[4] min-h-[700px] flex justify-center items-center text-center">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-7xl max-w-[1240px] leading-[1.15] text-white font-bold"> India's First Algo trading platform 
              with Auto Login feature</h2>
            <button className="btn-primary py-4"> Get Started Now</button>
          </div>


        </div>
      </div>
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-5">
              <h2 className="text-4xl leading-[1.3] mb-8 font-semibold">
                Simply Connect With
                Powerful Algorithms</h2>
              <img className="w-full max-w-[500px]" src="/images/s_block_image.png" alt="s_block_image" />
            </div>
            <div className="grid grid-cols-2 col-span-7 gap-4">
              {
                homeSection2Data?.map((item) => {

                  return <div>
                    <div className="flex flex-col items-start gap-4">
                      <img className="w-24 h-24" src={item.img} alt={item.img} />
                      <h3 className="text-xl font-semibold text-primary-dark">{item.title}</h3>
                      <p className="text-muted">{item.description}</p>
                    </div>
                  </div>
                })
              }
            </div>

          </div>
        </div>

      </div>
      <div className="container py-16">
        <div className="bg-primary-pink  max-w-7xl mx-auto px-4 py-10 rounded-xl">
          <img className="w-full h-full object-contain" src="/images/section3.png" alt="" />
        </div>
      </div>
      <div className="py-20  bg-pink-50/40">
        <div className="container">
          <header>
            <div className="container flex justify-center  mb-8  items-center">
              <h2 className="text-4xl leading-[1.3] font-semibold">
                How to start Algo trading</h2>
            </div>
          </header>
          <div className="flex  gap-4 ">
            {
              homeSection5Data?.map((item) => {

                return <div className="flex flex-col items-start gap-4 card px-4 py-4 rounded-md bg-white flex-1">
                  <img className="w-16 h-16" src={item.img} alt={item.img} />
                  <h3 className="text-lg font-semibold text-primary-dark">{item.title}</h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              })
            }
          </div>
        </div>

      </div>
      <div className="py-20  ">
        <div className="container">
          <header>
            <div className="mb-8 text-center">
              <h2 className="text-6xl mb-2 leading-[1.3]  font-semibold">
                Our core products for Traders</h2>
              <p className="text-muted max-w-3xl mx-auto text-center">An unique blend of opportunities to generate capital gains and get the best of both worlds Intraday and Positional trading</p>
            </div>
          </header>
          <div className="grid grid-cols-3  gap-4 ">
            {
              homeSection6Data?.map((item) => {

                return <div className="flex flex-col items-center text-center gap-4 card px-4 py-4 rounded-md bg-white flex-1">
                  <div className="bg-primary-pink w-16 h-16 p-3 rounded-full flex-center ">
                    <img className=" w-full h-full object-contain invert" src={item.img} alt={item.img} />
                  </div>

                  <h3 className="text-2xl font-semibold text-primary-pink">{item.title}</h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              })
            }
          </div>
        </div>

      </div>
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-5">
              <h2 className="text-4xl leading-[1.3] mb-8 font-semibold">
                A strategy for every type of trading</h2>
              <img className="w-full max-w-[500px]" src="/images/trading.png" alt="s_block_image" />
            </div>
            <div className="grid grid-cols-2 col-span-7 gap-4">
              {
                homeSection7Data?.map((item) => {

                  return <div>
                    <div className="flex flex-col items-start gap-4">
                      <img className="w-24 h-24" src={item.img} alt={item.img} />
                      <h3 className="text-xl text-primary-pink font-semibold ">{item.title}</h3>
                      <p className="text-muted">{item.description}</p>
                    </div>
                  </div>
                })
              }
            </div>

          </div>
        </div>

      </div>
      <div className="py-20  bg-pink-50/40">
        <div className="container">
          <header className="text-center mb-20">
            <div className="">
              <h2 className="text-5xl leading-[1.2] font-semibold">
                Why Choose <span className="text-primary-pink">Star Algo Securities</span> <br /> for best Algo Platform</h2>
            </div>
          </header>
          <div className="grid grid-cols-3 gap-10 gap-y-20 max-w-6xl mx-auto ">
            {
              homeSection8Data?.map((item) => {

                return <div className="flex flex-col relative items-center text-center cursor-pointer gap-4 card  rounded-lg px-10 pb-10 pt-28 transition-all hover:shadow-sm duration-200 group bg-white flex-1 hover:bg-primary-pink hover:text-white">
                  <div className="w-32 h-32  absolute ax-center -rotate-45 top-[-60px] flex-center bg-primary-pink rounded-full group-hover:shadow-sm group-hover:ring-1 group-hover:ring-white">
                    <img className="w-[40px] h-[40px] object-contain rotate-45" src={item.img} alt={item.img} />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-dark group-hover:text-white">{item.title}</h3>
                  <p className="text-muted text-base group-hover:text-white">{item.description}</p>
                </div>
              })
            }
            <div className="flex flex-col relative items-center text-center gap-4 card  rounded-lg px-10 py-10  bg-primary-pink flex-1">
              <img className="w-full" src='/images/s86.jpg' alt={'call-us'} />
              <Link to='/contact' className='px-6 py-2 border border-white rounded-md !text-white' >Contact Us</Link>

            </div>
          </div>
        </div>

      </div>
      <div className="py-10">
        <div className="container ">
          <div className="bg-primary-pink px-10 py-10 rounded-xl">
            <div className="text-center py-10">
              <h2 className="text-4xl leading-[1.2] font-bold text-white">
                 Get a Call Back
              </h2>
              <p className="text-white opacity-80 font-medium">Fill out the below form and we will contact you ASAP</p>
            </div>
            <div className="flex justify-center items-center gap-4">
                <ContactUsForm/>
            </div>
    
          </div>
        </div>
      </div>

    </section>
  );
};

export default Home;
