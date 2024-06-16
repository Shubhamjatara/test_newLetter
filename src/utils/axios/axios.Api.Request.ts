import axios from "axios";
import { removeLocalStorageForLogin } from "../localstorage/localStorage.Handler";

export const postAxiosRequestForLogin = async (
  apiString: string,
  data: Record<string, any>
) => {
  try {
    const response = await axios.post(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //if (response.data.status_code === 401) removeLocalStorageForLogin();
    return response.data;
  } catch (error: any) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status_code === 401
    ) {
      removeLocalStorageForLogin();
      window.location.href = "/login";
    }
    return { is_success: false, message: "Error in post request" };
  }
};

export const putAxiosRequestForUpdateCredentials = async (
  apiString: string,
  data: Record<string, any>
) => {
  try {
    const response = await axios.put(apiString, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //if (response.data.status_code === 401) removeLocalStorageForLogin();
    return response.data;
  } catch (error: any) {
    if (error.response.data.status_code === 401) {
      removeLocalStorageForLogin();
      window.location.href = "/login";
    }
    return { is_success: false, message: "Error in post request" };
  }
};

export const getAxiosRequestForCredentials = async (apiString: string) => {
  try {
    const response = await axios.get(apiString, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response.data.status_code === 401) {
      removeLocalStorageForLogin();
      window.location.href = "/login";
    }
    return { is_success: false, message: "Error in get request" };
  }
};


export const getAxiosRequestForTest= async (apiString: string) => {
  try {
    const response = await axios.get(apiString, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log(error)
    return { is_success: false, message: "Error in get request" };
  }
};