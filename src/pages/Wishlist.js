import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";
import moment from 'moment';
// import { NseIndia } from  "stock-nse-india";
const Wishlist = () => {

  const [fetchLoading, setFetchLoading] = useState(false)


  const getMatchDetail = async (id) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NG&interval=5min&apikey=3WPMKT6OXFBBVV4T`);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        console.log(data);
        // setIntraData(data)
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
    // getMatchDetail()
    var data = JSON.stringify({
      "clientcode": "M140361",
      "password": "9331",
      "totp": "QZVW7W3OOBL2F2EQ3MPSMGGROQ",
    //  "state":"state_or_environment_variable"
    });

    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword',

  headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserType': 'USER',
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': '192.168.1.11',
        // 'X-ClientPublicIP': '192.168.1.11',
        'X-PrivateKey': 'zM1oeDjN'
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
}, [])

return (
  <div className="bg-sky-50 py-10">
    <section className=" container">
      <h3 className="heading-3 mb-2">My Wishlist</h3>
      <div>


      </div>
    </section>

  </div>
);
};

export default Wishlist
