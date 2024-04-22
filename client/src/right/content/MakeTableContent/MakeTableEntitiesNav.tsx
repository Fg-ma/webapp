import React from "react";
import { useDispatch } from "react-redux";
import { Transition, Variants, motion } from "framer-motion";
import { setPageState } from "@redux/pageState/pageStateActions";
import { MakeTableEntitiesNavProps } from "@FgTypes/rightTypes";

const navButtonsVar: Variants = {
  init: {
    fontSize: "1.125rem",
    lineHeight: "1.625rem",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(44, 146, 245, 0)",
    textDecorationThickness: "2px",
    textUnderlineOffset: "8px",
  },
  hover: {
    textDecorationColor: "rgba(44, 146, 245, 1)",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
  },
};

const transition: Transition = {
  transition: {
    ease: "easeOut",
    duration: 0.1,
  },
};

export default function MakeTableEntitiesNav({
  makeTablePageState,
}: MakeTableEntitiesNavProps) {
  const dispatch = useDispatch();
  const deactiveStyles: React.CSSProperties = {};
  const activeStyles: React.CSSProperties = {
    textDecorationColor: "#F56114",
  };
  const pageStyles: Record<string, React.CSSProperties> = {
    individual: deactiveStyles,
    group: deactiveStyles,
    organization: deactiveStyles,
  };
  pageStyles[makeTablePageState] = { ...activeStyles };

  const navItems = ["individual", "group", "organization"];

  function swapPageState(newState: string) {
    dispatch(setPageState("makeTable", newState));
  }

  return (
    <div className="flex items-center justify-between w-full px-2">
      {navItems.map((navItem) => (
        <div
          key={navItem}
          className="w-max flex items-center justify-center font-bold"
        >
          <motion.div
            key={navItem}
            className="h-8 flex cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapPageState(navItem)}
          >
            <button
              style={pageStyles[navItem]}
              className="underline decoration-2 underline-offset-8 decoration-transparent"
            >
              {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
            </button>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
