import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { AffiliateWithButtonProps } from "@FgTypes/middleTypes";
import { useAffiliateContext } from "@context/AffiliateContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function AffiliateButton({
  entity_username,
}: AffiliateWithButtonProps) {
  const { setAffiliateRelation } = useAffiliateContext();
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
              entity_username: entity_username,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsAffiliated(response.data);
      } catch (error) {
        console.error("Error fetching affiliate relation:", error);
      }
    };

    fetchIsAffiliated();
  }, [entity_username]);

  const handleAffiliate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await Axios.post(
        `${serverUrl}/affiliateRelations/set_affiliate_relation`,
        null,
        {
          params: {
            entity_username: entity_username,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setIsAffiliated(response.data.isAffiliated);
        setAffiliateRelation(response.data.newAffiliateRelation);
      }
    } catch (error) {
      console.error("Error setting affiliate relation:", error);
    }
  };

  const handleUnaffiliate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await Axios.delete(
        `${serverUrl}/affiliateRelations/delete_affiliate_relation`,
        {
          params: {
            entity_username: entity_username,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setIsAffiliated(response.data.isAffiliated);
        setAffiliateRelation(response.data.deletedAffiliateRelation);
      }
    } catch (error) {
      console.error("Error deleting affiliate relation:", error);
    }
  };

  return (
    <>
      {entity_username !== "user" && isAffiliated && (
        <button
          className="w-1/4 h-9 rounded-md text-white bg-fg-black-25"
          onClick={handleUnaffiliate}
        >
          Unaffiliate
        </button>
      )}
      {entity_username !== "user" && !isAffiliated && (
        <button
          className="w-1/4 h-9 rounded-md text-white bg-fg-primary"
          onClick={handleAffiliate}
        >
          Affiliate
        </button>
      )}
    </>
  );
}
