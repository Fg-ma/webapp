import React from "react";
import { Transition, Variants, motion } from "framer-motion";

export default function LoadingAnimation({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  if (!containerRef.current) {
    return;
  }

  const y = (containerRef.current.clientHeight * 0.5) / 2;
  const x = (containerRef.current.clientWidth * 0.3) / 2;
  const duration = y / 14 + 14.8 / 14;

  const animateVar: Variants = {
    animate: {
      x: [
        0,
        x * (5 / 6),
        x,
        x,
        x * (5 / 6),
        0,
        0,
        0,
        -x * (5 / 6),
        -x,
        -x,
        -x * (5 / 6),
        0,
        0,
      ],
      y: [-y, y, y, y, -y, -y, -y, -y, y, y, y, -y, -y, -y],
      scaleY: [1, 1, 0.6, 0.6, 1.4, 1, 1, 1, 1, 0.6, 0.6, 1.4, 1, 1],
      scaleX: [1, 1, 1.4, 1.4, 0.6, 1, 1, 1, 1, 1.4, 1.4, 0.6, 1, 1],
    },
  };

  const animateTransition: Transition = {
    x: {
      duration: duration,
      ease: "linear",
      times: [
        0, 0.15, 0.225, 0.275, 0.35, 0.5, 0.5, 0.5, 0.65, 0.725, 0.775, 0.85, 1,
        1,
      ],
      repeat: Infinity,
    },
    y: {
      duration: duration,
      ease: "easeInOut",
      times: [
        0, 0.225, 0.25, 0.275, 0.4875, 0.5, 0.5, 0.5, 0.725, 0.75, 0.775,
        0.9875, 1, 1,
      ],
      repeat: Infinity,
    },
    scaleY: {
      duration: duration,
      ease: "easeInOut",
      times: [
        0, 0.175, 0.225, 0.275, 0.325, 0.35, 0.5, 0.5, 0.675, 0.725, 0.775,
        0.825, 0.85, 1,
      ],
      repeat: Infinity,
    },
    scaleX: {
      duration: duration,
      ease: "easeInOut",
      times: [
        0, 0.175, 0.225, 0.275, 0.325, 0.35, 0.5, 0.5, 0.675, 0.725, 0.775,
        0.825, 0.85, 1,
      ],
      repeat: Infinity,
    },
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        className="w-3 h-3 bg-fg-black-25 rounded-full mx-1"
        variants={animateVar}
        animate="animate"
        transition={animateTransition}
      ></motion.div>
    </div>
  );
}
