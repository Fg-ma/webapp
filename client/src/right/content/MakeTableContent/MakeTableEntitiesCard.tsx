import React from "react";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import { MakeTableEntitiesCardProps } from "@FgTypes/rightTypes";

export default function MakeTableEntitiesCard({
  invited,
  category,
  entity_username,
  entity_name,
  setNewTableInvites,
}: MakeTableEntitiesCardProps) {
  return (
    <div className="flex items-center justify-start w-full">
      {!invited && (
        <div className="min-w-max">
          <button
            className="bg-fg-primary w-14 h-8 text-white rounded-md text-md font-K2D mr-4 ml-1"
            onClick={() => {
              setNewTableInvites((prev) => [
                ...prev,
                {
                  entity_type:
                    category === "individual"
                      ? 1
                      : category === "group"
                        ? 2
                        : 3,
                  entity_username: entity_username,
                },
              ]);
            }}
          >
            Add
          </button>
        </div>
      )}
      {invited && (
        <div className="min-w-max">
          <button
            className="bg-fg-black-25 w-14 h-8 text-white rounded-md text-md font-K2D mr-4 ml-1"
            onClick={() => {
              setNewTableInvites((prev) =>
                prev.filter(
                  (invite) => invite.entity_username !== entity_username,
                ),
              );
            }}
          >
            Omit
          </button>
        </div>
      )}
      <ProfilePicture
        size={{ w: 3, h: 3 }}
        entity_username={entity_username}
        entity_type={
          category === "individual" ? 1 : category === "group" ? 2 : 3
        }
        styles={
          category === "individual"
            ? "rounded-full"
            : category === "group"
              ? "rounded-md"
              : "rounded-sm"
        }
        clickable={false}
      />
      <p className="text-xl font-Josefin pt-1 select-none truncate grow pl-4">
        {entity_name ? entity_name : entity_username}
      </p>
    </div>
  );
}
