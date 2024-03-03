import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { AffiliateWithButtonProps } from "@FgTypes/middleTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function AffiliateButton({
  entity_id,
}: AffiliateWithButtonProps) {
  const [isAffiliated, setIsAffiliated] = useState(false);

  useEffect(() => {
    const fetchIsAffiliated = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/search_affiliate_relation`,
          {
            params: {
              entity_id: entity_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsAffiliated(response.data);
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchIsAffiliated();
  }, [entity_id]);

  return (
    <>
      {entity_id !== "user" && isAffiliated && (
        <button className="w-1/4 h-9 rounded-md text-white bg-fg-black-25">
          Unaffiliate
        </button>
      )}
      {entity_id !== "user" && !isAffiliated && (
        <button className="w-1/4 h-9 rounded-md text-white bg-fg-primary">
          Affiliate
        </button>
      )}
    </>
  );
}
