import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, Variants, Transition } from "framer-motion";
import { setPageState } from "@redux/pageState/pageStateActions";
import { closeDrop } from "@redux/filters/filterActions";
import {
  RightState,
  MessagesState,
  RightNavProps,
  MainSecondaryState,
} from "@FgTypes/rightTypes";

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

export default function RightNav({ mainPageState }: RightNavProps) {
  /* 
    Description:   
      A navbar that cycles between news, explore, messages, and dog ears. The currently 
      selected item is underlined in fg-primary. It also sets the state in redux to 
      determine what should be displayed in the rightSpaceContentContainer.
    Unique Properties:
      framer-motion used to control hover styles.
  */

  const dispatch = useDispatch();
  const rightPage = useSelector(
    (state: RightState) => state.page.right.pagePayload.pageState,
  );
  const messagesPage = useSelector(
    (state: MessagesState) => state.page.messages.pagePayload.pageState,
  );
  const mainSecondaryPageState = useSelector(
    (state: MainSecondaryState) =>
      state.page.main.pagePayload.secondaryPageState,
  );

  const deactiveStyles: React.CSSProperties = {};
  const activeStyles: React.CSSProperties = {
    textDecorationLine: "underline",
    textDecorationColor: "#F56114",
    textUnderlineOffset: "8px",
    textDecorationThickness: "2px",
    paddingBottom: "0.25rem",
  };
  const styles: Record<string, React.CSSProperties> = {
    papers: deactiveStyles,
    news: deactiveStyles,
    explore: deactiveStyles,
    messages: deactiveStyles,
    dogEars: deactiveStyles,
    conversations: deactiveStyles,
    contacts: deactiveStyles,
    tables: deactiveStyles,
    conversation: deactiveStyles,
    members: deactiveStyles,
  };

  let navItems: string[] = [];

  if (mainPageState === "tables") {
    navItems = ["tables", "conversation", "members"];
  } else if (
    mainPageState !== "messages" &&
    mainPageState !== "tables" &&
    mainSecondaryPageState !== "messages"
  ) {
    styles[rightPage] = { ...activeStyles };
    navItems = ["papers", "news", "explore", "dogEars"];
  } else if (
    mainPageState === "messages" ||
    mainSecondaryPageState === "messages"
  ) {
    styles[messagesPage] = { ...activeStyles };
    navItems = ["conversations", "contacts"];
  }

  function swapState(state: string) {
    if (mainPageState !== "messages" && mainSecondaryPageState !== "messages") {
      dispatch(closeDrop(state, "isDropFilter"));
      dispatch(setPageState("right", state));
    } else if (
      mainPageState === "messages" ||
      mainSecondaryPageState === "messages"
    ) {
      dispatch(setPageState("messages", state));
    }
  }

  return (
    <nav
      id="rightNavbarBarSpace"
      className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md"
    >
      <div className="flex divide-x-2 divide-fg-white-70 h-full">
        {navItems.map((navItem) => (
          <motion.div
            key={navItem}
            className="h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapState(navItem)}
          >
            <button className="w-full" style={styles[navItem]}>
              {navItem !== "dogEars"
                ? navItem.charAt(0).toUpperCase() + navItem.slice(1)
                : "Dog-Ears"}
            </button>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}
