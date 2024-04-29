import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TableMeta } from "@FgTypes/rightTypes";

export default function TableConversationHeader() {
  const tableMeta = useSelector(
    (state: TableMeta) => state.page.main.pagePayload.table,
  );
  const [hovered, setHovered] = useState(false);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone,
    };

    const formattedDateTime = date.toLocaleString("en-US", options);

    return formattedDateTime;
  }

  return (
    <div className="mb-5 flex flex-col items-center justify-center w-full">
      {tableMeta.table_name && (
        <div className="font-K2D text-fg-black-25 text-2xl">
          {tableMeta.table_name}
        </div>
      )}
      {tableMeta.members && (
        <div
          className={`font-K2D text-fg-black-30 text-base text-center ${
            hovered ? "" : "line-clamp-2"
          }`}
          onMouseEnter={() => setTimeout(() => setHovered(true), 2000)}
          onMouseLeave={() => setHovered(false)}
        >
          {tableMeta.members.length >= 1
            ? tableMeta.members.join(", ")
            : tableMeta.members.join(" and ")}
        </div>
      )}
      {tableMeta.table_creation_date && (
        <div className="font-K2D text-fg-black-40 text-sm text-center">
          {formatDate(tableMeta.table_creation_date)}
        </div>
      )}
    </div>
  );
}
