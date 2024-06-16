import React, { useEffect, useState } from "react";
import Button from "../../../button/Button";
import { motion } from "framer-motion";
import {
  getAxiosRequestForCredentials,
  putAxiosRequestForUpdateCredentials,
} from "../../../../utils/axios/axios.Api.Request";
import { formatKey } from "../../../../utils/formatkey";
import { unpackKeys } from "../../../../utils/unpackArray/unpackArray";
import Loader from "../../../loader/Loader";
import DigitalClock from "../../../digitalClock/digitalClock";

const AiPrompt = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>([]);
  //const [service_name,setServiceName] = useState<string>("")
  //const [aiPrompt, setPrompt] = useState<string>("");

  const showCredentialsHandler = async () => {
    try {
      setIsloading(true); // Set loading state to true
      const data = await getAiPrompt(); // Fetch AI prompt data
      console.log(data); // Log the fetched data

      // Set service name and credentials
      //setServiceName(data.data?.service_name ?? "");
      if (data?.is_success ?? false)
        setCredentials(convertToKeyValueArray(data.data.credential));
    } catch (error) {
      console.error("Error fetching AI prompt data:", error); // Log any errors that occur
    } finally {
      setIsloading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    showCredentialsHandler();
  }, []);

  const handleInputChange = (index: number, key: string, value: string) => {
    const newCredentials = [...credentials];
    newCredentials[index] = { ...newCredentials[index], [key]: value };
    setCredentials(newCredentials);
  };

  const updateSocialCredentialsHandler = async () => {
    setIsloading(true);

    const isUpdated = await updateAiPromptRequestHandler(
      process.env.REACT_APP_AI_PROMPT_URL as string,
      unpackKeys(credentials)
    );
    setIsloading(false);
    console.log(isUpdated);
    if (isUpdated?.is_success) {
      alert(isUpdated.message);
      return;
    }

    alert("Not updated!!!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="w-full h-full overflow-hidden">
        <div className="text-3xl">AI PROMPT</div>
        <div className="w-full text-white mt-4">
          <ul className="w-full space-y-4">
            {Array.isArray(credentials) &&
              credentials.map((item: any, index: number) => {
                const key = Object.keys(item)[0];
                return (
                  <li key={index} className="space-y-1 w-full">
                    <label htmlFor={key} className="block">
                      {formatKey(key)}
                    </label>
                    <textarea
                      value={item[key]}
                      id={key}
                      placeholder="Ai Prompt"
                      rows={5}
                      className="block bg-transparent border-b border-b-neutral-600 w-full rounded-sm text-neutral-300 outline-none resize-none overflow-y-auto"
                      onChange={(e) =>
                        handleInputChange(index, key, e.target.value)
                      }
                    ></textarea>
                  </li>
                );
              })}
            {isLoading && <Loader />}
            <li className="w-full flex justify-center">
              <Button
                callback={() => {
                  updateSocialCredentialsHandler();
                }}
                title={"Save"}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-3 left-5">
        {" "}
        <DigitalClock />
      </div>
    </motion.div>
  );
};

export default AiPrompt;

const getAiPrompt = async (): Promise<Record<string, any>> => {
  try {
    return await getAxiosRequestForCredentials(
      process.env.REACT_APP_AI_PROMPT_URL as string
    );
  } catch (err) {
    console.log("Promise rejected to get credentials");
    return Promise.reject([]);
  }
};

const convertToKeyValueArray = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
};

const updateAiPromptRequestHandler = async (
  apiString: string,
  credentials: Record<string, any>
): Promise<Record<string, any>> => {
  try {
    console.log(credentials);
    return await putAxiosRequestForUpdateCredentials(apiString, credentials);
    return { message: "done", is_success: true };
  } catch (err: any) {
    console.log("Promised rejected to get credentials");
    alert("Something is wrong !!!");
    return Promise.reject(err.response.data);
  }
};
