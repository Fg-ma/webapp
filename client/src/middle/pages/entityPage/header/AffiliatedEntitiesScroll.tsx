import React, { useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { AffiliatedEntitiesScrollProps } from "@FgTypes/middleTypes";

const scrollButtonsVar: Variants = {
  leftInit: { opacity: 0, x: -20 },
  leftAnimate: {
    opacity: 1,
    x: 0,
  },
  rightInit: { opacity: 0, x: 20 },
  rightAnimate: {
    opacity: 1,
    x: 0,
  },
  hover: { backgroundColor: "rgb(64 64 64)", fill: "white" },
};

const transition: Transition = {
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export default function AffiliatedEntitiesScroll({
  affiliatesProfilePictures,
  affiliateProfilePictureRef,
  topHeaderRef,
}: AffiliatedEntitiesScrollProps) {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = () => {
    if (affiliateProfilePictureRef.current) {
      if (affiliateProfilePictureRef.current.scrollLeft > 0) {
        setShowLeftScroll(true);
      } else {
        setShowLeftScroll(false);
      }

      if (
        affiliateProfilePictureRef.current.scrollLeft +
          affiliateProfilePictureRef.current.clientWidth <
        affiliateProfilePictureRef.current.scrollWidth
      ) {
        setShowRightScroll(true);
      } else {
        setShowRightScroll(false);
      }
    }
  };

  const scrollToRight = () => {
    if (affiliateProfilePictureRef.current) {
      const scrollWidth = affiliateProfilePictureRef.current.scrollWidth;
      const clientWidth = affiliateProfilePictureRef.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollStep = clientWidth;

      let newScrollLeft =
        affiliateProfilePictureRef.current.scrollLeft + scrollStep;

      newScrollLeft = Math.min(newScrollLeft, maxScroll);

      affiliateProfilePictureRef.current.scrollLeft = newScrollLeft;
    }
  };

  const scrollToLeft = () => {
    if (affiliateProfilePictureRef.current) {
      const scrollStep = affiliateProfilePictureRef.current.clientWidth;

      let newScrollLeft =
        affiliateProfilePictureRef.current.scrollLeft - scrollStep;

      newScrollLeft = Math.max(newScrollLeft, 0);

      affiliateProfilePictureRef.current.scrollLeft = newScrollLeft;
    }
  };

  return (
    <div
      className="flex flex-row h-8"
      style={{
        maxWidth: topHeaderRef.current
          ? `${topHeaderRef.current.clientWidth - 125}px`
          : "100%",
      }}
    >
      {showLeftScroll && (
        <motion.div
          className="w-10 h-8 bg-white flex items-center justify-center z-10"
          style={{
            boxShadow: "16px 0 8px 10px rgba(255, 255, 255, 1)",
          }}
          variants={scrollButtonsVar}
          initial="leftInit"
          animate={showLeftScroll ? "leftAnimate" : "leftInit"}
          transition={transition}
        >
          <motion.button
            className="bg-fg-white-95 w-8 aspect-square rounded-full"
            variants={scrollButtonsVar}
            whileHover="hover"
            onClick={scrollToLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
      <div
        ref={affiliateProfilePictureRef}
        className="flex space-x-6 overflow-x-auto grow"
        onScroll={handleScroll}
      >
        {affiliatesProfilePictures}
      </div>
      {showRightScroll && (
        <motion.div
          className="w-10 h-8 bg-white flex items-center justify-center z-10"
          style={{
            boxShadow: "-16px 0 8px 10px rgba(255, 255, 255, 1)",
          }}
          variants={scrollButtonsVar}
          initial="rightInit"
          animate={showRightScroll ? "rightAnimate" : "rightInit"}
          transition={transition}
        >
          <motion.button
            className="bg-fg-white-95 w-8 aspect-square rounded-full"
            variants={scrollButtonsVar}
            whileHover="hover"
            onClick={scrollToRight}
          >
            <svg
              className="ml-0.25"
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
