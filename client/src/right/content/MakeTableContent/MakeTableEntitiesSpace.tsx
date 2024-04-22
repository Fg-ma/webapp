import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import config from "@config";
import { Individual, Group, Organization } from "@FgTypes/contextTypes";
import MakeTableEntitiesCard from "./MakeTableEntitiesCard";
import { MakeTableEntitiesSpaceProps } from "@FgTypes/rightTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MakeTableEntitiesSpace({
  category,
  newTableInvites,
  setNewTableInvites,
}: MakeTableEntitiesSpaceProps) {
  const [data, setData] = useState<(Individual | Group | Organization)[]>([]);

  const sortData = (data: (Individual | Group | Organization)[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a, b) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };
  const makeTableEntitiesSpaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (makeTableEntitiesSpaceRef.current) {
      makeTableEntitiesSpaceRef.current.scrollTop = 0;
    }

    const fetchFilterCardData = async () => {
      if (category == "individual") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_individuals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(sortData(response.data));
      } else if (category == "group") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(sortData(response.data));
      } else if (category == "organization") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_organizations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(sortData(response.data));
      }
    };

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    fetchFilterCardData();
  }, [category]);

  const MakeTableEntitiesCards = data.map((filterInfo) => {
    const entity_username =
      category === "individual"
        ? (filterInfo[
            `${category}_username` as keyof (Individual | Group | Organization)
          ] as string)
        : (filterInfo[
            `${category}_handle` as keyof (Individual | Group | Organization)
          ] as string);

    const invited = newTableInvites.some(
      (invite) => invite.entity_username === entity_username,
    );

    return (
      <MakeTableEntitiesCard
        key={entity_username}
        invited={invited}
        category={category}
        entity_username={entity_username}
        entity_name={
          filterInfo[
            `${category}_name` as keyof (Individual | Group | Organization)
          ] as string
        }
        setNewTableInvites={setNewTableInvites}
      />
    );
  });

  return (
    <div
      ref={makeTableEntitiesSpaceRef}
      className="flex flex-col items-center w-full space-y-4 max-h-64 overflow-y-auto py-4"
      style={{ scrollbarGutter: "stable" }}
    >
      {MakeTableEntitiesCards}
    </div>
  );
}
