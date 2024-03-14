import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import {
  ContactDropdownProps,
  ContactDropdownPortalProps,
} from "@FgTypes/middleTypes";

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
  scrollingEntityContainer,
}: ContactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contactDropdownPortalContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="w-1/4 relative">
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
              contactDropdownPortalContainerRef={
                contactDropdownPortalContainerRef
              }
              scrollingEntityContainer={scrollingEntityContainer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ContactDropdownPortal({
  contactDropdownPortalContainerRef,
  scrollingEntityContainer,
}: ContactDropdownPortalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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
      className="py-4 pl-7 bg-white rounded-md shadow-md overflow-y-auto max-h-64 max-w-64 w-64 h-max smallScrollbar absolute z-50 flex flex-col space-y-3"
      style={{
        scrollbarGutter: "stable",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      variants={dropdownVar}
      initial="init"
      animate="animate"
      exit="init"
      transition={dropdownTransition}
    >
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
      <button className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full">
        Create Contact
      </button>
    </motion.div>,
    document.body,
  );
}
