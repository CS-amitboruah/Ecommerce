import axios, { AxiosInstance } from "axios";


// Axios NoAuth Instance

export const ServiceInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// Axios Auth Instance
export const ServiceAuthInstance: any = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

//all API URLS
export const apiUrl = {
  SIGNUP: "/user/register",
  LOGIN: "/user/login",

  ALL_PRODUCTS:"/products/filterproduct",
  SINGLE_PRODUCT:"/products/getProductById",

  FORGOT_PASS:"user/Forgetpassword",
  RESET_PASS:"user/Forgetpasswordaftergetmail",

  ADD_TO_CART:"/cart",
  SHOW_CART:"/cart/getcart",

  ORDER_DETAILS:"/order/getorder"
};

//Handle Auth request

ServiceAuthInstance.interceptors.request.use((config:any) => {
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";
    return config;
  }
});

//Handle noAuth request

ServiceInstance.interceptors.request.use((config) => {
  return config;
});

//Handle Auth response

ServiceAuthInstance.interceptors.response.use(
  (response:any) => response.data,
  (error:any) => {
    ServiceAuthInstance.interceptors.response.reject(ServiceAuthInstance);
    return error?.response
  }
);

//Handle noAuth response

ServiceInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { data } = error?.response;
    if (data && data.message) {
    }
    return Promise.reject(data.message);
  }
);
