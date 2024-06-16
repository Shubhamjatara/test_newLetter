import { motion } from "framer-motion";
import CredentialsSection from "../sideBarSubComponents/AIModelCredentials/AiModelCredentials";
import DefaultSection from "../sideBarSubComponents/defaultSection/DefaultSection";
import SocialMediaCredentials from "../sideBarSubComponents/SocialMediaCredentials/socialMediaCredentials";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AiPrompt from "../sideBarSubComponents/AIPrompt/aiPrompt";
import DigitalClock from "../../digitalClock/digitalClock";

{
  /* <summary>
  In this component there are two sidebar component, one for smallscreen and one for large screen //
  maintaing redux for state managament
</summary> */
}

export default function Sidebar() {
  const currentSubSideBarSection = useSelector((state: any) => {
    //   console.log(state.SwitchCredentialsReducerState.state);
    return state.SwitchCredentialsReducerState.state;
  });

  const renderSection = () => {
    switch (currentSubSideBarSection) {
      case "AI_MODEL_CREDENTIALS":
        return <CredentialsSection />;
      case "SOCIAL_MEDIA_CREDENTIALS":
        return <SocialMediaCredentials />;

      case "AI_PROMPT":
        return <AiPrompt />;
      default:
        return <DefaultSection />;
    }
  };
  const toggleSideBarState = useSelector((state: any): any => {
    return state.sidebarToggleState;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const callback = () => {
      dispatch({ type: "TOGGLE_CLOSE" });
    };

    // if (window.innerWidth < 980) {
    //   dispatch({ type: "TOGGLE_CLOSE" });
    // }

    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [window.innerWidth]);

  return (
    <>
      <motion.div
        className="lg:hidden absolute top-0 left-0 h-full w-full overflow-hidden"
        initial={{ marginLeft: "-100%" }}
        animate={{
          marginLeft: toggleSideBarState ? "0" : "-100%",
        }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <div className="h-full bg-[#1f1d1d] text-white p-3 shadow-md shadow-[#141313] overflow-y-hidden overflow-hidden">
          <div className="flex justify-end mt-3">
            <span
              className="text-2xl"
              onClick={() => {
                dispatch({ type: "TOGGLE_CLOSE" });
              }}
            >
              X
            </span>
          </div>
          {renderSection()}
        </div>
      </motion.div>

      <div className="hidden lg:block  h-full w-[380px]">
        <div className="h-full bg-[#0e1420] text-white p-3 shadow-md shadow-[#141313] overflow-y-auto">
          {renderSection()}
        </div>
      </div>
    </>
  );
}
