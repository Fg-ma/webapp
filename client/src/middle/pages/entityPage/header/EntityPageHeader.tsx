import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { EntityPageHeaderProps, Afiliate } from "@FgTypes/middleTypes";
import ReferenceLinks from "@components/referenceLinks/ReferenceLinks";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import AffiliatedEntitiesScroll from "./AffiliatedEntitiesScroll";
import AffiliateButton from "./AffiliateButton";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function EntityPageHeader({
  entity_id,
  entityType,
  entity,
  entityReferences,
}: EntityPageHeaderProps) {
  /* 
    Description:   
      Creates an entity's page header from information retrieved(or not retrieved)
      from the inputted entity data.
    Unique Properties:
      N/A
  */

  const [affiliates, setAffiliates] = useState<{
    individuals: Afiliate[];
    groups: Afiliate[];
    organizations: Afiliate[];
  }>({
    individuals: [],
    groups: [],
    organizations: [],
  });
  const [affiliatesProfilePictures, setAffiliatesProfilePictures] = useState<
    React.JSX.Element[] | null
  >(null);
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const affiliateProfilePictureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (affiliateProfilePictureRef.current) {
      affiliateProfilePictureRef.current.scrollLeft = 0;
    }

    const fetchIndividualData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_entities`,
          {
            params: {
              entity_id: entity_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setAffiliates(response.data);
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    fetchIndividualData();
  }, [entity_id]);

  useEffect(() => {
    const unsortedArray = [];

    for (const individual of affiliates.individuals) {
      unsortedArray.push({
        ...individual,
        type: "individual",
      });
    }

    for (const group of affiliates.groups) {
      unsortedArray.push({
        ...group,
        type: "group",
      });
    }

    for (const organization of affiliates.organizations) {
      unsortedArray.push({
        ...organization,
        type: "organization",
      });
    }

    const sortedAffiliatesArray = unsortedArray.slice().sort((a, b) => {
      const dateA = new Date(a.date[0].affiliate_relation_date).getTime();
      const dateB = new Date(b.date[0].affiliate_relation_date).getTime();
      return dateA - dateB;
    });

    setAffiliatesProfilePictures(
      sortedAffiliatesArray.map((affiliate: Afiliate) => (
        <ProfilePicture
          key={String(affiliate[`${affiliate.type}_id` as keyof Afiliate])}
          size={{ w: 2, h: 2 }}
          entity_id={String(
            affiliate[`${affiliate.type}_id` as keyof Afiliate],
          )}
          entity_type={
            affiliate.type === "individual"
              ? 1
              : affiliate.type === "group"
                ? 2
                : 3
          }
          styles={
            affiliate.type === "individual"
              ? "rounded-full"
              : affiliate.type === "group"
                ? "rounded-md"
                : "rounded-sm"
          }
          entity={
            affiliate.type === "individual"
              ? {
                  entity_name: affiliate.individual_name,
                  entity_username: affiliate.individual_username,
                  entity_current_Issue: affiliate.individual_currentIssue,
                }
              : affiliate.type === "group"
                ? {
                    entity_name: affiliate.group_name,
                    entity_username: affiliate.group_handle,
                    entity_current_Issue: affiliate.group_currentIssue,
                  }
                : {
                    entity_name: affiliate.organization_name,
                    entity_username: affiliate.organization_handle,
                    entity_current_Issue: affiliate.organization_currentIssue,
                  }
          }
          clickable={true}
        />
      )),
    );
  }, [affiliates]);

  return (
    <>
      <div ref={topHeaderRef} className="flex items-center h-24">
        <div className="h-24 w-24">
          <ProfilePicture
            size={{ h: 6, w: 6 }}
            entity_id={entity_id}
            entity_type={
              entityType === "individuals" ? 1 : entityType === "groups" ? 2 : 3
            }
            styles={
              entityType === "individuals"
                ? "rounded-full"
                : entityType === "groups"
                  ? "rounded-xl"
                  : "rounded-md"
            }
            clickable={false}
          />
        </div>
        <div className="ml-8 h-fit">
          <p
            className={`text-4xl ${
              affiliatesProfilePictures?.length === 0 ? "mt-2" : "mb-1"
            }`}
          >
            {entity?.[`${entityType.slice(0, -1)}_name`]}
          </p>
          <AffiliatedEntitiesScroll
            affiliatesProfilePictures={affiliatesProfilePictures}
            affiliateProfilePictureRef={affiliateProfilePictureRef}
            topHeaderRef={topHeaderRef}
          />
        </div>
      </div>
      <div className="text-xl mt-4">
        {entity?.[`${entityType.slice(0, -1)}_userName`]}
        {entity?.[`${entityType.slice(0, -1)}_handle`] && (
          <div className="flex items-center justify-start">
            <p className="pb-1">@</p>
            <p>{entity[`${entityType.slice(0, -1)}_handle`]}</p>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold mt-2">
        {entity?.[`${entityType.slice(0, -1)}_currentIssue`]}
      </p>
      {entity?.[`${entityType.slice(0, -1)}_roles`] && (
        <p className="text-xl font-K2D line-clamp-2 mt-1">
          {entity[`${entityType.slice(0, -1)}_roles`]}
        </p>
      )}
      {entity?.[`${entityType.slice(0, -1)}_stances`] && (
        <p className="text-xl font-K2D line-clamp-2 mt-1">
          {entity[`${entityType.slice(0, -1)}_stances`]}
        </p>
      )}
      {entity?.[`${entityType.slice(0, -1)}_description`] && (
        <p className="text-base font-K2D mt-4">
          {entity[`${entityType.slice(0, -1)}_description`]}
        </p>
      )}
      {entityReferences && <ReferenceLinks references={entityReferences} />}
      <div className="space-x-6 font-K2D mt-6 flex items-center justify-left">
        <AffiliateButton entity_id={entity_id} />
        <button className="w-1/4 h-9 rounded-md bg-fg-white-95">Message</button>
        <button className="w-1/4 h-9 rounded-md bg-fg-white-95">Email</button>
        <button className="w-1/4 h-9 rounded-md bg-fg-white-95 flex items-center justify-center">
          <span className="ml-5 grow">Contact</span>
          <svg
            className="w-6 aspect-square mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}
