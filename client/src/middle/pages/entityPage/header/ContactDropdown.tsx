import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

import {
  ContactDropdownProps,
  ContactDropdownPortalProps,
} from "@FgTypes/middleTypes";
import CreateContactButton from "./CreateContactButton";

const dropIconVar: Variants = {
  init: {
    rotateX: 0,
  },
  animate: {
    rotateX: 180,
  },
};

const dropIconTransition: Transition = {
  transition: {
    duration: 0.75,
    ease: "easeOut",
  },
};

const dropdownVar: Variants = {
  init: {
    opacity: 0,
    y: "-1vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const dropdownTransition: Transition = {
  transition: {
    duration: 0.25,
    ease: "easeOut",
    delay: 0.275,
  },
};

export default function ContactDropdown({
  entity_username,
  scrollingEntityContainer,
}: ContactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contactDropdownPortalContainerRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }

    if (scrollingEntityContainer.current) {
      scrollingEntityContainer.current.addEventListener("scroll", () =>
        setIsOpen(false),
      );
    }

    return () => {
      if (scrollingEntityContainer.current) {
        scrollingEntityContainer.current.removeEventListener("scroll", () =>
          setIsOpen(false),
        );
      }
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={contactDropdownRef} className="w-1/4 relative">
      <button
        className="w-full h-9 rounded-md bg-fg-white-95 flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <span className="ml-5 grow">Contact</span>
        <motion.svg
          className="w-6 mr-2 aspect-square"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          variants={dropIconVar}
          initial="init"
          animate={isOpen ? "animate" : "init"}
          transition={dropIconTransition}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <div
        ref={contactDropdownPortalContainerRef}
        className="origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 z-50"
      >
        <AnimatePresence>
          {isOpen && (
            <ContactDropdownPortal
              setIsOpen={setIsOpen}
              entity_username={entity_username}
              contactDropdownPortalContainerRef={
                contactDropdownPortalContainerRef
              }
              scrollingEntityContainer={scrollingEntityContainer}
              contactDropdownRef={contactDropdownRef}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ContactDropdownPortal({
  setIsOpen,
  entity_username,
  contactDropdownPortalContainerRef,
  scrollingEntityContainer,
  contactDropdownRef,
}: ContactDropdownPortalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      contactDropdownRef.current &&
      !contactDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const positionDropdown = () => {
      if (!contactDropdownPortalContainerRef.current || !dropdownRef.current) {
        return;
      }

      const containerRect =
        contactDropdownPortalContainerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = containerRect.top;
      let left = containerRect.left - dropdownRect.width * 0.5;

      const newPosition = { top: top, left: left };
      setPosition(newPosition);
    };

    positionDropdown();

    const handleScroll = () => {
      positionDropdown();
    };

    if (scrollingEntityContainer.current) {
      scrollingEntityContainer.current.addEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", positionDropdown);

    return () => {
      if (scrollingEntityContainer.current) {
        scrollingEntityContainer.current.removeEventListener(
          "scroll",
          handleScroll,
        );
      }
      window.removeEventListener("resize", positionDropdown);
    };
  }, [contactDropdownPortalContainerRef, scrollingEntityContainer]);

  return createPortal(
    <motion.div
      ref={dropdownRef}
      className="bg-white rounded-md shadow-md max-h-64 max-w-64 w-64 h-max absolute z-50 flex flex-col overflow-hidden"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      variants={dropdownVar}
      initial="init"
      animate="animate"
      exit="init"
      transition={dropdownTransition}
    >
      <div
        className="h-1 bg-white mx-7 mb-1 z-10 w-full"
        style={{
          boxShadow: "0 3px 6px 8px rgba(255, 255, 255, 1)",
        }}
      ></div>
      <div
        className="pl-7 overflow-y-auto grow smallScrollbar flex flex-col space-y-3 py-3"
        style={{ scrollbarGutter: "stable" }}
      >
        <CreateContactButton entity_username={entity_username} />
      </div>
      <div
        className="h-1 bg-white mx-7 mt-1 w-full"
        style={{
          boxShadow: "0 -3px 6px 8px rgba(255, 255, 255, 1)",
        }}
      ></div>
    </motion.div>,
    document.body,
  );
}
