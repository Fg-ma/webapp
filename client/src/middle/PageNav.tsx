import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, Variants, Transition } from "framer-motion";
import {
  setPageState,
  setIds,
  setSecondaryPageState,
} from "@redux/pageState/pageStateActions";
import {
  ConverationId,
  LoginState,
  MainSecondaryState,
  MainState,
  TableId,
} from "@FgTypes/middleTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

const navButtonsVar: Variants = {
  init: {
    fontSize: "1rem",
    lineHeight: "1rem",
    paddingTop: "0.25rem",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(44, 146, 245, 0)",
    textDecorationThickness: "2px",
    textUnderlineOffset: "8px",
  },
  hover: {
    textDecorationColor: "rgba(44, 146, 245, 1)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    paddingTop: "0rem",
  },
};

const transition: Transition = {
  transition: {
    ease: "easeOut",
    duration: 0.1,
  },
};

export default function PageNav() {
  /* 
    Description:   
      Creates the page navbar that appears at the bottom of the middle space
      section. Most of the state changes here will appear to chane the content 
      in the middle space rather than side spaces.
    Unique Properties:
      framer-motion used to control hover styles.
  */

  const dispatch = useDispatch();
  const mainPageState = useSelector(
    (state: MainState) => state.page.main.pagePayload.pageState,
  );
  const mainSecondaryPageState = useSelector(
    (state: MainSecondaryState) =>
      state.page.main.pagePayload.secondaryPageState,
  );
  const username = useSelector(
    (state: LoginState) => state.page.login.pagePayload.username,
  );
  const conversation_id = useSelector(
    (state: ConverationId) => state.page.main.pagePayload.ids.conversation_id,
  );
  const table_id = useSelector(
    (state: TableId) => state.page.main.pagePayload.ids.table_id,
  );
  const pageNavRef = useRef<HTMLDivElement>(null);
  const [isReducedPageNav, setIsReducedPageNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (
        pageNavRef.current?.clientWidth &&
        pageNavRef.current.clientWidth < 680
      ) {
        setIsReducedPageNav(true);
      } else {
        setIsReducedPageNav(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deactiveTextStyles: React.CSSProperties = {};
  const activeTextStyles: React.CSSProperties = {
    textDecorationLine: "underline",
    textDecorationColor: "#F56114",
    textUnderlineOffset: "8px",
    textDecorationThickness: "2px",
    paddingBottom: "0.25rem",
  };
  const mainPageTextStyles: Record<string, React.CSSProperties> = {
    profile: deactiveTextStyles,
    home: deactiveTextStyles,
    messages: deactiveTextStyles,
    dogEars: deactiveTextStyles,
    tables: deactiveTextStyles,
    notifications: deactiveTextStyles,
    settings: deactiveTextStyles,
  };

  const deactiveSVGStyles: React.CSSProperties = {};
  const activeSVGStyles: React.CSSProperties = {
    fill: "#F56114",
  };
  const mainPageSVGStyles: Record<string, React.CSSProperties> = {
    profile: deactiveSVGStyles,
    home: deactiveSVGStyles,
    messages: deactiveSVGStyles,
    dogEars: deactiveSVGStyles,
    tables: deactiveSVGStyles,
    notifications: deactiveSVGStyles,
    settings: deactiveSVGStyles,
  };

  if (
    mainSecondaryPageState === "messages" ||
    mainSecondaryPageState === "tables"
  ) {
    mainPageTextStyles[mainSecondaryPageState] = { ...activeTextStyles };
    if (isReducedPageNav) {
      mainPageSVGStyles[mainSecondaryPageState] = { ...activeSVGStyles };
    }
  } else {
    mainPageTextStyles[mainPageState] = { ...activeTextStyles };
    if (isReducedPageNav) {
      mainPageSVGStyles[mainPageState] = { ...activeSVGStyles };
    }
  }

  const swapPageState = (newState: string) => {
    dispatch(setPageState("main", newState));
    dispatch(setSecondaryPageState("main", null));
  };

  const profileNavFunction = () => {
    dispatch(setPageState("individuals", "sheets"));
    dispatch(setSecondaryPageState("main", null));
    dispatch(setIds("main", "individual_id", username));
    dispatch(setIds("individuals", "collection_id", null));
  };

  const messagesNavFunction = (newState: string) => {
    dispatch(setSecondaryPageState("main", newState));
    if (conversation_id) {
      dispatch(setPageState("main", newState));
    }
  };

  const tablesNavFunction = (newState: string) => {
    dispatch(setSecondaryPageState("main", newState));
    if (table_id) {
      dispatch(setPageState("main", newState));
    }
  };

  return (
    <div
      ref={pageNavRef}
      className="grow w-full flex items-center justify-center"
    >
      <nav
        className="bg-fg-white-95 h-16 w-full rounded-xl"
        style={{
          boxShadow:
            "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex divide-x-2 divide-fg-white-70 h-full">
          <motion.div
            className="h-11 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => {
              swapPageState("profile");
              profileNavFunction();
            }}
          >
            <ProfilePicture
              size={{ w: 2.5, h: 2.5 }}
              entity_username={username}
              entity_type={1}
              styles="rounded-full"
              clickable={false}
            />
            {!isReducedPageNav && (
              <button style={mainPageTextStyles["profile"]} className="ml-2">
                Profile
              </button>
            )}
          </motion.div>
          <motion.div
            className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapPageState("home")}
          >
            <button className="w-7 aspect-square">
              <svg
                style={mainPageSVGStyles["home"]}
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 -960 960 960"
                width="28"
              >
                <path d="M222.152-182.152h143.783V-400q0-14.424 9.82-24.245 9.821-9.82 24.245-9.82h160q14.424 0 24.245 9.82 9.82 9.821 9.82 24.245v217.848h143.783v-386.812L480-762.37 222.152-568.964v386.812Zm-68.13 0v-386.891q0-16.112 7.133-30.528 7.134-14.416 19.975-23.929l257.848-193.565q17.832-13.674 40.862-13.674t41.182 13.674L778.87-623.5q12.953 9.513 20.151 23.929 7.197 14.416 7.197 30.528v386.891q0 28.349-19.962 48.24-19.961 19.89-48.408 19.89H562.63q-14.423 0-24.244-9.82-9.821-9.821-9.821-24.245v-220.478h-97.13v220.478q0 14.424-9.821 24.245-9.821 9.82-24.244 9.82H222.152q-28.349 0-48.24-19.89-19.89-19.891-19.89-48.24ZM480-472.761Z" />
              </svg>
            </button>
            {!isReducedPageNav && (
              <button style={mainPageTextStyles["home"]} className="ml-1 pt-1">
                Home
              </button>
            )}
          </motion.div>
          <motion.div
            className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => tablesNavFunction("tables")}
          >
            <button className="w-7 aspect-square">
              <svg
                style={mainPageSVGStyles["tables"]}
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 560.000000 560.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,560.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M2620 5553 c-36 -19 -621 -313 -1302 -654 -931 -466 -1243 -627
           -1262 -650 -25 -30 -26 -35 -26 -165 l0 -134 36 -40 c20 -22 39 -38 41 -36 3
           3 10 0 17 -5 6 -6 44 -28 83 -50 l73 -39 2 -1023 c3 -1115 0 -1052 62 -1098
           44 -34 128 -34 175 0 64 46 61 -2 61 1021 0 511 3 930 8 930 4 0 27 -12 52
           -26 40 -23 283 -160 975 -549 110 -62 358 -202 550 -312 193 -110 401 -228
           462 -263 l113 -63 2 -1146 c3 -1087 4 -1147 21 -1173 51 -75 180 -77 247 -3
           l25 27 1 346 c1 191 2 705 3 1142 l2 795 52 31 c29 17 63 35 77 39 14 4 354
           172 755 373 653 326 1051 522 1061 522 2 0 5 -363 6 -807 2 -658 6 -813 17
           -834 50 -98 207 -102 260 -8 21 36 21 46 21 916 l0 880 126 59 c69 32 134 69
           145 82 16 21 19 42 19 151 0 80 -5 135 -13 150 -6 13 -46 43 -87 66 -308 171
           -612 342 -1100 620 -311 177 -592 337 -625 355 -32 18 -134 76 -225 130 -196
           115 -428 247 -635 360 -82 45 -163 90 -180 100 -30 17 -31 17 -95 -17z m-80
           -1543 c0 -588 -2 -1070 -5 -1070 -5 0 -227 125 -650 365 -176 100 -342 194
           -370 210 -27 15 -95 53 -150 85 -99 57 -400 228 -688 390 -81 46 -147 86 -147
           89 0 4 199 106 443 228 243 121 691 345 995 497 304 152 557 276 562 276 6 0
           10 -401 10 -1070z m760 807 c157 -88 296 -168 310 -177 14 -9 126 -74 250
           -143 461 -258 1184 -674 1186 -683 2 -8 -2107 -1065 -2139 -1072 -8 -2 -44 13
           -80 33 l-66 36 37 34 37 34 1 348 c1 191 2 685 2 1096 l2 748 88 -47 c48 -26
           215 -119 372 -207z"
                  />
                </g>
              </svg>
            </button>
            {!isReducedPageNav && (
              <button
                style={mainPageTextStyles["tables"]}
                className="ml-2 pt-1"
              >
                Tables
              </button>
            )}
          </motion.div>
          <motion.div
            className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => messagesNavFunction("messages")}
          >
            <button className="w-7 aspect-square">
              <svg
                style={mainPageSVGStyles["messages"]}
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 -960 960 960"
                width="28"
              >
                <path d="M142.152-154.022q-27.599 0-47.865-20.265-20.265-20.266-20.265-47.865v-515.696q0-27.697 20.265-48.033 20.266-20.337 47.865-20.337h675.696q27.697 0 48.033 20.337 20.337 20.336 20.337 48.033v515.696q0 27.599-20.337 47.865-20.336 20.265-48.033 20.265H142.152Zm675.696-523.326L498.415-467.029q-4.696 2.486-8.816 4.105-4.121 1.62-9.599 1.62t-9.599-1.62q-4.12-1.619-8.816-4.105L142.152-677.348v455.196h675.696v-455.196ZM480-519.848l333.848-218H147.152l332.848 218Zm-337.848-157.5v7.718-43.025.811-26.004 25.631-1.152 43.739-7.718 455.196-455.196Z" />
              </svg>
            </button>
            {!isReducedPageNav && (
              <button
                style={mainPageTextStyles["messages"]}
                className="ml-1 pt-1"
              >
                Messages
              </button>
            )}
          </motion.div>
          <motion.div
            className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapPageState("notifications")}
          >
            <button className="w-7 aspect-square">
              <svg
                style={mainPageSVGStyles["notifications"]}
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 -960 960 960"
                width="28"
              >
                <path d="M188.087-194.022q-14.424 0-24.245-9.871-9.82-9.871-9.82-24.369 0-14.499 9.82-24.195 9.821-9.695 24.245-9.695h43.782v-298.022q0-86.079 50.337-154.768 50.337-68.688 133.729-86.406v-20.565q0-26.794 18.685-45.549 18.686-18.756 45.38-18.756 26.694 0 45.38 18.756 18.685 18.755 18.685 45.549v20.565q83.392 17.478 133.848 86.25 50.457 68.772 50.457 154.924v298.022h43.543q14.394 0 24.349 9.871 9.956 9.871 9.956 24.37 0 14.498-9.956 24.194-9.955 9.695-24.349 9.695H188.087ZM480-501.043Zm.12 429.174q-33.825 0-57.929-24.133-24.104-24.132-24.104-58.02h164.065q0 33.957-24.153 58.055T480.12-71.87ZM300-262.152h360v-298.022q0-74.761-52.5-127.38-52.5-52.62-127.5-52.62t-127.5 52.62Q300-634.935 300-560.174v298.022Z" />
              </svg>
            </button>
            {!isReducedPageNav && (
              <button
                style={mainPageTextStyles["notifications"]}
                className="ml-1 pt-1"
              >
                Notifications
              </button>
            )}
          </motion.div>
          <motion.div
            className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
            variants={navButtonsVar}
            initial="init"
            whileHover="hover"
            transition={transition}
            onClick={() => swapPageState("settings")}
          >
            <button className="w-7 aspect-square">
              <svg
                style={mainPageSVGStyles["settings"]}
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 -960 960 960"
                width="28"
              >
                <path d="M412.326-74.022q-12.674 0-22.37-7.956-9.695-7.957-11.695-20.631L362.5-201.935q-17.565-6.282-37.489-17.684-19.924-11.403-34.728-23.446l-91.326 42.522q-12.196 5.478-24.87 1.5-12.674-3.979-19.391-16.413L87.022-335.804q-6.957-11.435-3.598-23.87 3.358-12.435 13.554-20.391l84.565-61.805q-1.761-8.282-2.261-19.065-.5-10.782-.5-19.065 0-8.283.5-19.065.5-10.783 2.261-19.065l-84.565-61.805q-10.195-7.956-13.554-20.391-3.359-12.435 3.598-23.87l67.674-120.108q6.717-12.196 19.391-16.294 12.674-4.098 24.87 1.38l91.804 42.283q14.565-11.804 34.369-23.087 19.805-11.282 37.37-16.804l15.761-100.804q2-12.435 11.695-20.511 9.696-8.077 22.37-8.077h135.348q12.674 0 22.37 8.077 9.695 8.076 11.695 20.511l15.761 99.804q17.565 6.522 37.87 17.304 20.304 10.783 34.347 23.587l91.326-42.283q12.196-5.478 24.87-1.38 12.674 4.098 19.391 16.294l67.914 119.108q6.717 11.435 3.858 24.37-2.858 12.935-14.293 20.891l-84.565 59.805q1.76 9.282 2.38 20.065.62 10.782.62 20.065 0 9.283-.62 19.565-.62 10.283-2.38 19.565l84.565 60.805q10.435 7.956 13.793 20.391 3.359 12.435-3.358 23.87l-68.153 120.587q-6.717 12.435-19.271 16.293-12.555 3.859-24.751-1.619l-91.565-42.522q-14.804 12.043-34.108 23.826-19.305 11.783-37.87 17.304l-15.761 99.326q-2 12.674-11.695 20.63-9.696 7.957-22.37 7.957H412.326Zm25.587-68.13h83.935l14.239-111.761q33.239-8 63.098-25 29.858-17 53.858-41.717l106 46 37.848-68.892-93.521-68.521q4-17.24 6.619-33.979 2.62-16.739 2.62-33.978t-2.12-33.978q-2.119-16.739-7.119-33.979l93.76-68.521-38.087-68.892-105.76 46q-23-26.478-52.479-44.336-29.478-17.859-64.717-22.62l-14-111.522h-84.174l-13.761 111.522q-34.478 6.761-64.456 24.12-29.979 17.358-53.218 42.836l-105.521-46-38.087 68.892 93.282 68.282q-4 17.239-6.619 34.098-2.62 16.859-2.62 34.098 0 17.239 2.62 34.217 2.619 16.979 6.619 33.979l-93.282 68.282 38.087 68.892 105.521-46q24.239 24.478 54.218 41.717 29.978 17.239 63.456 25.239l13.761 111.522ZM479.522-350q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38ZM480-480Z" />
              </svg>
            </button>
            {!isReducedPageNav && (
              <button
                style={mainPageTextStyles["settings"]}
                className="ml-1 pt-1"
              >
                Settings
              </button>
            )}
          </motion.div>
        </div>
      </nav>
    </div>
  );
}
