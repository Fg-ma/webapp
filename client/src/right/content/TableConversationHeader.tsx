import { TableMeta } from "@FgTypes/rightTypes";
import React from "react";
import { useSelector } from "react-redux";

export default function TableConversationHeader() {
  const tableMeta = useSelector(
    (state: TableMeta) => state.page.main.pagePayload.table,
  );

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
        <div className="font-K2D text-fg-black-25 text-xl">
          {tableMeta.table_name}
        </div>
      )}
      {tableMeta.members && (
        <div className="font-K2D text-fg-black-30 text-base text-center">
          {tableMeta.members.length >= 1
            ? tableMeta.members.join(", ")
            : tableMeta.members.join(" and ")}
        </div>
      )}
      {tableMeta.table_creation_date && (
        <div className="font-K2D text-fg-black-40 text-xs text-center">
          {formatDate(tableMeta.table_creation_date)}
        </div>
      )}
    </div>
  );
}
