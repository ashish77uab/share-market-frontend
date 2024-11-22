import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";
const MARKET={
  '0': 'NIFTY 50',
  '1': 'NIFTY Bank',
  '2': 'Sensex',
  '3': 'Fin Nifty',
 
}
const POLLING_INTERVAL = 1000; // 1 second
const INDICES=['in%3BNSX','in%3Bnbx', 'in%3BSEN', 'in%3Bcnxf']
const Wishlist = () => {

  const [fetchLoading, setFetchLoading] = useState(false)
  const [marketData,setMarketData] = useState([])


  const getMarketData = async (index) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/${index}`);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        return data
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };




  useEffect(() => {
    let intervalId;
  
    const fetchMarketData = async () => {
      setFetchLoading(true);
      try {
        const dataPromises = INDICES.map((index) => getMarketData(index));
        const results = await Promise.all(dataPromises);
        const validData = results.filter((result) => result !== null);
        setMarketData(validData);
      } finally {
        setFetchLoading(false);
      }
    };
  
    // Start polling
    const startPolling = () => {
      fetchMarketData(); // Initial fetch
      intervalId = setInterval(fetchMarketData, POLLING_INTERVAL);
    };
  
    startPolling();
  
    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

console.log(marketData,'marketData')

return (
  <div className="py-4">
    <section className=" container">
      <div className="flex items-start gap-10">
        {
          marketData?.map((item,index)=>{
            return (
              <div className="">
                <h6 className="heading-6">{MARKET[index]}</h6>
                <div className="flex items-center gap-1 py-2">
                  <span className="text-black font-semibold">{item?.data?.pricecurrent}</span>
                  <div className="text-[#1ab156] text-sm font-medium"><span>{Number(item?.data?.pricechange)?.toFixed(2)}</span> <span className="ml-1">({Number(item?.data?.pricepercentchange)?.toFixed(2)}%)</span></div>
                </div>
              </div>
            )
          })
        }


      </div>
    </section>

  </div>
);
};

export default Wishlist
