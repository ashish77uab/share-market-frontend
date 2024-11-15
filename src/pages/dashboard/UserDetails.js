import React, { useEffect, useState } from "react";
import { getSingleUserData } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useParams } from "react-router-dom";
import moment from "moment";

const SingleInfo = ({ name, value,isImage, }) => {
  return <div className="flex items-start gap-4">
    <span className="min-w-[150px]">{name}:</span>
    {isImage? 

    <a title="View image by clicking" href={value} target="_blank"><img className="max-w-[60px] object-contain max-h-[60px]" alt={name} src={value}/></a>
     : <span>{value}</span>}
  </div>
}
const UserDetails = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const getSingleUser = async (userId) => {
    setFetchLoading(true)
    try {
      const res = await getSingleUserData(userId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setUser(data);
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
    if (userId) {
      getSingleUser(userId);
    }
  }, [userId]);
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">User Details</h3>
        </header>
        <div className="flex flex-col gap-2">
          <SingleInfo name={'Full Name'}  value={user?.fullName}/>
          <SingleInfo name={'Email'}  value={user?.email}/>
          <SingleInfo name={'Gender'}  value={user?.gender}/>
          <SingleInfo name={'Mobile Number'}  value={user?.phone}/>
          <SingleInfo name={'Address'}  value={user?.address}/>
          <SingleInfo name={'Aadhar Number'}  value={user?.aadharNumber}/>
          <SingleInfo name={'PAN Number'}  value={user?.panNumber}/>
          <SingleInfo name={'Account Number'}  value={user?.accountNumber}/>
          <SingleInfo name={'Bank Name'}  value={user?.bankName}/>
          <SingleInfo name={'IFSC Code'}  value={user?.ifscCode}/>
          <SingleInfo name={'Account Type'}  value={user?.accountType}/>
          <SingleInfo name={'Joined Date'}  value={moment(user?.createdAt)?.format('DD MMM, YYYY')}/>
          <SingleInfo  isImage name={'Aadhar Card'}  value={user?.aadharImage}/>
          <SingleInfo isImage name={'PAN Card'}  value={user?.panImage}/>
          <SingleInfo isImage name={'Client Image'}  value={user?.clientImage}/>

        </div>
      </div>
    </>
  );
};

export default UserDetails;
