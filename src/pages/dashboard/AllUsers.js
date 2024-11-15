import React, { useEffect, useState } from "react";
import { getAllUsersList, getAllVouchers } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import {  numberWithCommas } from "../../utils/helpers";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import Pagination from "../../components/Pagination";
import UpdateOrderStatus from "../../components/modals/UpdateOrderStatus";
import RenderNoData from "../../components/layout/RenderNoData";
import ActionButton from "../../components/button/ActionButton";
import SendVoucherNotification from "../../components/modals/SendVoucherNotification";
import ViewUsersVouchers from "../../components/modals/ViewUsersVouchers";

const AllUsers = () => {
  const limit = 10
  const [isViewVoucherOpen, setIsViewVoucherOpen] = useState(false);
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [vouchers, setVouchers] = useState(null);
  const [userVoucher, setUserVoucher] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({})
  const [userId, setUserId] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(false);

  const getAllUsers = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllUsersList({ limit, page });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setUsers(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }finally{
      setFetchLoading(false)
    }
  };

  useEffect(() => {
    getAllUsers();
   
  }, [page]);
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">All Users </h3>
          <div>Total users: <span className="text-sm align-middle">{numberWithCommas(users?.totalUsers)}</span></div>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name of User</th>
                  <th>email</th>
                  <th>Level of User</th>
                  <th>Cart Items</th>
                  <th>WishListItems</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((user, index) => {
                  const hasCartItems = user?.carts?.length > 0
                  const hasWishlistItems = user?.wishlistItems?.length > 0
                  return (
                    <tr>
                      <td className="w-[80px]">{index + 1}</td>
                      <td>{user?.fullName}</td>
                      <td>
                        <div>{user?.email}</div>
                      </td>
                        <td><b>{user?.levelValue || 0}</b> Points</td>
                      <td>{hasCartItems ? <span> <b>{user?.carts?.length}</b> Items</span> :'-' }</td>
                      <td>{hasWishlistItems ? <span> <b>{user?.wishlistItems?.length}</b> Items</span> :'-' }</td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <ActionButton className={'text-xl'} onClick={()=>{
                            setIsViewVoucherOpen(true)
                            setUserVoucher(user?.vouchers)
                           
                          }}>
                            {reactIcons.eye}
                          </ActionButton>
                          <ActionButton className={'text-xl'} onClick={()=>{
                            setIsSendNotificationOpen(true)
                            setUserId(user?._id)
                          }}>
                            {reactIcons.notification}
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  )
                }
                 
                )}
                {users?.users?.length < 1  && !fetchLoading && <RenderNoData title="No users found." />}
                {fetchLoading && <div className="py-8 text-center font-semibold">Loading please wait....</div>}
              </tbody>
            </table>
          </div>
          <div className="my-4">
          <Pagination handlePageClick={(page) => {
            console.log(page?.selected)
            setPage(page?.selected + 1)
          }} pageCount={users?.totalPages} />

          </div>
        </div>
      </div>
      <ViewUsersVouchers isOpen={isViewVoucherOpen} vouchers={userVoucher} closeModal={() => setIsViewVoucherOpen(false)}/>
      <SendVoucherNotification
        isOpen={isSendNotificationOpen}
        closeModal={() => {
          setIsSendNotificationOpen(false)
          getAllUsers()
          
        }}
        title={"Send Notification"}
        formData={vouchers?.vouchers}
        userId={userId}
      />
    </>
  );
};

export default AllUsers;
