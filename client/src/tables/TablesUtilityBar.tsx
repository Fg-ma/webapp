import React, { useRef } from "react";

export default function TablesUtilityBar() {
  const placeholder = "Send message...";
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Handle focus to hide placeholder
  const handleFocus = () => {
    if (
      contentEditableRef.current &&
      contentEditableRef.current.innerText === placeholder
    ) {
      contentEditableRef.current.innerText = "";
    }
  };

  // Handle blur to show placeholder
  const handleBlur = () => {
    if (
      contentEditableRef.current &&
      contentEditableRef.current.innerText === ""
    ) {
      contentEditableRef.current.innerText = placeholder;
    }
  };

  return (
    <div className="w-full grow flex flex-row space-x-8 pl-24 pr-36 items-center justify-center">
      <div className="bg-fg-white-95 h-12 w-12 rounded-xl"></div>
      <div
        className="bg-fg-white-95 h-16 grow rounded-xl px-12 relative"
        style={{
          boxShadow:
            "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
        }}
      >
        <form
          className="h-max rounded-md flex items-end bg-white border border-fg-white-85 absolute bottom-2 left-1/2 -translate-x-1/2"
          style={{ width: "90%" }}
        >
          <div
            ref={contentEditableRef}
            role="textbox"
            contentEditable
            className="rounded-2xl px-4 pt-2 pb-1 outline-none text-xl max-h-80 overflow-auto"
            style={{ width: "calc(100% - 2.5rem)" }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></div>
          <input
            key="sumbitMessage"
            type="submit"
            value=""
            className="w-8 h-8 bg-cover bg-no-repeat mr-2 mb-1 cursor-pointer fill-black"
            style={{
              backgroundImage: 'url("assets/icons/submit.svg")',
            }}
          />
        </form>
      </div>
    </div>
  );
}
