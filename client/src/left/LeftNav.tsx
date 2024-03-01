import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, Transition, Variants } from "framer-motion";
import { setPageState } from "@redux/pageState/pageStateActions";
import { LeftState } from "@FgTypes/leftTypes";

const navButtonsVar: Variants = {
  init: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    paddingTop: "0.25rem",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(44, 146, 245, 0)",
    textDecorationThickness: "2px",
    textUnderlineOffset: "8px",
  },
  hover: {
    textDecorationColor: "rgba(44, 146, 245, 1)",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    paddingTop: "0rem",
  },
};

const transition: Transition = {
  transition: {
    ease: "easeOut",
    duration: 0.1,
  },
};

export default function LeftNav() {
  /* 
    Description:   
      A navbar that cycles between individuals, groups, and organizations. The currently 
      selected item is underlined in fg-primary. It also sets the state in redux to 
      determine what should be displayed in the top and bottom panes of LeftVerticalSplitPane.
    Unique Properties:
      framer-motion used to control hover styles.
  */

  const dispatch = useDispatch();
  const leftPage = useSelector(
    (state: LeftState) => state.page.left.pagePayload.pageState,
  );

  const deactiveStyles: React.CSSProperties = {};
  const activeStyles: React.CSSProperties = {
    textDecorationLine: "underline",
    textDecorationColor: "#F56114",
    textUnderlineOffset: "8px",
    textDecorationThickness: "2px",
    paddingBottom: "0.25rem",
  };
  const leftStyles: Record<string, React.CSSProperties> = {
    individuals: deactiveStyles,
    groups: deactiveStyles,
    organizations: deactiveStyles,
  };
  leftStyles[leftPage] = { ...activeStyles };

  const navItems = ["individuals", "groups", "organizations"];

  function swapLeftState(newState: string) {
    dispatch(setPageState("left", newState));
  }

  return (
    <nav
      id="leftNavbarBarSpace"
      className="relative z-50 block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md"
    >
      <div className="flex divide-x-2 divide-fg-white-70 h-full drop-shadow-md">
        {navItems.map((navItem) => (
          <motion.div
            key={navItem}
            className="h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapLeftState(navItem)}
          >
            <button className="w-full" style={leftStyles[navItem]}>
              {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
            </button>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}
