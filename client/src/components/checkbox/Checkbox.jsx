import React from "react";

export default function Checkbox({ checked, hovering }) {
  return (
    <div
      className={`w-5 h-5 bg-white border-2 rounded flex justify-center items-center ${
        checked || hovering ? "border-fg-secondary" : "border-gray-400"
      }`}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#2C92F5"
          className="w-9 h-9 absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "0.5625rem", left: "0.9375rem" }}
        >
          <path d="m382-373.218 328.826-328.826q15.956-15.957 37.826-15.957t37.827 15.957q15.956 15.957 15.956 37.827 0 21.869-15.956 37.826l-366.87 366.87Q403.652-243.565 382-243.565t-37.609-15.956l-170.87-170.87q-15.956-15.957-15.739-37.826.217-21.87 16.174-37.827 15.957-15.957 37.827-15.957 21.869 0 37.826 15.957L382-373.218Z" />
        </svg>
      )}
    </div>
  );
}
