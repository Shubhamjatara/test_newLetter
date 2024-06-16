import { useDispatch } from "react-redux";
import Button from "../../button/Button";
import { getAxiosRequestForCredentials } from "../../../utils/axios/axios.Api.Request";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DigitalClock from "../../digitalClock/digitalClock";
import TempButtonForHitBot from "../../TempButtonForHitBot/TempButtonForHitBot";

const Options = () => {
  const [AI_PROMPT, SetAI_PROMPT] = useState<string>("");

  const dispatch = useDispatch();
  const switchComponent = (state: string): void => {
    dispatch({ type: state });
    handleToggleSidebarForSmallScreen();
  };

  const handleToggleSidebarForSmallScreen = (): void => {
    if (window.innerWidth < 980) {
      dispatch({ type: "TOGGLE_OPEN" });
    }
  };

  const aiPromptHandler = async () => {
    try {
      const isPromptFound = await getAiPromptRequestHandler();
      console.log(isPromptFound);
      SetAI_PROMPT(isPromptFound.data.credential.AI_PROMPT);
    } catch (error) {
      console.error("Error fetching AI prompt:", error);
    }
  };
  

  useEffect(() => {
    aiPromptHandler();
  }, []);

  return (
    <>
      
      <div className="w-full h-full flex items-center text-white p-5">
        <div className="flex gap-3 md:gap-5 flex-col w-full">
        <div className="w-full text-center text-2xl">Ai Work Management</div>
          <div className="flex flex-col lg:flex-row gap-3 w-full justify-center items-center h-full">
            <Option
              switchComponent={() => switchComponent("AI_MODEL_CREDENTIALS")}
              title={"AI Model"}
              optionsList={["ChatGpt"]}
              reduxDispatch={dispatch}
              icon={faLock}
            />
            <InputText
              switchComponent={() => switchComponent("AI_PROMPT")}
              title={"AI Prompt"}
              value={AI_PROMPT}
              SetAiPrompt={SetAI_PROMPT}
              icon={faLock}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-3 w-full justify-center items-center h-full">
            <Option
              switchComponent={() =>
                switchComponent("SOCIAL_MEDIA_CREDENTIALS")
              }
              title={"Social Media Platform"}
              optionsList={["Twitter", "Facebook"]}
              reduxDispatch={dispatch}
              icon={faLock}
            />
            <Option
              switchComponent={() => switchComponent("DEFAULT")}
              title={"OTHER_COMPONENT"}
              optionsList={["ChatGpt"]}
              reduxDispatch={dispatch}
              icon={faLock}
            />
          </div>
          <TempButtonForHitBot />
        </div>
      </div>
    </>
  );
};

export default Options;

const Option = ({
  title,
  optionsList,
  switchComponent,
  reduxDispatch,
  icon,
}: {
  title: string;
  optionsList: string[];
  switchComponent: () => void;
  reduxDispatch: any;
  icon: any;
}) => {
  return (
    <div className="p-3 w-full lg:w-[50%]   xl:max-w-[550px] 2xl:max-w-xl  border border-neutral-600 rounded-lg">
      <div className="flex flex-col gap-2">
        <span className="pl-1">
          <h1>{title}</h1>
        </span>
        <span className="w-full">
          <select
            onChange={(e: any) => {
              // console.log(e.target.value);
              reduxDispatch({ type: e.target.value });
            }}
            className="w-full  border-b bg-transparent border-neutral-600 pt-2 pb-2 outline-none"
          >
            {Array.isArray(optionsList) &&
              optionsList.map((item: string, index: number) => (
                <option
                  key={index}
                  value={item.toUpperCase() + "_OPTION"}
                  className="bg-[#0E1420]"
                >
                  {item}
                </option>
              ))}
          </select>
        </span>
        <span className="flex gap-2 justify-center mt-1">
          {/* <Button title={"Save"} callback={() => {}} /> */}
          <Button
            icon={icon}
            title={"Secret"}
            callback={() => {
              switchComponent();
            }}
          />
        </span>
      </div>
    </div>
  );
};

const InputText = ({
  title,
  switchComponent,
  value,
  SetAiPrompt,
  icon,
}: {
  title: string;
  switchComponent: () => void;
  value: string;
  SetAiPrompt: Function;
  icon: any;
}) => {
  return (
    <div className="p-3 w-full lg:w-[50%]   xl:max-w-[550px] 2xl:max-w-xl border border-neutral-600 rounded-lg">
      <div className="flex flex-col gap-2">
        <span className="pl-1">
          <h1>{title}</h1>
        </span>
        <span className="w-full">
          <input
            value={value}
            disabled={true}
            onChange={(e: any) => {
              SetAiPrompt(e.target.value);
            }}
            type="text"
            placeholder="Enter Prompt"
            className="w-full bg-transparent border-b border-neutral-600 pt-2 pb-2 outline-none placeholder:text-white"
          />
        </span>
        <span className="flex gap-2 justify-center mt-1">
          {/* <Button title={"Save"} disabled={true} callback={() => {}} /> */}
          <Button
            icon={icon}
            title={"Secret"}
            callback={() => switchComponent()}
          />
        </span>
      </div>
    </div>
  );
};

const getAiPromptRequestHandler = async (): Promise<Record<string, any>> => {
  try {
    console.log(process.env.REACT_APP_AI_PROMPT_URL);
    return await getAxiosRequestForCredentials(
      process.env.REACT_APP_AI_PROMPT_URL as string
    );
  } catch (err) {
    console.log(err);
    console.log("Promised rejected to get credentials");
    return Promise.reject([]);
  }
};
