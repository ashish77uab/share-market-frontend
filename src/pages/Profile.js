import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import Spinner from "../components/loaders/Spinner";
import { getUser } from "../api/api";
import { setUser } from "../redux/features/authSlice";
import { numberWithCommas } from "../utils/helpers";
import moment from "moment";
import UpdatePassword from "./components/UpdatePassword";
import Funds from "./components/Funds";
import Transactions from "./components/Transactions";
import SingleInfo from "./components/SingleInfo";
import { useSearchParams } from "react-router-dom";



const ACTIVE_TAB={
    profile: 'profile',
    password: 'password',
    funds:'funds',
    transaction:'transaction',
}
const Profile = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || ACTIVE_TAB.profile;
    const [activeTab, setActiveTab] = useState(currentTab)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const getUserData = async () => {
        try {
            const res = await getUser();
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                dispatch(setUser(data));
            } else {
                toast.error(<ToastMsg title={"Something went wrong"} />);
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
    useEffect(() => {
        if(activeTab===ACTIVE_TAB?.profile || activeTab===ACTIVE_TAB?.funds)
        getUserData();
    }, [activeTab]);
    const handleActiveTab=(tab)=>{
        setSearchParams({ tab }, { replace: true });
        setActiveTab(tab);
    }




    return (
        <>
            {isLoading && <Spinner />}

            <div className=" ">
                <div className="container relative py-10">
                    <div className="flex lg:flex-row flex-col  border-c rounded-md ">
                        <div className="flex-shrink-0 lg:w-[300px] border-c border-t-0 border-l-0 border-b-0 p-6">
                            <div className="flex flex-col lg:gap-4 gap-2">
                                <button onClick={()=>{
                                    handleActiveTab(ACTIVE_TAB.profile)
                                }} className={`${activeTab===ACTIVE_TAB?.profile ? 'btn-primary' : 'btn-outline-primary'}`}>Profile</button>
                                <button onClick={()=>{
                                    handleActiveTab(ACTIVE_TAB.password)
                                }} className={`${activeTab===ACTIVE_TAB?.password? 'btn-primary' : 'btn-outline-primary'}`}>Change Password</button>
                                <button onClick={()=>{
                                    handleActiveTab(ACTIVE_TAB.funds)
                                }} className={`${activeTab===ACTIVE_TAB?.funds? 'btn-primary' : 'btn-outline-primary'}`}>Funds</button>
                                <button onClick={()=>{
                                    handleActiveTab(ACTIVE_TAB.transaction)
                                }} className={`${activeTab===ACTIVE_TAB?.transaction? 'btn-primary' : 'btn-outline-primary'}`}>Transaction</button>
                            </div>

                        </div>
                        <div className="flex-grow ">
                           {activeTab===ACTIVE_TAB?.profile &&  <>
                            <div>
                                <header className="py-4 border-b border-b-zinc-300 px-4 lg:px-10">
                                    <h4 className="heading-4 text-primary-pink">General Details</h4>
                                </header>
                                <div className="py-6  px-4 lg:px-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <SingleInfo title={'Full Name'} value={user?.fullName} />
                                        <SingleInfo title={'Email'} value={user?.email} />
                                        <SingleInfo title={'Phone'} value={user?.phone} />
                                        <SingleInfo title={'Gender'} value={user?.gender} />
                                        <SingleInfo title={'Date of birth'} value={moment(user?.dob)?.format('DD MMMM , YYYY')} />
                                        <SingleInfo title={'PAN Number'} value={user?.panNumber} />
                                        <SingleInfo title={'Aadhar Number'} value={user?.aadharNumber} />
                                        <SingleInfo title={'Address'} value={user?.address} />
                                        <SingleInfo isImage title={'Your image'} value={user?.clientImage} />

                                    </div>
                                </div>
                            </div>
                            <div>
                                <header className="py-4 border-y border-b-zinc-300 px-4 lg:px-10">
                                    <h4 className="heading-4 text-primary-pink">Bank Details</h4>
                                </header>
                                <div className="py-6  px-4 lg:px-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <SingleInfo title={'Bank Name'} value={user?.bankName} />
                                        <SingleInfo title={'Account Type'} value={user?.accountType} />
                                        <SingleInfo title={'Account Number'} value={user?.accountNumber} />
                                        <SingleInfo title={'IFSC Code'} value={user?.ifscCode} />
                                        <SingleInfo isImage title={'PAN Card'} value={user?.panImage} />
                                        <SingleInfo isImage title={'Aadhar Card'} value={user?.aadharImage} />

                                    </div>
                                </div>
                            </div>
                            </>}
                           {activeTab===ACTIVE_TAB?.password &&  <>
                            <div>
                                <header className="py-4 border-b border-b-zinc-300 px-4 lg:px-10">
                                    <h4 className="heading-4 text-primary-pink">Change Password</h4>
                                </header>
                                <div className="py-6  px-4 lg:px-10">
                                    <div className="max-w-xl">
                                      <UpdatePassword/>
                                    </div>
                                </div>
                            </div>
                           
                            </>}
                           {activeTab===ACTIVE_TAB?.funds &&  <>
                           <Funds user={user}/>
                            </>}
                           {activeTab===ACTIVE_TAB?.transaction &&  <>
                           <Transactions  userId={user?._id} user={user}  />
                            </>}

                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Profile;
