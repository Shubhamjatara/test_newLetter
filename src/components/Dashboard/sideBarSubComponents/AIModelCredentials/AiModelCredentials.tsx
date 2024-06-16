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

const AiCredentialsSection = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>([]);

  const showCredentialsHandler = async () => {
    setIsloading(true);
    const data = await getAiModelCredentials();
    console.log(data);
    setCredentials(convertToKeyValueArray(data.data.credential));
    setIsloading(false);
  };

  useEffect(() => {
    showCredentialsHandler();
  }, []);

  const updateAiPromptcredentialsHandler = async () => {
    setIsloading(true);
    const isUpdated = await putAxiosRequestForUpdateCredentials(
      process.env.REACT_APP_CHAT_GPT_URL as string,
      unpackKeys(credentials)
    );
    setIsloading(false);
    console.log(isUpdated);
    if (isUpdated?.is_success) {
      alert(isUpdated.message);
      return;
    }

    alert("Not updated!!!");

    console.log(credentials);
    //alert("Not updated!!!");
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    const newCredentials = [...credentials];
    newCredentials[index] = { ...newCredentials[index], [key]: value };
    setCredentials(newCredentials);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="w-full h-full overflow-hidden flex flex-col justify-between">
        <div className="text-3xl">AI Model</div>
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
                    <input
                      value={item[key]}
                      type="text"
                      id={key}
                      placeholder="Api key"
                      className="block bg-transparent border-b border-b-neutral-600 w-full rounded-sm text-neutral-300"
                      onChange={(e) =>
                        handleInputChange(index, key, e.target.value)
                      }
                    />
                  </li>
                );
              })}

            {isLoading && <Loader />}
            <li className="w-full flex justify-center">
              <Button
                callback={() => {
                  updateAiPromptcredentialsHandler();
                }}
                title={"Save"}
              />
            </li>
          </ul>
        </div>
      </div> 
      <div className="absolute bottom-3 left-5"> <DigitalClock/></div>
    </motion.div>
  );
};

export default AiCredentialsSection;

const getAiModelCredentials = async (): Promise<Record<string, any>> => {
  try {
    return await getAxiosRequestForCredentials(
      process.env.REACT_APP_CHAT_GPT_URL as string
    );
  } catch (err) {
    console.log("Promise rejected to get credentials");
    return Promise.reject([]);
  }
};

const convertToKeyValueArray = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
};
