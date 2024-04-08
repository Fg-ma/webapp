import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { EntityPageHeaderProps, Afiliate } from "@FgTypes/middleTypes";
import ReferenceLinks from "@components/referenceLinks/ReferenceLinks";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import AffiliatedEntitiesScroll from "./AffiliatedEntitiesScroll";
import AffiliateButton from "./AffiliateButton";
import MessageButton from "./MessageButton";
import ContactDropdown from "./ContactDropdown";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function EntityPageHeader({
  entity_username,
  entityType,
  entity,
  entityReferences,
  scrollingEntityContainer,
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
  const affiliateProfilePicturesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (affiliateProfilePicturesRef.current) {
      affiliateProfilePicturesRef.current.scrollLeft = 0;
    }

    const fetchAffiliateData = async () => {
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
              entity_username: entity_username,
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

    fetchAffiliateData();
  }, [entity_username]);

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
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    setAffiliatesProfilePictures(
      sortedAffiliatesArray.map((affiliate: Afiliate) => (
        <ProfilePicture
          key={String(
            affiliate.type === "individual"
              ? affiliate.individual_username
              : affiliate.type === "group"
                ? affiliate.group_handle
                : affiliate.organization_handle,
          )}
          size={{ w: 2, h: 2 }}
          entity_username={String(
            affiliate.type === "individual"
              ? affiliate.individual_username
              : affiliate.type === "group"
                ? affiliate.group_handle
                : affiliate.organization_handle,
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
                  entity_current_Issue: affiliate.individual_current_issue,
                }
              : affiliate.type === "group"
                ? {
                    entity_name: affiliate.group_name,
                    entity_username: affiliate.group_handle,
                    entity_current_Issue: affiliate.group_current_issue,
                  }
                : {
                    entity_name: affiliate.organization_name,
                    entity_username: affiliate.organization_handle,
                    entity_current_Issue: affiliate.organization_current_issue,
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
            entity_username={entity_username}
            entity_type={entityType}
            styles={
              entityType === 1
                ? "rounded-full"
                : entityType === 2
                  ? "rounded-xl"
                  : "rounded-md"
            }
            clickable={false}
          />
        </div>
        <div className="ml-8 h-fit grow">
          <p
            className={`text-4xl ${
              affiliatesProfilePictures?.length === 0 ? "mt-2" : "mb-1"
            }`}
          >
            {entityType === 1
              ? entity?.individual_name
                ? entity.individual_name
                : entity?.individual_username
              : entityType === 2
                ? entity?.group_name
                  ? entity.group_name
                  : entity?.group_handle
                : entity?.organization_name
                  ? entity.organization_name
                  : entity?.organization_handle}
          </p>
          <AffiliatedEntitiesScroll
            affiliatesProfilePictures={affiliatesProfilePictures}
            affiliateProfilePicturesRef={affiliateProfilePicturesRef}
            topHeaderRef={topHeaderRef}
          />
        </div>
      </div>
      <div className="text-xl mt-4">
        {entityType === 1
          ? entity?.individual_username && (
              <div className="flex items-center justify-start">
                <p className="pb-1">@</p>
                <p>{entity.individual_username}</p>
              </div>
            )
          : entityType === 2
            ? entity?.group_handle && (
                <div className="flex items-center justify-start">
                  <p className="pb-1">@</p>
                  <p>{entity.group_handle}</p>
                </div>
              )
            : entity?.organization_handle && (
                <div className="flex items-center justify-start">
                  <p className="pb-1">@</p>
                  <p>{entity.organization_handle}</p>
                </div>
              )}
      </div>
      <p className="text-2xl font-bold mt-2">
        {entityType === 1
          ? entity?.individual_currentIssue
          : entityType === 2
            ? entity?.group_currentIssue
            : entity?.organization_currentIssue}
      </p>
      {entityType === 1
        ? entity?.individual_roles && (
            <p className="text-xl font-K2D line-clamp-2 mt-1">
              {entity.individual_roles}
            </p>
          )
        : entityType === 2
          ? entity?.group_stances && (
              <p className="text-xl font-K2D line-clamp-2 mt-1">
                {entity.group_stances}
              </p>
            )
          : entity?.organization_stances && (
              <p className="text-xl font-K2D line-clamp-2 mt-1">
                {entity.organization_stances}
              </p>
            )}
      {entityType === 1
        ? entity?.individual_description && (
            <p className="text-base font-K2D mt-4">
              {entity.individual_description}
            </p>
          )
        : entityType === 2
          ? entity?.group_description && (
              <p className="text-base font-K2D mt-4">
                {entity.group_description}
              </p>
            )
          : entity?.organization_description && (
              <p className="text-base font-K2D mt-4">
                {entity.organization_description}
              </p>
            )}
      {entityReferences && <ReferenceLinks references={entityReferences} />}
      <div className="space-x-6 font-K2D mt-6 flex items-center justify-left">
        <AffiliateButton entity_username={entity_username} />
        <MessageButton entity_username={entity_username} />
        <button className="w-1/4 h-9 rounded-md bg-fg-white-95">Email</button>
        <ContactDropdown
          entity_username={entity_username}
          scrollingEntityContainer={scrollingEntityContainer}
        />
      </div>
    </>
  );
}
