import React, { useState, useEffect } from "react";
import Axios from "axios";
import { motion, Variants, Transition } from "framer-motion";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const likeDislikeButtonsVar: Variants = {
  initial: {
    width: "2rem",
    paddingLeft: "0rem",
    paddingRight: "0rem",
    backgroundColor: "#BFBFBF",
  },
  like: {
    width: "4rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    backgroundColor: "#F56114",
    color: "#fff",
    fill: "#fff",
  },
  dislike: {
    width: "4rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    backgroundColor: "#404040",
    color: "#fff",
    fill: "#fff",
  },
  likeHover: {
    width: "2rem",
    backgroundColor: "#F56114",
    color: "#fff",
    fill: "#fff",
  },
  dislikeHover: {
    width: "2rem",
    backgroundColor: "#404040",
    color: "#fff",
    fill: "#fff",
  },
};

const transition: Transition = {
  transition: {
    duration: 0.1,
    ease: "easeOut",
  },
};

interface SheetActionLikeDislikeButtonsProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
    sheet_likes: number;
    sheet_dislikes: number;
  };
}

export default function SheetActionLikeDislikeButtons({
  sheet_id,
  sheetData,
}: SheetActionLikeDislikeButtonsProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeDislikeState, setLikeDislikeState] = useState({
    like: false,
    dislike: false,
  });

  // Sets the intial states
  useEffect(() => {
    setLikes(sheetData.sheet_likes);
    setDislikes(sheetData.sheet_dislikes);
  }, []);

  // Updates whether or not the user likes the displayed sheet
  useEffect(() => {
    const fetchLikesDislikes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/sheets/does_like_or_dislike/${sheet_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setLikeDislikeState(response.data);
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchLikesDislikes();
  }, [likes, dislikes]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    await Axios.post(`${serverUrl}/sheets/like/${sheet_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLikes(response.data.sheet_likes);
        setDislikes(response.data.sheet_dislikes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDislike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    await Axios.post(`${serverUrl}/sheets/dislike/${sheet_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLikes(response.data.sheet_likes);
        setDislikes(response.data.sheet_dislikes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatLikesDislikes = (num: number) => {
    if (num < 1000) {
      return num.toString();
    } else if (num < 100000) {
      return truncateDecimals(num / 1000, 1) + "K";
    } else if (num < 1000000) {
      return Math.floor(num / 1000).toFixed(0) + "K";
    } else if (num < 100000000) {
      return truncateDecimals(num / 1000000, 1) + "M";
    } else if (num < 1000000000) {
      return Math.floor(num / 1000000).toFixed(0) + "M";
    } else {
      return num.toString();
    }
  };

  function truncateDecimals(num: number, digits: number) {
    const numString = num.toString();
    const decimalIndex = numString.indexOf(".");
    if (decimalIndex !== -1) {
      return numString.slice(0, decimalIndex + digits + 1);
    } else {
      return numString;
    }
  }

  return (
    <>
      <motion.button
        className="h-8 rounded-full flex items-center justify-center focus:outline-none"
        onClick={handleLike}
        variants={likeDislikeButtonsVar}
        initial={likeDislikeState.like ? "like" : "initial"}
        animate={likeDislikeState.like ? "like" : "initial"}
        whileHover={likeDislikeState.like ? "like" : "likeHover"}
        whileTap="like"
        transition={transition}
      >
        <svg
          className={`${likeDislikeState.like && "fill-white"} ${
            likes !== 0 && "mr-1"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
        >
          <path d="M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z" />
        </svg>
        {likes !== 0 && formatLikesDislikes(likes)}
      </motion.button>
      <motion.button
        className="h-8 rounded-full flex items-center justify-center focus:outline-none"
        onClick={handleDislike}
        variants={likeDislikeButtonsVar}
        initial={likeDislikeState.dislike ? "dislike" : "initial"}
        animate={likeDislikeState.dislike ? "dislike" : "initial"}
        whileHover={likeDislikeState.dislike ? "dislike" : "dislikeHover"}
        whileTap="dislike"
        transition={transition}
      >
        <svg
          className={`${likeDislikeState.dislike && "mr-1 fill-white"}`}
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
        >
          <path d="M120-320q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14h440v520L440-82q-15 15-35.5 17.5T365-72q-19-10-28-28t-4-37l45-183H120Zm480-34v-406H240L120-480v80h360l-54 220 174-174Zm200-486q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320H680v-80h120v-360H680v-80h120Zm-200 80v406-406Z" />
        </svg>
        {likeDislikeState.dislike && formatLikesDislikes(dislikes)}
      </motion.button>
    </>
  );
}
