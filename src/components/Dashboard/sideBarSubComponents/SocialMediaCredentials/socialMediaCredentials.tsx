import { useEffect, useState } from "react";
import {
  getAxiosRequestForCredentials,
  putAxiosRequestForUpdateCredentials,
} from "../../../../utils/axios/axios.Api.Request";
import Button from "../../../button/Button";
import { motion } from "framer-motion";
import { formatKey } from "../../../../utils/formatkey";
import { useSelector } from "react-redux";
import { unpackKeys } from "../../../../utils/unpackArray/unpackArray";
import Loader from "../../../loader/Loader";
import DigitalClock from "../../../digitalClock/digitalClock";

const SocialMediaCredentials = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>([]);

  const showCredentialsHandler = async () => {
    setIsloading(true);
    const data = await getSocialCredentials();
    console.log(data.data.credential);
    setCredentials(convertToKeyValueArray(data.data.credential));
    setIsloading(false);
  };

  const whichOption = useSelector((state: any) => {
    return state.SocialMediaOptionState.state;
  });

  console.log(whichOption);

  useEffect(() => {
    showCredentialsHandler();
  }, [whichOption]);

  const handleChange = (index: number, key: string, value: string) => {
    const newCredentials = [...credentials];
    newCredentials[index] = { [key]: value };
    setCredentials(newCredentials);
    console.log(credentials);
  };

  const updateSocialCredentialsHandler = async () => {
    setIsloading(true);
    const isUpdated = await updateSocialCredentialsRequestHandler(
      process.env.REACT_APP_TWITTER_URL as string,
      unpackKeys(credentials)
    );
    console.log(isUpdated);
    setIsloading(false);
    if (isUpdated?.is_success) {
      alert(isUpdated.message);
      return;
    }

    alert("Not updated!!!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="w-full h-full overflow-hidden">
        <div className="text-3xl">{whichOption.split("_")[0]}</div>
        <div className="w-full text-white mt-4">
          <ul className="w-full space-y-4">
            {Array.isArray(credentials) &&
              credentials.map((item: any, index: number) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                return (
                  <li key={index} className="space-y-1 w-full">
                    <label htmlFor={key} className="block">
                      {formatKey(key)}
                    </label>
                    <input
                      value={value}
                      type="text"
                      id={key}
                      placeholder="Api key"
                      className="block bg-transparent border-b border-b-neutral-600 w-full rounded-sm text-neutral-300"
                      onChange={(e) => handleChange(index, key, e.target.value)}
                    />
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
        <DigitalClock />
      </div>
    </motion.div>
  );
};

export default SocialMediaCredentials;

const getSocialCredentials = async (): Promise<Record<string, any>> => {
  try {
    return await getAxiosRequestForCredentials(
      process.env.REACT_APP_TWITTER_URL as string
    );
  } catch (err) {
    console.log("Promised rejected to get credentials");
    return Promise.reject([]);
  }
};

const convertToKeyValueArray = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
};

const updateSocialCredentialsRequestHandler = async (
  apiString: string,
  credentials: Record<string, any>
): Promise<Record<string, any>> => {
  try {
    return await putAxiosRequestForUpdateCredentials(apiString, credentials);
  } catch (err: any) {
    console.log("Promised rejected to get credentials");
    return Promise.reject(err.response.data);
  }
};
