// Section1.tsx
import React from "react";
import { motion } from "framer-motion";
import { CoinLottie } from "../Lotties";

interface Section1Props {
  onNext: () => void;
}
export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};
const Section1: React.FC<Section1Props> = ({ onNext }) => {
  return (
    <div className="m-auto flex h-3/4 w-[90%] flex-col shadow-md lg:flex-row">
      <motion.div
        className="h-full w-[40%] rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} // Adjust the duration for the fade-in effect
      >
        <img
          className="h-full w-full rounded-lg"
          src="./images/woman-music.jpg"
          alt="woman-listening-to-music"
        />
      </motion.div>
      <div className="flex h-full w-[60%] flex-col items-center justify-center">
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
              className="text-4xl text-primary"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Discover your Potential
            </motion.h1>
            <motion.p
              className="max-w-xl text-gray-200 transition-colors sm:text-lg"
              variants={STAGGER_CHILD_VARIANTS}
            >
              Are you ready to revolutionize the music industry? <br /> With
              Euterpe, you're not just an artist or an investor - you're a
              pioneer in the future of music. Seamlessly integrate your
              influence from platforms like Spotify, Apple Music, Audiomack,
              TikTok, and more to determine your token value. Watch as your
              impact on the music world translates into tangible rewards.
            </motion.p>

            <div className="flex gap-10">
              <motion.button
                onClick={onNext}
                variants={STAGGER_CHILD_VARIANTS}
                className="w-36 rounded border-2 border-primary bg-background px-4 py-2 font-bold text-white shadow-lg hover:text-primary"
              >
                <span>Skip</span>
              </motion.button>
              <motion.button
                onClick={onNext}
                variants={STAGGER_CHILD_VARIANTS}
                className="w-36 rounded bg-primary px-4 py-2 font-bold text-black shadow-lg  hover:bg-lime-400"
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

export default Section1;
