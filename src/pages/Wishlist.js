import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";

const Wishlist = () => {
  
const [fetchLoading,setFetchLoading]=useState(false)
 
  const getMatchDetail = async (id) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        console.log(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  useEffect(()=>{
    getMatchDetail()
  },[])

  return (
    <>
    <section className="py-24 container">
      Wishlist
    </section>
     
    </>
  );
};

export default Wishlist
