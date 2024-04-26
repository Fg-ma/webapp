import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import config from "@config";
import { TablesTextFieldProps } from "@FgTypes/middleTypes";
import { useLastMessageContext } from "@context/LastMessageContext";
import { useSocketContext } from "@context/LiveUpdatesContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesTextField({
  table_id,
  tableSocket,
}: TablesTextFieldProps) {
  const placeholder = "Send message...";
  const { liveUpdatesSocket } = useSocketContext();
  const { setLastMessage } = useLastMessageContext();
  const [inputValue, setInputValue] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  const handleInputChange = () => {
    let text = contentEditableRef.current?.innerText || "";

    setInputValue(text);

    if (!token) {
      return;
    }

    if (text) {
      tableSocket.emit("typing", token, table_id, true);
    } else if (!text) {
      tableSocket.emit("typing", token, table_id, false);
    }
  };

  useEffect(() => {
    if (!contentEditableRef.current) return;

    contentEditableRef.current.addEventListener("input", handleInputChange);
    return () => {
      contentEditableRef.current?.removeEventListener(
        "input",
        handleInputChange,
      );
    };
  }, [table_id]);

  // Reset on table change
  useEffect(() => {
    if (!contentEditableRef.current) return;

    setInputValue("");
    contentEditableRef.current.innerText = placeholder;
    return () => {
      tableSocket.emit("typing", token, table_id, false);
    };
  }, [table_id]);

  // Set placeholder if div is empty
  useEffect(() => {
    if (!contentEditableRef.current) return;

    if (contentEditableRef.current.innerText === "") {
      contentEditableRef.current.innerText = placeholder;
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue || !contentEditableRef.current || !table_id) return;

    if (!token) {
      return;
    }

    tableSocket.emit("typing", token, table_id, false);
    tableSocket.emit("sendMessage", token, table_id, inputValue);

    liveUpdatesSocket?.emit(
      "outgoingMessage",
      token,
      inputValue,
      (table_id = table_id),
    );

    await Axios.put(
      `${serverUrl}/tables/new_table_message`,
      {
        table_id: table_id,
        message: inputValue,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setLastMessage((prev) => ({
      ...prev,
      table: {
        table_id: table_id,
        last_message: inputValue,
      },
    }));

    //if (tablesPageRef.current) {
    //  tablesPageRef.current.scrollTop = tablesPageRef.current.scrollHeight;
    //}

    setInputValue("");
    contentEditableRef.current.innerText = placeholder;
  };

  return (
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
        onSubmit={handleSubmit}
      >
        <div
          ref={contentEditableRef}
          role="textbox"
          contentEditable
          className="rounded-2xl px-3 pt-2 pb-1 outline-none text-xl"
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
  );
}
