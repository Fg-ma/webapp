import React from "react";
import { motion } from "framer-motion";

export default function LoadingAnimation({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  if (!containerRef.current) {
    return;
  }

  const y = (containerRef.current.clientHeight * 0.55) / 2;
  const duration = y / 28 + 14.8 / 28;

  return (
    <motion.div
      className="flex justify-center items-center h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-3 h-3 bg-fg-black-25 rounded-full mx-1"
        animate={{
          x: [0, 30, 0, -30, 0],
          y: [-y, y, y, y, -y, -y, -y],
          scaleY: [1, 1, 0.6, 0.6, 1.4, 1, 1],
          scaleX: [1, 1, 1.4, 1.4, 0.6, 1, 1],
        }}
        transition={{
          x: {
            duration: duration * 2,
            ease: "easeInOut",
            times: [0, 0.225, 0.5, 0.775, 1],
            repeat: Infinity,
          },
          y: {
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.45, 0.5, 0.55, 0.975, 1, 1],
            repeat: Infinity,
          },
          scaleY: {
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.35, 0.45, 0.55, 0.65, 0.7, 1],
            repeat: Infinity,
          },
          scaleX: {
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.35, 0.45, 0.55, 0.65, 0.7, 1],
            repeat: Infinity,
          },
        }}
      ></motion.div>
    </motion.div>
  );
}
