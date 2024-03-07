import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { CollectionButtonsProps, CollectionNames } from "@FgTypes/middleTypes";
import CollectionButton from "./CollectionButton";
import { motion, Variants, Transition } from "framer-motion";

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

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function CollectionButtons({
  entityType,
  entity_id,
  isEditablePage,
}: CollectionButtonsProps) {
  /* 
    Description:   
      Creates the collection buttons for swtiching between different collections 
      associated with an entity and also also for creating new collections.
    Unique Properties:
      N/A
  */

  const collectionButtonsRef = useRef<HTMLDivElement>(null);
  const [collectionNames, setCollectionNames] = useState<CollectionNames[]>([]);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  // Get collections for a certain entity
  useEffect(() => {
    const fetchCollectionNamesData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/collections/collections_names`,
          {
            params: {
              id: entity_id,
              type: entityType,
            },
          },
        );
        setCollectionNames(response.data);
      } catch (error) {
        console.error("Error fetching collection names:", error);
      }
    };

    fetchCollectionNamesData();
  }, [entity_id]);

  const collections = collectionNames.map((collection) => {
    return (
      <CollectionButton
        key={collection.collection_id}
        entityType={entityType}
        collection_id={collection.collection_id}
        collection_name={collection.collection_name}
      />
    );
  });

  // Logic for how scroll buttons should be displayed based on given conditions
  const updateVisibleScroll = () => {
    if (collectionButtonsRef.current) {
      if (collectionButtonsRef.current.scrollLeft > 0) {
        setShowLeftScroll(true);
      } else {
        setShowLeftScroll(false);
      }

      if (
        collectionButtonsRef.current.scrollWidth >
        collectionButtonsRef.current.clientWidth
      ) {
        if (
          collectionButtonsRef.current.scrollLeft +
            collectionButtonsRef.current.clientWidth <
          collectionButtonsRef.current.scrollWidth
        ) {
          setShowRightScroll(true);
        } else {
          setShowRightScroll(false);
        }
      } else {
        setShowRightScroll(false);
      }
    }
  };

  // Change which scroll buttons are visible when new collections are loaded
  useEffect(() => {
    updateVisibleScroll();
  }, [collectionNames]);

  const handleScroll = () => {
    updateVisibleScroll();
  };

  const scrollToRight = () => {
    if (collectionButtonsRef.current) {
      const scrollWidth = collectionButtonsRef.current.scrollWidth;
      const clientWidth = collectionButtonsRef.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollStep = clientWidth;

      let newScrollLeft = collectionButtonsRef.current.scrollLeft + scrollStep;

      newScrollLeft = Math.min(newScrollLeft, maxScroll);

      collectionButtonsRef.current.scrollLeft = newScrollLeft;
    }
  };

  const scrollToLeft = () => {
    if (collectionButtonsRef.current) {
      const scrollStep = collectionButtonsRef.current.clientWidth;

      let newScrollLeft = collectionButtonsRef.current.scrollLeft - scrollStep;

      newScrollLeft = Math.max(newScrollLeft, 0);

      collectionButtonsRef.current.scrollLeft = newScrollLeft;
    }
  };

  return (
    <>
      {collectionNames.length > 0 && (
        <div className="h-11 mb-2 flex w-full px-2 items-center justify-start">
          {showLeftScroll && (
            <motion.div
              className="w-10 h-9 bg-white flex items-center justify-center z-10"
              style={{
                boxShadow: "16px 0 8px 10px rgba(255, 255, 255, 1)",
              }}
              variants={scrollButtonsVar}
              initial="leftInit"
              animate={showLeftScroll ? "leftAnimate" : "leftInit"}
              transition={transition}
            >
              <motion.button
                className="w-10 aspect-square rounded-full"
                variants={scrollButtonsVar}
                whileHover="hover"
                onClick={scrollToLeft}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 -960 960 960"
                  width="40"
                >
                  <path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" />
                </svg>
              </motion.button>
            </motion.div>
          )}
          <div
            ref={collectionButtonsRef}
            className="h-11 grow space-x-6 flex items-center justify-start overflow-x-auto w-full"
            onScroll={handleScroll}
          >
            {isEditablePage.current && (
              <button
                className="h-9 aspect-square bg-fg-white-90 rounded bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url("/assets/icons/plus.svg")',
                }}
              ></button>
            )}
            {collections}
          </div>
          {showRightScroll && (
            <motion.div
              className="w-10 h-9 bg-white flex items-center justify-center z-10"
              style={{
                boxShadow: "-16px 0 8px 10px rgba(255, 255, 255, 1)",
              }}
              variants={scrollButtonsVar}
              initial="rightInit"
              animate={showRightScroll ? "rightAnimate" : "rightInit"}
              transition={transition}
            >
              <motion.button
                className="w-10 aspect-square rounded-full"
                variants={scrollButtonsVar}
                whileHover="hover"
                onClick={scrollToRight}
              >
                <svg
                  className="ml-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 -960 960 960"
                  width="40"
                >
                  <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
