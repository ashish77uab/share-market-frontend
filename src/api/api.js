import axios from "axios";
import { io } from "socket.io-client";
const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;
const baseURL = `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`
export const socketConnect = (namespace,token) => {

  return io(`${baseURL}${namespace}`,{
    auth: {
      token, 
    },
    transports: ['websocket']
  });
}
const API = axios.create({
  baseURL: baseURL ,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("ashishToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("ashishToken")}`;
  }
  return req;
});
// Banners
export const getBanners = () => API.get("banners");
export const updateBanner = (id, formData) =>
  API.put(`banners/${id}`, formData);
export const addBanner = (formData) => API.post("banners", formData);
export const deleteBannerImage = (id, formData) =>
  API.put(`banners/delete-banner-image/${id}`, formData);


// Tournament API
export const getTournaments = () => API.get("tournaments");
export const addTournament = (formData) => API.post("tournaments", formData);
export const deleteTournament = (id) => API.delete(`tournaments/${id}`);
export const updateTournament = (id, formData) =>
  API.put(`tournaments/${id}`, formData);

// Teams
export const addTeam = (formData) =>
  API.post("team/add", formData);
export const deleteTeam = (id) => API.delete(`team/${id}`);
export const updateTeam = (id, formData) =>
  API.put(`team/${id}`, formData);
export const getAllTeam = ({ id }) =>
  API.get(`team/all/${id}`);
export const getTeam = (formData) =>
  API.get("team", formData);


// Match
export const addMatch = (formData) =>
  API.post("match/add", formData);
export const deleteMatch = (id) => API.delete(`match/${id}`);
export const distributeMoney = (id) => API.put(`match/distribute-money/${id}`);
export const updateMatch = (id, formData) =>
  API.put(`match/${id}`, formData);
export const getAllMatchOfTournament = ({ id }) =>
  API.get(`match/all/${id}`);
export const getMatch = (id) =>
  API.get(`match/${id}`);
export const getTopMatches = () =>
  API.get(`match/top`);

// Prize
export const createPrizePyramid = (formData) =>
  API.post("prize/add", formData);
export const deletePrizePyramid = (id) => API.delete(`prize/${id}`);
export const updtePrizePyramid = (id, formData) =>
  API.put(`prize/update/${id}`, formData);
export const getAllPrizePyramid = () =>
  API.get(`prize/all`);
export const getPrizePyramid = (id) =>
  API.get(`prize/${id}`);


// User Team
export const addUserTeam = (formData) =>
  API.post("match-team/add", formData);
export const getUserMatchTeam = ({matchId,userId}) =>
  API.get(`match-team/${matchId}/${userId}`);
export const getEvents = (matchId) =>
  API.get(`match-team/event/${matchId}`);
export const deleteUserTeam = (id) => API.delete(`match-team/${id}`);
export const updateUserTeam = (id, formData) =>
  API.put(`match-team/${id}`, formData);
export const joinEvent = (formData) =>
  API.post(`match-team/event`, formData);


export const addPlayer = (formData) =>
  API.post("player/add", formData);
export const deletePlayer = (id) => API.delete(`player/${id}`);
export const updatePlayer = (id, formData) =>
  API.put(`player/${id}`, formData);
export const getAllPlayer = ({ id }) =>
  API.get(`player/all/${id}`);
export const getPlayer = (id) =>
  API.get(`player/${id}`);
export const updatePlayerPlayingStatus = (data) =>
  API.put(`player/playing`, data);
export const updatePlayerScore = (scoreId,data) =>
  API.put(`player/score/${scoreId}`, data);
export const getPlayerScore = (playerId) =>
  API.get(`player/score/${playerId}`);
export const resetPlayerData = (data) =>
  API.put(`player/score-reset`,data);

// wishlist
export const addToWishList = (formData) => API.post("wishlist/add", formData);
export const getWishlistItem = () => API.get("wishlist");
export const removeWishlistItem = (id) => API.delete(`wishlist/${id}`);

// orders
export const removeCartItem = (id) => API.delete(`orders/remove-item/${id}`);
export const updateOrderStatus = (data) => API.put(`orders`, data);
export const cancelOrder = (data) => API.put(`orders/cancel-order`, data);
// admin
export const getAllOrderList = (data) => API.get(`orders/admin/all?page=${data?.page}&limit=${data?.limit}`);


// Products
export const getProducts = (data) => API.get(`products?min=${data?.min || ''}&max=${data?.max || ''}&category=${data?.category || []}&sort=${data?.sort || ''}`);
export const getBrands = () => API.get("products/brands");
export const addProduct = (formData) => API.post("products", formData);
export const deleteProduct = (id) => API.delete(`products/${id}`);
export const updateProduct = (id, formData) =>
  API.put(`products/${id}`, formData);
export const deleteProductImage = (id, formData) =>
  API.put(`products/delete-product-image/${id}`, formData);
export const addProductReview = ( formData) =>
  API.post(`products/add-product-review`, formData);
export const editProductReview = (id, formData) =>
  API.put(`products/edit-product-review/${id}`, formData);

export const addToCart = (formData) => API.post("orders/add-to-cart", formData);
export const getCartItems = () => API.get("orders/cart-items");
export const placeOrder = (formData) => API.post("orders", formData);
export const getAllUserOrders = () => API.get(`orders/user-orders`);



// Product API
export const getFeaturedProducts = () => API.get("products/featured");
export const getAllProducts = () => API.get("products");
export const getSingleProduct = (id) => API.get(`products/${id}`);

// User
export const login = (formData) => API.post(`auth/login`, formData);
export const register = (formData) => API.post(`auth/register`, formData);
export const forgotRequest = (formData) =>
  API.post(`auth/requestResetPassword`, formData);
export const resetPassword = (formData) =>
  API.post(`auth/resetPassword`, formData);
export const getUser = () => API.get("auth/profile");
export const uploadProfileImage = (id, formData) =>
  API.post(`auth/profileImage/${id}`, formData);
export const uploadImage = (formData) => API.post("upload", formData);

export const getAllUsersList = (data) => API.get(`auth/all-users?page=${data?.page}&limit=${data?.limit}`);
export const getAllAdminList = () => API.get(`auth/all-admin`);
export const getAllUserNotifications = (data) => API.get(`auth/notifications?skip=${data?.skip}&take=${data?.take}`);
export const deleteNotification = (notificationId) => API.delete(`auth/notifications/delete/${notificationId}`);
export const readNotification = (notificationId) => API.put(`auth/notifications/read/${notificationId}`);

// Vouchers
export const getAllVouchers = (data) => API.get(`voucher?page=${data?.page}&limit=${data?.limit}`);
export const createVoucher = (data) => API.post(`voucher/create`,data);
export const updateVoucher = (voucherId, data) => API.put(`voucher/update/${voucherId}`, data);
export const getVoucher = (voucherId) => API.get(`voucher/single/${voucherId}`);
export const deleteVoucher = (voucherId) => API.delete(`voucher/delete/${voucherId}`);
export const checkVoucherCode = (data) => API.post(`voucher/check`, data);

export const getAllUserMessagesList = (userId, adminId) => API.get(`messages/user/${userId}/${adminId}`);
export const readMessage = (messageId) => API.put(`messages/read/${messageId}}`);