import axios from "axios";
import { showErrorAlert } from "./alerts";
import { LogoutUser } from "../api/restapi";

const newRequest = axios.create({
  baseURL: "https://greatgigs.onrender.com/api",
  withCredentials: true,
});

// Add a response interceptor
newRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "You are not authenticated!") {
        showErrorAlert(error.response.data.message);
        localStorage.removeItem("loggedInUser");
        location.href = "/";
        await LogoutUser();
      }
    }
    return Promise.reject(error);
  }
);

export default newRequest;
