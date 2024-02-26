import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import ReferenceLinks from "@components/referenceLinks/ReferenceLinks";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface EntityPageHeaderProps {
  entity_id: string;
  entityType: string;
  entity: Entity | null;
  entityReferences: EntityReferences[];
}

interface Entity {
  [key: string]: any;
  individual_id?: string;
  individual_name?: string;
  individual_userName?: string;
  individual_roles?: string;
  individual_currentIssue?: string;
  individual_description?: string;
  group_id?: string;
  group_name?: string;
  group_handle?: string;
  group_stances?: string;
  group_currentIssue?: string;
  group_description?: string;
  organization_id?: string;
  organization_name?: string;
  organization_handle?: string;
  organization_stances?: string;
  organization_currentIssue?: string;
  organization_description?: string;
}

interface EntityReferences {
  reference_id: string;
  individual_id: string | null;
  group_id: string | null;
  organization_id: string | null;
  title: string;
  author: string;
  url: string;
}

interface Afiliate {
  type?: string;
  date: [{ affiliate_relation_date: string }];
  individual_currentIssue?: string;
  individual_description?: string;
  individual_username?: string;
  individual_id?: string;
  individual_name?: string;
  individual_roles?: string;
  group_currentIssue?: string;
  group_description?: string;
  group_handle?: string;
  group_id?: string;
  group_name?: string;
  group_stances?: string;
  organization_currentIssue?: string;
  organization_description?: string;
  organization_handle?: string;
  organization_id?: string;
  organization_name?: string;
  organization_stances?: string;
  profile_picture_id: string;
}

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
            styles="rounded-full"
          />
        </div>
        <div className="ml-8 h-fit">
          <p className="text-4xl mb-1">
            {entity?.[`${entityType.slice(0, -1)}_name`]}
          </p>
          <div
            ref={affiliateProfilePictureRef}
            className="flex space-x-6 overflow-x-auto"
            style={{
              maxWidth: topHeaderRef.current
                ? `${topHeaderRef.current.clientWidth - 120}px`
                : "100%",
            }}
          >
            {affiliatesProfilePictures}
          </div>
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
      <div className="space-x-6 font-K2D mt-6 flex items-center justify-center">
        <button className="w-1/4 h-9 rounded-md bg-fg-primary text-white">
          Affiliate with
        </button>
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
