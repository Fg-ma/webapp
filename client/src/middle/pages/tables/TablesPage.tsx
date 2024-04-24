import React, { useEffect, useState } from "react";
import TablesUtilityBar from "./TablesUtilityBar";
import { useSelector } from "react-redux";
import { Table, TablesPageState } from "@FgTypes/middleTypes";
import Axios from "axios";
import config from "@config";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesPage() {
  const table_id = useSelector(
    (state: TablesPageState) => state.page.main.pagePayload.ids.table_id,
  );
  const [table, setTable] = useState<Table>();

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
        top: Math.floor(totalMembers / 4) + 1,
        bottom: Math.floor(totalMembers / 4),
        left: Math.floor(totalMembers / 4) + 1,
        right: Math.floor(totalMembers / 4) + 1,
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
              entity_current_Issue: undefined,
            }
          : member.group_data
            ? {
                entity_name: member.group_data.group_name,
                entity_username: member.group_data.group_handle,
                entity_current_Issue: undefined,
              }
            : member.organization_data
              ? {
                  entity_name: member.organization_data.organization_name,
                  entity_username: member.organization_data.organization_handle,
                  entity_current_Issue: undefined,
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

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="overflow-hidden w-full flex flex-col items-center justify-center space-y-4 pr-12"
        style={{ height: "85%" }}
      >
        <div className="flex flex-row w-full px-36 justify-between">
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
        </div>
        <div className="w-full flex flex-row items-center justify-center grow space-x-4">
          <div className="flex flex-col h-full py-12 justify-between">
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          </div>
          <div className="bg-fg-white-95 w-full h-full rounded-3xl"></div>
          <div className="flex flex-col h-full py-12 justify-between">
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-row w-full px-36 justify-between">
          {bottomMembersElements}
        </div>
      </div>
      <TablesUtilityBar />
    </div>
  );
}
