// components/welcome/intro.tsx
import { motion } from "framer-motion";
// import STAGGER_CHILD_VARIANTS from "./stagger-variants";

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function Intro() {
  return (
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
        className="[...]"
      >
        <motion.h1 className="[...]" variants={STAGGER_CHILD_VARIANTS}>
          Welcome to Papermark
        </motion.h1>
        <motion.p
          className="max-w-md text-gray-200 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Papermark gives you the power to share documents with your clients and
          see analytics on how they interact with them.
        </motion.p>
        <motion.button variants={STAGGER_CHILD_VARIANTS} className="[...]">
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
