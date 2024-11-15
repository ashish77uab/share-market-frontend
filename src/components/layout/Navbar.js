import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactIcons } from "../../utils/icons";
import { getUserNotifcationStart, setLogout, toggleNewNotification, updateNotification } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken } from "../../utils/constants";
import { socketConnect } from "../../api/api";
import NotificationPopper from "../popper/NotificationPopper";
import { numberWithCommas } from "../../utils/helpers";

const Navbar = () => {
  let socket
  if (!socket) {
    socket = socketConnect('notifications');
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  user } = useSelector((state) => state.auth);
  const cartLength = user?.carts?.length;
  const wishlistLength = user?.whislistItems?.length;
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  const isLoggedIn = getUserToken()
  const handleUpdateNotificationCount = () => {
    const prevCount = Number(localStorage?.getItem('notificationCount')) || 0
    const nextCount = prevCount + 1
    localStorage?.setItem('isNewNotification', JSON.stringify(true))
    localStorage?.setItem('notificationCount', JSON.stringify(nextCount))
    dispatch(toggleNewNotification(true))
  }
  useEffect(() => {
   
    if (isLoggedIn && user?._id) {
     socket?.emit('connect-notification', { userId: user?._id });
     socket?.on('notify-user', (data) => {
        handleUpdateNotificationCount()
        dispatch(updateNotification(data))
      });
    }
    return () => {
     socket?.disconnect();
     socket?.off('notify-user');
    };
  }, [isLoggedIn, user]);

  return (
    <nav className="flex items-center  shadow-navbar  py-3 sticky top-0 w-full bg-white z-[50]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="">
            <Link to="/" className="font-extrabold text-3xl text-amber-600">
              Dream 11
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            {user && (
              <div className="flex items-center md:gap-4 gap-2">
                <div>
                  <div className="md:block hidden"><b className="min-w-[100px] inline-block">Balance  </b>: &nbsp; Rs. {numberWithCommas(user?.wallet?.amount || 0)}</div>
                  <div className="md:block hidden"><b className="min-w-[100px] inline-block">Winnings  </b>: &nbsp; Rs. {numberWithCommas(user?.wallet?.winnings || 0)}</div>
                </div>
                <Menu as="div" className="relative">
                  <Menu.Button
                    className={
                      "flex gap-1 text-right items-center px-2 py-2 cursor-pointer hover:bg-zinc-100 rounded-md"
                    }
                  >
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={
                        user.profileImage
                          ? `${user.profileImage}`
                          : "/images/user.png"
                      }
                      alt=""
                    />
                   <div>
                      <span className="md:block hidden">{user?.fullName}</span>
                   </div>
                    <span className="ml-2">{reactIcons?.arrowDown}</span>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(`/profile/${user._id}`)}
                              className={`${active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        {user?.role === 'Admin' && <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(`/dashboard`)}
                              className={`${active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              Go to dashboard
                            </button>
                          )}
                        </Menu.Item>
                        }
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
            <div className="flex gap-2">
              {!user && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-primary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="btn-primary"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
