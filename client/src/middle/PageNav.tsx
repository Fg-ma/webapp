import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { motion, Variants, Transition } from "framer-motion";
import { setPageState, setIds } from "@redux/pageState/pageStateActions";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

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

interface MainState {
  page: {
    main: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

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

  const deactiveStyles: React.CSSProperties = {};
  const activeStyles: React.CSSProperties = {
    textDecorationLine: "underline",
    textDecorationColor: "#F56114",
    textUnderlineOffset: "8px",
    textDecorationThickness: "2px",
    paddingBottom: "0.25rem",
  };
  const mainPageStyles: Record<string, React.CSSProperties> = {
    profile: deactiveStyles,
    home: deactiveStyles,
    messages: deactiveStyles,
    dogEars: deactiveStyles,
    notifications: deactiveStyles,
    settings: deactiveStyles,
  };

  mainPageStyles[mainPageState] = { ...activeStyles };

  const swapPageState = (newState: string) => {
    dispatch(setPageState("main", newState));
  };

  const profileNavFunction = () => {
    dispatch(setPageState("individuals", "sheets"));
    dispatch(setIds("main", "individual_id", "user"));
    dispatch(setIds("individuals", "collection_id", null));
  };

  useEffect(() => {
    const fetchProfilePictureData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/images/get_user_profile_picture`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response);

        //if (response.data) {
        //  const blobData = new Uint8Array(
        //    response.data.fullImage.images_data.image_data.data,
        //  );
        //
        //  const extension = response.data.fullImage.image_filename
        //    .slice(-3)
        //    .toLowerCase();
        //
        //  const mimeType = getMimeType(extension);
        //
        //  if (mimeType) {
        //    const url = URL.createObjectURL(
        //      new Blob([blobData], { type: mimeType }),
        //    );
        //
        //    //setImageData({
        //    //  image_url: url,
        //    //  image_title: response.data.fullImage.image_title,
        //    //  image_description: response.data.fullImage.image_description,
        //    //  entity_type: response.data.fullImage.entities.entity_type,
        //    //  image_creator: response.data.imageCreator,
        //    //});
        //  }
        //}
      } catch (error) {
        console.error("Error fetching profile picture data:", error);
      }
    };

    fetchProfilePictureData();
  }, []);

  const getMimeType = (extension: string) => {
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      default:
        return null;
    }
  };

  return (
    <nav
      id="pageNav"
      className="bg-fg-white-95 h-16  w-full rounded-xl mt-8"
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
          <img className="rounded-full bg-fg-white-90 h-10 aspect-square text-sm"></img>
          <button style={mainPageStyles["profile"]} className="ml-2">
            Profile
          </button>
        </motion.div>
        <motion.div
          className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
          variants={navButtonsVar}
          initial="init"
          whileHover="hover"
          transition={transition}
          onClick={() => swapPageState("home")}
        >
          <button
            className="w-7 aspect-square bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: 'url("/assets/icons/home.svg")',
            }}
          ></button>
          <button style={mainPageStyles["home"]} className="ml-1 pt-1">
            Home
          </button>
        </motion.div>
        <motion.div
          className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
          variants={navButtonsVar}
          initial="init"
          whileHover="hover"
          transition={transition}
          onClick={() => swapPageState("messages")}
        >
          <button
            className="w-7 aspect-square bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: 'url("/assets/icons/messages.svg")',
            }}
          ></button>
          <button style={mainPageStyles["messages"]} className="ml-1 pt-1">
            Messages
          </button>
        </motion.div>
        <motion.div
          className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
          variants={navButtonsVar}
          initial="init"
          whileHover="hover"
          transition={transition}
          onClick={() => swapPageState("dogEars")}
        >
          <button
            className="w-7 aspect-square bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: 'url("/assets/icons/dogEars.svg")',
            }}
          ></button>
          <button style={mainPageStyles["dogEars"]} className="ml-1 pt-1">
            Dog-Ears
          </button>
        </motion.div>
        <motion.div
          className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
          variants={navButtonsVar}
          initial="init"
          whileHover="hover"
          transition={transition}
          onClick={() => swapPageState("notifications")}
        >
          <button
            className="w-7 aspect-square bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: 'url("/assets/icons/notifications.svg")',
            }}
          ></button>
          <button style={mainPageStyles["notifications"]} className="ml-1 pt-1">
            Notifications
          </button>
        </motion.div>
        <motion.div
          className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
          variants={navButtonsVar}
          initial="init"
          whileHover="hover"
          transition={transition}
          onClick={() => swapPageState("settings")}
        >
          <button
            className="w-7 aspect-square bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: 'url("/assets/icons/settings.svg")',
            }}
          ></button>
          <button style={mainPageStyles["settings"]} className="ml-1 pt-1">
            Settings
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
