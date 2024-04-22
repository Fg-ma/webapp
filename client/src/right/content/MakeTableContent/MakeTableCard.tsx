import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, Transition, Variants, motion } from "framer-motion";
import { MakeTablePageState } from "@FgTypes/rightTypes";
import MakeTableEntitiesNav from "./MakeTableEntitiesNav";
import MakeTableEntitiesSpace from "./MakeTableEntitiesSpace";
import MakeTableEntitiesSearchbar from "./MakeTableEntitiesSearchbar";

const makeTableCardVar: Variants = {
  init: {
    opacity: 0,
  },
  animate: {
    opacity: 1.2,
  },
};

const makeTableCardTransition: Transition = {
  transition: {
    duration: 0.8,
    ease: "easeOut",
  },
};

export default function MakeTableCard() {
  const makeTablePageState = useSelector(
    (state: MakeTablePageState) => state.page.makeTable.pagePayload.pageState,
  );
  const [isMakeTableOpen, setIsMakeTableOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [newTableInvites, setNewTableInvites] = useState<
    { entity_type: number; entity_username: string }[]
  >([]);

  const handleClick = () => {
    setIsMakeTableOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-max">
      {!isMakeTableOpen && (
        <div
          className="bg-fg-white-90 h-20 flex items-center rounded-md cursor-pointer"
          onClick={handleClick}
        >
          <svg
            className="ml-4"
            xmlns="http://www.w3.org/2000/svg"
            height="52"
            viewBox="0 -960 960 960"
            width="52"
          >
            <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
          </svg>
          <p className="font-Josefin text-2xl ml-4 pt-1.5">Make a table</p>
        </div>
      )}
      {isMakeTableOpen && (
        <AnimatePresence>
          <motion.div
            className="bg-fg-white-90 h-max flex flex-col items-center rounded-md space-y-4 pb-4"
            variants={makeTableCardVar}
            initial="init"
            animate="animate"
            transition={makeTableCardTransition}
          >
            <div className="flex items-center justify-between h-9 bg-fg-primary rounded-t-lg drop-shadow-md w-full">
              <input
                type="button"
                className="text-xl cursor-pointer text-white ml-3"
                value="Make Table"
                onClick={handleClick}
              />
              <input
                type="button"
                className="w-8 aspect-square bg-cover bg-no-repeat mx-1 cursor-pointer"
                style={{
                  backgroundImage: `url("assets/icons/whiteClose.svg")`,
                }}
                onClick={handleClick}
              />
            </div>
            <div className="w-full mt-2 px-4">
              <label
                htmlFor="tableName"
                className="text-2xl cursor-pointer font-Josefin"
              >
                Table name
              </label>
              <div className="h-fit flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Enter a table name"
                  name="tableName"
                  id="tableName"
                  className="grow bg-white h-10 rounded-md text-lg px-1 font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary border border-fg-white-85"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                ></input>
                <motion.button
                  type="button"
                  name="author"
                  className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                  style={{
                    backgroundImage: "url('assets/icons/trashCan.svg')",
                  }}
                  value=""
                  whileTap={{ scale: 1.075 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={() => setTableName("")}
                ></motion.button>
              </div>
            </div>
            <div className="w-full px-4 flex flex-col items-center relative">
              <MakeTableEntitiesNav makeTablePageState={makeTablePageState} />
              <div className="h-0.5 w-full bg-fg-black-25 rounded-full mt-1.5 relative">
                <div
                  className="h-0.5 w-full absolute top-0.5 left-0 z-50"
                  style={{
                    background: `linear-gradient(to bottom, rgba(64, 64, 64, 1) 0%, rgba(64, 64, 64, 0) 100%)`,
                    filter: "blur(2px)",
                  }}
                ></div>
              </div>
              <MakeTableEntitiesSpace
                category={makeTablePageState}
                newTableInvites={newTableInvites}
                setNewTableInvites={setNewTableInvites}
              />
              <div
                className="h-3 absolute bottom-0 left-1/2 -translate-x-1/2 right-0 z-40"
                style={{
                  background: `linear-gradient(to top, rgba(230, 230, 230, 1) 0%, rgba(230, 230, 230, 0.35) 50%, rgba(230, 230, 230, 0) 100%)`,
                  filter: "blur(4px)",
                  width: "90%",
                }}
              ></div>
            </div>
            <MakeTableEntitiesSearchbar />
            <div className="w-full flex items-start pl-4">
              <button
                type="submit"
                className="rounded-full bg-fg-primary px-5 py-1 font-K2D text-lg text-white"
              >
                Make Table
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
