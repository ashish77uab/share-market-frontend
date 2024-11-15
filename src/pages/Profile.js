import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { reactIcons } from "../utils/icons";
import Spinner from "../components/loaders/Spinner";
import { getUser, uploadProfileImage } from "../api/api";
import { setUser, updateUser } from "../redux/features/authSlice";
import { imageRender, numberWithCommas } from "../utils/helpers";
const LEVEL_POINTS=[
    {
        level: "Bronze",
        points: 100,
    },
    {
        level: "Silver",
        points: 500,
    },
    {
        level: "Gold",
        points: 5000,
    },

]

const Profile = () => {
    const [isCopied, setisCopied] = useState(false)
    const [selectedVoucher, setSelectedVoucher] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const handleUploadProfileImage = async (e, type) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("type", type);
        try {
            const res = await uploadProfileImage(user._id, formData);
            const { status, data } = res;
            console.log(res,'res')
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={"Image uploaded successfully"} />);
                let UpdateImg;
                if (type === "cover") {
                    UpdateImg = { coverImage: data.coverImage };
                } else {
                    UpdateImg = { profileImage: data.profileImage };
                }
                dispatch(updateUser(UpdateImg));
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setIsLoading(false);
        }
    };
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
            getUserData();
    }, []);
    

   

    return (
        <>
            {isLoading && <Spinner />}

            <div className="py-10">
                <div className="container relative">
                    <div className="relative">
                        <div className=" md:h-72 h-36 lg:h-96 rounded-lg overflow-hidden">
                            {user?.coverImage ? (
                                <img
                                    className=" hoverable-img w-full"
                                    src={imageRender(user?.coverImage)}
                                    alt="cover"
                                />
                            ) : (
                                <div className="flex-center w-full h-full bg-zinc-300">
                                    <h6 className="md:heading-4 heading-7">Add your cover Image</h6>
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="cover"
                            className="w-10 h-10 rounded-full cursor-pointer absolute top-2 right-4 bg-amber-200 text-black flex-center"
                        >
                            {reactIcons.camera}
                            <input
                                type="file"
                                name=""
                                id="cover"
                                hidden
                                onChange={(e) => handleUploadProfileImage(e, "cover")}
                            
                            />
                        </label>
                    </div>
                    <div className="relative mt-[-40px] lg:mt-[-50px] px-4  flex lg:flex-row flex-col  justify-center lg:justify-start gap-2 lg:gap-6 items-center lg:items-start">
                        <div className="md:w-32 md:h-32 h-16 w-16 relative  flex-shrink-0 rounded-full bg-amber-500 p-[2px] ">
                            <img
                                className="w-full h-full rounded-full object-cover"
                                src={
                                    user?.profileImage
                                        ? `${user?.profileImage}`
                                        : "/images/user.png"
                                }
                                alt=""
                            />
                            <label
                                htmlFor="profile"
                                className="md:w-10  md:h-10 h-8 w-8  rounded-full cursor-pointer absolute bottom-0 right-0 bg-amber-200 text-black flex-center"
                            >
                                {reactIcons.camera}
                                <input
                                    type="file"
                                    name=""
                                    id="profile"
                                    hidden
                                    onChange={(e) => handleUploadProfileImage(e, "profile")}
                                
                                />
                            </label>
                        </div>
                        <div className="lg:pt-16 flex-1 lg:text-left text-center">
                            <h4 className="md:heading-4 heading-6">{user?.fullName}</h4>
                            <p className="md:text-base leading-[1] text-[12px] text-gray-600">
                                {user?.email}
                            </p>
                            <p className="md:text-base leading-[1] text-[12px] text-gray-600">
                                <b> Balance:</b> Rs.{numberWithCommas(user?.wallet?.amount||0)}
                            </p>
                            <p >You are at <b>{user?.levelValue||0}</b> level</p>
                            <div className=" my-2 ">
                                {user?.mobile && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            Mobile
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.mobile}
                                        </span>
                                    </div>
                                )}
                                {user?.address && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            Address
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.address}
                                        </span>
                                    </div>
                                )}
                                {user?.description && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            About Me
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.description}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                    <div className="mb-2 p-0 lg:p-8 rounded-md grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                        {LEVEL_POINTS?.map(((level,index)=>{
                            return (
                                <div key={level} className={`border border-amber-700   rounded-md p-4 md:px-6 px-2 md:p-6 ${user?.levelValue >= level?.points &&'bg-gradient-to-r from-amber-700 to-amber-900 text-white'}`}>
                                    <h3 className="md:text-3xl text-xl text-center font-semibold">{level?.level}</h3>
                                    <p className="md:text-lg text-base text-center font-semibold">Rewards at : <span className="font-semibold">{level?.points}</span> level</p>
                                    {user?.levelValue >= level?.points && <p className="text-[12px] opacity-80 text-center font-semibold">You have covered {level?.level}, play more to reach another level</p>}
                                </div>
                            ) 
 
                        }))}

                    </div>
                </div>
            </div>
        
        </>
    );
};

export default Profile;
