// Section2.tsx
import React from "react";
import { motion } from "framer-motion";

interface Section2Props {
  onBack: () => void;
  onNext: () => void;
}
export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};
const Section2: React.FC<Section2Props> = ({ onBack, onNext }) => {
  return (
    <div className="m-auto flex w-[90%] flex-col items-center justify-center gap-10  md:shadow-md lg:flex-row lg:gap-0">
      <motion.div
        className=" h-full w-[50%] rounded-lg md:w-[40%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          className="m-auto h-full w-full rounded-lg"
          src="./images/man-saxaphone.jpg"
          alt="man-playing-saxaphone"
        />
      </motion.div>
      <div className="flex h-full w-[90%] flex-col items-center justify-center md:w-[60%]">
        <motion.div
          className="z-10"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <motion.h1
              className="text-xl text-primary md:text-4xl"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Invest in Innovation
            </motion.h1>
            <motion.p
              className="text-base text-gray-200 transition-colors md:max-w-xl md:text-lg"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Investors, are you looking for the next big thing in music? <br />{" "}
              Explore a diverse range of artists and track their growth over
              time. From budding talents to established stars, invest in their
              success and watch your portfolio flourish. With our unique token
              system, your investments grow alongside the artists you believe
              in.
            </motion.p>

            <div className="flex gap-10">
              <motion.button
                onClick={onBack}
                variants={STAGGER_CHILD_VARIANTS}
                className=" w-auto rounded border-2 border-primary bg-background p-2 font-bold text-white shadow-lg hover:text-primary md:w-36 md:px-4 md:py-2"
              >
                <span>&larr; Previous </span>
              </motion.button>
              <motion.button
                onClick={onNext}
                variants={STAGGER_CHILD_VARIANTS}
                className="w-auto rounded bg-primary p-2 font-bold text-black shadow-lg hover:bg-lime-400 md:w-36 md:px-4  md:py-2"
              >
                <span>Next &rarr;</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
