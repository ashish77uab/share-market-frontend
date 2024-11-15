import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  MatchDetail,
  Register,
  AllUsers,
  ResetPassword,
  Profile,
  Tournament,
  Teams,
  Match,
  AddMatch,
  Player,
  PrizePyramidList,
  AddPrize
} from "./pages";
import { getUser } from "./api/api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import ToastMsg from "./components/toast/ToastMsg";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
  const dispatch = useDispatch();
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
    if (localStorage.getItem("ashishToken")) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/match/:matchId" element={<MatchDetail />} />
            <Route path="/profile/:userId" element={<ProtectedRoutes> <Profile /></ProtectedRoutes>} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tournaments" element={<Tournament />} />
            <Route path="prize-list" element={<PrizePyramidList />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="player/:teamId" element={<Player />} />
            <Route path="teams/:id" element={<Teams />} />
            <Route path="matches/:id" element={<Match />} />
            <Route path="matches/add" element={<AddMatch />} />
            <Route path="matches/update/:matchId" element={<AddMatch />} />
            <Route path="prize/add" element={<AddPrize />} />
            <Route path="prize/update/:prizeId" element={<AddPrize />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className={
          "lg:w-[500px] text-16 font-semibold w-full max-w-full  m-auto p-0 !font-poppins"
        }
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </div>
  );
}

export default App;
