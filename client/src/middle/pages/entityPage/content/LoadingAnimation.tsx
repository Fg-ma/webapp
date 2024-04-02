import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-3 h-3 bg-fg-black-25 rounded-full mx-1"
        animate={{
          y: [0, 20, 20, 0, 0, 0],
          scaleY: [1, 0.8, 0.8, 1.2, 1, 1],
          scaleX: [1, 1.2, 1.2, 0.8, 1, 1],
        }}
        transition={{
          y: {
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.4, 0.5, 0.9, 1, 1],
            repeat: Infinity,
          },
          scaleY: {
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.495, 0.55, 0.7, 0.8, 1],
            repeat: Infinity,
          },
          scaleX: {
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.495, 0.55, 0.7, 0.8, 1],
            repeat: Infinity,
          },
        }}
      ></motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;
