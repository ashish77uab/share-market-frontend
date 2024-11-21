import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";
// import { NseIndia } from  "stock-nse-india";
const Wishlist = () => {

  const [fetchLoading, setFetchLoading] = useState(false)

  const getMatchDetail = async (id) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=3WPMKT6OXFBBVV4T`);
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
  useEffect(() => {
    var data = JSON.stringify({
      "clientcode": "M140361",
      "password": "9331",
      "totp": "zM1oeDjN"
    });

    var config = {
      method: 'post',
      url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserType': 'USER',
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': '192.168.1.11',
        'X-ClientPublicIP': '106.219.85.203',
        'X-PrivateKey': 'My Private Key'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // getMatchDetail()
  }, [])

  return (
    <>
      <section className="py-24 container">
        <div className="flex gap-10 items-start">
          <div className="flex-1">

          </div>


        </div>
      </section>

    </>
  );
};

export default Wishlist
