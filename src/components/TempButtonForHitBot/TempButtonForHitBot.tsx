import React, { useState } from "react";
import { getAxiosRequestForCredentials } from "../../utils/axios/axios.Api.Request";
import Loader from "../loader/Loader";

export default function TempButtonForHitBot() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const handler = async () => {
    setIsloading(true);
    if(isLoading) return;
    await getAxiosRequestForCredentials(
      process.env.REACT_APP_BOT_URL as string
    );
    setIsloading(false);
    alert("Emails have been sent and twitted");
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={() => {handler()}}
        type="button"
        className="lg:w-1/2 w-full  xl:max-w-[550px] 2xl:max-w-xl text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
      >
        {isLoading ? <Loader /> : "Activate Bot"}
      </button>
    </div>
  );
}
