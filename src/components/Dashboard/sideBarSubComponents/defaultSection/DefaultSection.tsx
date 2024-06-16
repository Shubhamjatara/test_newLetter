import Button from "../../../button/Button";
import { motion } from "framer-motion";
import DigitalClock from "../../../digitalClock/digitalClock";
const DefautlSection = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="w-full h-full overflow-hidden">
        <div className="text-3xl">Default</div>
        <div className="w-full text-white mt-4 h-full flex items-center justify-center">
          <ul className="w-full space-y-4">
            <li className="w-full space-y-3">
              <span>
                <h2 className="text-center">
                  Click on "secret" button to show credentials
                </h2>
              </span>
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

export default DefautlSection;
