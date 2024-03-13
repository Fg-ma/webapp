import React, { useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { MessagesTextFieldProps } from "@FgTypes/middleTypes";
import { useLastMessageContext } from "@context/LastMessageContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MessagesTextField({
  inputValue,
  conversation_id,
  setInputValue,
  messageSocket,
  messagesPageRef,
  textFieldSnap,
}: MessagesTextFieldProps) {
  const placeholder = "Search...";
  const { setLastMessage } = useLastMessageContext();
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleInputChange = () => {
    let text = contentEditableRef.current?.innerText || "";

    setInputValue(text);
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
  }, []);

  // Reset on conversation change
  useEffect(() => {
    if (!contentEditableRef.current) return;

    setInputValue("");
    contentEditableRef.current.innerText = placeholder;
  }, [conversation_id]);

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

    if (!inputValue || !contentEditableRef.current || !conversation_id) return;

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    messageSocket.emit("sendMessage", token, conversation_id, inputValue);

    await Axios.put(
      `${serverUrl}/conversations/new_conversation_message`,
      {
        conversation_id: conversation_id,
        message: inputValue,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setLastMessage({
      conversation_id: conversation_id,
      last_message: inputValue,
    });

    if (messagesPageRef.current) {
      messagesPageRef.current.scrollTop = messagesPageRef.current.scrollHeight;
    }

    setInputValue("");
    contentEditableRef.current.innerText = placeholder;
  };

  return (
    <div
      className={`flex items-center justify-center h-max my-8 shadow ${
        !textFieldSnap && "absolute bottom-0 left-1/2 -translate-x-1/2 z-50"
      }`}
      style={{ width: textFieldSnap ? "87.5%" : "calc(87.5% - 4.5rem)" }}
    >
      <form
        className="w-full h-max rounded-md flex items-end bg-white border border-fg-white-85"
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
