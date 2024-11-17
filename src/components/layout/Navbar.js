import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactIcons } from "../../utils/icons";
import { setLogout, } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, navbarLinks } from "../../utils/constants";
import gsap from "gsap";

const Navbar = () => {
  const [toggle,setToggle]=useState(false)
  const navbarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setToggle(true)
      } else {
        setToggle(false)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isLoggedIn = getUserToken()
  return (
    <nav className={`flex items-center  shadow-navbar bg-transparent transition-all duration-200  py-[20px] fixed left-0 top-0 w-full z-[50] ${toggle? 'bg-white':'bg-transparent'}`}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="">
            <Link to="/" className="">
              <img className={`md:w-[206px] w-[150px] ${toggle? 'invert-0':'invert'}`} src="/images/logo.png" alt="log" />
            </Link>
          </div>
          <div className="flex-grow  justify-end mr-10 items-center md:flex hidden">
            {navbarLinks?.map((item) => {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-semibold  ${toggle? 'text-gray-800 hover:text-primary-pink ':'text-white hover:opacity-75'}  px-4  ${item.path === window.location.pathname ? "text-primary-pink" : ""
                    }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
          <div className="flex gap-2 items-center">
            {!user && (
              <div className="flex items-center md:gap-4 gap-2">
                <Menu as="div" className="relative">
                  <Menu.Button
                    className={
                      "flex gap-1 text-right items-center px-2 py-2 cursor-pointer rounded-md"
                    }
                  >
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={"/images/user.png"}
                      alt="user"
                    />
                    <span className={`${toggle?'text-black' :'text-white'}`}>{reactIcons?.arrowDown}</span>
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
              {user && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className={`${!toggle? 'btn-outline-white':'btn-outline-primary'}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="btn-primary"
                  >
                    Sign Up
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
