import React, { useEffect, useRef, useState } from "react";
import TablesUtilityBar from "./TablesUtilityBar";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Table, TablesPageState } from "@FgTypes/middleTypes";
import Axios from "axios";
import config from "@config";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import TablesLiveVideoChatOverlay from "./TablesLiveVideoChatOverlay";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesPage() {
  const tableSocket = io(serverUrl, {
    path: "/table-socket",
  });
  const table_id = useSelector(
    (state: TablesPageState) => state.page.main.pagePayload.ids.table_id,
  );
  const [table, setTable] = useState<Table>();
  const token = localStorage.getItem("token");

  const joinTable = (table_id: string) => {
    if (!token) {
      return;
    }

    tableSocket.emit("joinTable", token, table_id);
  };

  const leaveTable = (table_id: string) => {
    if (!token) {
      return;
    }

    tableSocket.emit("leaveTable", token, table_id);
  };

  // Establish socket connection
  useEffect(() => {
    tableSocket.on("connection", () => {
      return;
    });

    return () => {
      tableSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (table_id) {
      joinTable(table_id);
    }

    return () => {
      if (table_id) {
        leaveTable(table_id);
      }
    };
  }, [table_id]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/tables/get_table_by_table_id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { table_id: table_id },
          },
        );

        setTable(response.data);
      } catch (error) {
        console.error("Error fetching tables data:", error);
      }
    };

    fetchTable();
  }, [table_id]);

  const totalMembers = table?.members.length;
  let seatingPosition = { top: 0, bottom: 0, left: 0, right: 0 };
  if (totalMembers) {
    const remainderMembers = totalMembers % 4;
    if (remainderMembers === 1) {
      seatingPosition = {
        top: Math.floor(totalMembers / 4) + 1,
        bottom: Math.floor(totalMembers / 4),
        left: Math.floor(totalMembers / 4),
        right: Math.floor(totalMembers / 4),
      };
    } else if (remainderMembers === 2) {
      seatingPosition = {
        top: Math.floor(totalMembers / 4) + 1,
        bottom: Math.floor(totalMembers / 4) + 1,
        left: Math.floor(totalMembers / 4),
        right: Math.floor(totalMembers / 4),
      };
    } else if (remainderMembers === 3) {
      seatingPosition = {
        top: Math.floor(totalMembers / 4) + 2,
        bottom: Math.floor(totalMembers / 4) + 1,
        left: Math.floor(totalMembers / 4),
        right: Math.floor(totalMembers / 4),
      };
    } else {
      seatingPosition = {
        top: Math.floor(totalMembers / 4) + 1,
        bottom: Math.floor(totalMembers / 4) + 1,
        left: Math.floor(totalMembers / 4) - 1,
        right: Math.floor(totalMembers / 4) - 1,
      };
    }
  }

  const sortedMembers = table?.members.sort(
    (a, b) => a.table_position - b.table_position,
  );

  const bottomMembers = sortedMembers?.slice(0, seatingPosition?.bottom);
  const rightMembers = sortedMembers?.slice(
    seatingPosition?.bottom,
    seatingPosition?.bottom + seatingPosition?.right,
  );
  const topMembers = sortedMembers?.slice(
    seatingPosition?.bottom + seatingPosition?.right,
    seatingPosition?.bottom + seatingPosition?.right + seatingPosition?.top,
  );
  const leftMembers = sortedMembers?.slice(
    seatingPosition?.bottom + seatingPosition?.right + seatingPosition?.top,
    seatingPosition?.bottom +
      seatingPosition?.right +
      seatingPosition?.top +
      seatingPosition?.right,
  );

  const bottomMembersElements = bottomMembers?.map((member) => (
    <ProfilePicture
      key={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      size={{ w: 5, h: 5 }}
      entity_username={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      entity_type={
        member.individual_data
          ? 1
          : member.group_data
            ? 2
            : member.organization_data
              ? 3
              : 0
      }
      styles={
        member.individual_data
          ? "rounded-full"
          : member.group_data
            ? "rounded-md"
            : member.organization_data
              ? "rounded-sm"
              : ""
      }
      entity={
        member.individual_data
          ? {
              entity_name: member.individual_data.individual_name,
              entity_username: member.individual_data.individual_username,
              entity_current_Issue:
                member.individual_data.individual_current_issue,
            }
          : member.group_data
            ? {
                entity_name: member.group_data.group_name,
                entity_username: member.group_data.group_handle,
                entity_current_Issue: member.group_data.group_current_issue,
              }
            : member.organization_data
              ? {
                  entity_name: member.organization_data.organization_name,
                  entity_username: member.organization_data.organization_handle,
                  entity_current_Issue:
                    member.organization_data.organization_current_issue,
                }
              : {
                  entity_name: undefined,
                  entity_username: undefined,
                  entity_current_Issue: undefined,
                }
      }
      clickable={true}
    />
  ));

  const topMembersElements = topMembers?.map((member) => (
    <ProfilePicture
      key={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      size={{ w: 5, h: 5 }}
      entity_username={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      entity_type={
        member.individual_data
          ? 1
          : member.group_data
            ? 2
            : member.organization_data
              ? 3
              : 0
      }
      styles={
        member.individual_data
          ? "rounded-full"
          : member.group_data
            ? "rounded-md"
            : member.organization_data
              ? "rounded-sm"
              : ""
      }
      entity={
        member.individual_data
          ? {
              entity_name: member.individual_data.individual_name,
              entity_username: member.individual_data.individual_username,
              entity_current_Issue:
                member.individual_data.individual_current_issue,
            }
          : member.group_data
            ? {
                entity_name: member.group_data.group_name,
                entity_username: member.group_data.group_handle,
                entity_current_Issue: member.group_data.group_current_issue,
              }
            : member.organization_data
              ? {
                  entity_name: member.organization_data.organization_name,
                  entity_username: member.organization_data.organization_handle,
                  entity_current_Issue:
                    member.organization_data.organization_current_issue,
                }
              : {
                  entity_name: undefined,
                  entity_username: undefined,
                  entity_current_Issue: undefined,
                }
      }
      clickable={true}
    />
  ));

  const leftMembersElements = leftMembers?.map((member) => (
    <ProfilePicture
      key={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      size={{ w: 5, h: 5 }}
      entity_username={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      entity_type={
        member.individual_data
          ? 1
          : member.group_data
            ? 2
            : member.organization_data
              ? 3
              : 0
      }
      styles={
        member.individual_data
          ? "rounded-full"
          : member.group_data
            ? "rounded-md"
            : member.organization_data
              ? "rounded-sm"
              : ""
      }
      entity={
        member.individual_data
          ? {
              entity_name: member.individual_data.individual_name,
              entity_username: member.individual_data.individual_username,
              entity_current_Issue:
                member.individual_data.individual_current_issue,
            }
          : member.group_data
            ? {
                entity_name: member.group_data.group_name,
                entity_username: member.group_data.group_handle,
                entity_current_Issue: member.group_data.group_current_issue,
              }
            : member.organization_data
              ? {
                  entity_name: member.organization_data.organization_name,
                  entity_username: member.organization_data.organization_handle,
                  entity_current_Issue:
                    member.organization_data.organization_current_issue,
                }
              : {
                  entity_name: undefined,
                  entity_username: undefined,
                  entity_current_Issue: undefined,
                }
      }
      clickable={true}
    />
  ));

  const rightMembersElements = rightMembers?.map((member) => (
    <ProfilePicture
      key={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      size={{ w: 5, h: 5 }}
      entity_username={String(
        member.individual_data
          ? member.individual_data.individual_username
          : member.group_data
            ? member.group_data.group_handle
            : member.organization_data
              ? member.organization_data.organization_handle
              : null,
      )}
      entity_type={
        member.individual_data
          ? 1
          : member.group_data
            ? 2
            : member.organization_data
              ? 3
              : 0
      }
      styles={
        member.individual_data
          ? "rounded-full"
          : member.group_data
            ? "rounded-md"
            : member.organization_data
              ? "rounded-sm"
              : ""
      }
      entity={
        member.individual_data
          ? {
              entity_name: member.individual_data.individual_name,
              entity_username: member.individual_data.individual_username,
              entity_current_Issue:
                member.individual_data.individual_current_issue,
            }
          : member.group_data
            ? {
                entity_name: member.group_data.group_name,
                entity_username: member.group_data.group_handle,
                entity_current_Issue: member.group_data.group_current_issue,
              }
            : member.organization_data
              ? {
                  entity_name: member.organization_data.organization_name,
                  entity_username: member.organization_data.organization_handle,
                  entity_current_Issue:
                    member.organization_data.organization_current_issue,
                }
              : {
                  entity_name: undefined,
                  entity_username: undefined,
                  entity_current_Issue: undefined,
                }
      }
      clickable={true}
    />
  ));

  const sizeLocationRotation1 = { w: 30, h: 40, x: 10, y: 10, r: 45 };
  const sizeLocationRotation2 = { w: 30, h: 40, x: 100, y: 100, r: 125 };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="overflow-hidden w-full flex flex-col items-center justify-center space-y-4 pr-12"
        style={{ height: "85%" }}
      >
        <div
          className={`flex flex-row w-full px-24 ${
            topMembersElements && topMembersElements.length > 1
              ? "justify-between"
              : "justify-center"
          }`}
        >
          <div></div>
          {topMembersElements}
          <div></div>
        </div>
        <div className="w-full flex flex-row items-center justify-center grow space-x-4">
          <div
            className={`flex flex-col h-full ${
              leftMembersElements && leftMembersElements.length > 1
                ? "justify-between"
                : "justify-center"
            }`}
          >
            <div></div>
            {leftMembersElements}
            <div></div>
          </div>
          <div className="bg-fg-white-95 w-full h-full rounded-3xl overflow-hidden relative">
            {table_id && (
              <TablesLiveVideoChatOverlay
                table_id={table_id}
                tableSocket={tableSocket}
              />
            )}
          </div>
          <div
            className={`flex flex-col h-full ${
              rightMembersElements && rightMembersElements.length > 1
                ? "justify-between"
                : "justify-center"
            }`}
          >
            <div></div>
            {rightMembersElements}
            <div></div>
          </div>
        </div>
        <div
          className={`flex flex-row w-full px-24 ${
            bottomMembersElements && bottomMembersElements.length > 1
              ? "justify-between"
              : "justify-center"
          }`}
        >
          <div></div>
          {bottomMembersElements}
          <div></div>
        </div>
      </div>
      {table_id && (
        <TablesUtilityBar
          table_id={table_id}
          tables_pictures_id={table?.tables_pictures_id}
        />
      )}
    </div>
  );
}
