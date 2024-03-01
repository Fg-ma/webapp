import React, { useState, useEffect, useRef } from "react";
import { Transition, Variants, motion } from "framer-motion";
import { ReferenceLinksProps, Reference } from "@FgTypes/componentTypes";

const popupContentVar: Variants = {
  init: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const transition: Transition = {
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

export default function ReferenceLinks({ references }: ReferenceLinksProps) {
  /* 
    Description:   
      Creates a list of refernce links that can be clicked to get redirected to a 
      book or other reference.
    Unique Properties:
      When hovered over for 1.5 seconds it opens a popup that is stuck to the cursor that 
      displays the author, title, and url link.
  */

  const [referencesLinks, setReferencesLinks] = useState<JSX.Element[] | null>(
    null,
  );
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef<{ x: string; y: string } | null>(null);

  // Get links for references
  useEffect(() => {
    setReferencesLinks(
      references.map((reference, index) => (
        <div key={reference.reference_id} className="flex">
          <a
            href={reference.url}
            className="text-fg-secondary underline decoration-2 underline-offset-2"
            onMouseEnter={(event) => startHoverTimer(event, reference)}
            onMouseLeave={() => cancelHoverTimer()}
            onMouseMove={(event) => {
              updateMousePosition(event);
              updatePopupPosition();
            }}
          >
            "{reference.title}"
          </a>
          {index < references.length - 1 && <p>,&nbsp;&nbsp;</p>}
        </div>
      )),
    );
  }, [references]);

  const showPopup = (reference: Reference) => {
    setPopupContent(
      <div className="p-4 absolute bg-white drop-shadow-md rounded w-max z-50">
        <p className="text-lg font-bold">Title: {reference.title}</p>
        <p className="text-base font-K2D">Author: {reference.author}</p>
        <p className="text-base font-K2D">URL: {reference.url}</p>
      </div>,
    );
  };

  const startHoverTimer = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    reference: Reference,
  ) => {
    mousePosition.current = {
      x: `${event.clientX - 535}px`,
      y: `${event.clientY - 50}px`,
    };
    hoverTimeout.current = setTimeout(() => {
      showPopup(reference);
      updatePopupPosition();
    }, 1500);
  };

  const cancelHoverTimer = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setPopupContent(null);
  };

  const updateMousePosition = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    mousePosition.current = {
      x: `${event.clientX - 535}px`,
      y: `${event.clientY - 50}px`,
    };
  };

  const updatePopupPosition = () => {
    setPopupContent((prevPopupContent) => {
      if (prevPopupContent) {
        return (
          <div
            className="p-4 absolute bg-white drop-shadow-md rounded w-max z-50"
            style={{
              top: mousePosition.current?.y,
              left: mousePosition.current?.x,
            }}
          >
            {prevPopupContent.props.children}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      {referencesLinks && (
        <div>
          <div className="text-base font-K2D mt-4 italic flex flex-wrap line-clamp-2">
            {referencesLinks}
          </div>
          {popupContent && (
            <motion.div
              variants={popupContentVar}
              initial="init"
              animate="animate"
              transition={transition}
            >
              {popupContent}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
