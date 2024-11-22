import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";
const MARKET = {
  '0': 'NIFTY 50',
  '1': 'NIFTY Bank',
  '2': 'Sensex',
  '3': 'Fin Nifty',

}

const POLLING_INTERVAL = 1000; // 1 second
const INDICES = ['in%3BNSX', 'in%3Bnbx', 'in%3BSEN', 'in%3Bcnxf']
const WISHINDICES = ['AE01', 'TI01', 'BF04', 'TEL', 'AHE']
const CATEGORY = {
  0: "NIFTY METAL",
  1: "NIFTY 50",
  2: "NIFTY 50",
  3: "NIFTY AUTO",
  4: "NIFTY 50",
}
const Wishlist = () => {

  const [fetchLoading, setFetchLoading] = useState(false)
  const [marketData, setMarketData] = useState([])
  const [wishlistData, setWishlistData] = useState([])


  const getWatchlistData = async (index) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${index}`);
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
    const fetchWishlistData = async () => {
      setFetchLoading(true);
      try {
        const dataPromises = WISHINDICES.map((index) => getWatchlistData(index));
        const results = await Promise.all(dataPromises);
        const validData = results.filter((result) => result !== null);
        setWishlistData(validData);
      } finally {
        setFetchLoading(false);
      }
    };

    // Start polling
    const startPolling = () => {
      fetchMarketData(); // Initial fetch
      fetchWishlistData()
      intervalId = setInterval(() => {
        fetchMarketData()
        fetchWishlistData()

      },
        POLLING_INTERVAL);

    };

    startPolling();

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="py-4">
      <section className=" container">
        <div className="lg:flex items-start grid lg:grid-cols-4 grid-cols-2 gap-4 lg:gap-10">
          {
            marketData?.map((item, index) => {
              const isNegative = (Number(item?.data?.pricecurrent) - Number(item?.data?.priceprevclose)) < 0
              return (
                <div className="">
                  <h6 className="lg:text-xl text-sm  font-semibold">{MARKET[index]}</h6>
                  <div className="flex items-center gap-1 py-2">
                    <span className="text-black font-semibold text-xs lg:text-sm">{item?.data?.pricecurrent}</span>
                    <div className={` text-xs lg:text-sm font-medium ${isNegative ? 'text-red-600' : 'text-[#1ab156]'}`}><span>{Number(item?.data?.pricechange)?.toFixed(2)}</span> <span className="ml-1">({Number(item?.data?.pricepercentchange)?.toFixed(2)}%)</span></div>
                  </div>
                </div>
              )
            })
          }


        </div>
        <div className="lg:mt-10 mt-4">
          <header className="mb-4">
            <h4 className="heading-4">My Watchlist</h4>
          </header>
        </div>
        <div className="lg:min-w-[400px] max-w-xl space-y-2">
          {
            wishlistData?.map((item, index) => {
              const isNegative = (Number(item?.data?.pricecurrent) - Number(item?.data?.priceprevclose)) < 0
              return (
                <div className="lg:p-4 p-2 rounded-md bg-white shadow-sm border-c">
                  <div className="flex justify-between items-center" >
                    <div>
                      <h6 className="lg:text-xl font-semibold  text-sm">{item?.data?.company}</h6>
                      <div className="flex items-center gap-1 py-1">
                        <div className={` text-xs lg:text-sm font-medium`}> {CATEGORY[index]}</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="lg:text-xl font-medium text-sm">{item?.data?.pricecurrent}</h6>
                      <div className="flex items-center gap-1 py-1">
                        <div className={` text-xs lg:text-sm font-medium ${isNegative ? 'text-red-600' : 'text-[#1ab156]'}`}><span >{Number(item?.data?.pricechange)?.toFixed(2)}</span> <span className="ml-1">({Number(item?.data?.pricepercentchange)?.toFixed(2)}%)</span></div>
                      </div>
                    </div>

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
