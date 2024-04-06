import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import config from "@config";
import {
  EntityPageProps,
  EntityPageState,
  EntityData,
  EntityReferences,
  Entity,
  ContentMap,
  CollectionsContentMap,
} from "@FgTypes/middleTypes";
import Sheets from "./content/Sheets";
import Videos from "./content/Videos";
import Images from "./content/Images";
import Collections from "./content/Collections";
import EntityPageHeader from "./header/EntityPageHeader";
import EntityContentNav from "./EntityContentNav";
import EntityPageFooter from "./EntityPageFooter";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function EntityPage({ entityType }: EntityPageProps) {
  /* 
        Description:   
            Creates an entity's page based on information retrieved(or not retrieved) 
            from the database. Content also varies by what state the pageState 
            is currently. 
        Unique Properties:
            N/A
    */

  const pageState = useSelector(
    (state: EntityPageState) =>
      state.page[
        entityType === 1
          ? "individuals"
          : entityType === 2
            ? "groups"
            : "organizations"
      ].pagePayload.pageState,
  );
  const entity_collection_id = useSelector(
    (state: EntityPageState) =>
      state.page[
        entityType === 1
          ? "individuals"
          : entityType === 2
            ? "groups"
            : "organizations"
      ].pagePayload.ids.collection_id,
  );
  const entity_username = useSelector((state: EntityPageState) => {
    if (entityType === 1 && state.page["main"].pagePayload.ids.individual_id)
      return state.page["main"].pagePayload.ids.individual_id;
    else if (entityType === 2 && state.page["main"].pagePayload.ids.group_id)
      return state.page["main"].pagePayload.ids.group_id;
    else if (
      entityType === 3 &&
      state.page["main"].pagePayload.ids.organization_id
    )
      return state.page["main"].pagePayload.ids.organization_id;
    else if (
      state.page["main"].pagePayload.ids.individual_id &&
      state.page["main"].pagePayload.ids.individual_id === "user"
    )
      return "user";
  });

  const [entityData, setEntityData] = useState<EntityData | null>(null);
  const [entityReferences, setEntityReferences] = useState<EntityReferences[]>(
    [],
  );
  const [entity, setEntity] = useState<Entity | null>(null);
  const scrollingEntityContainer = useRef<HTMLDivElement>(null);
  const isEditablePage = useRef(false);

  // Get data from database
  useEffect(() => {
    if (scrollingEntityContainer.current) {
      scrollingEntityContainer.current.scrollTop = 0;
    }

    const fetchEditablePage = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(`${serverUrl}/entities/auth`, {
          params: {
            entity_username: entity_username,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        isEditablePage.current = response.data;
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    const fetchEntityData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/${
            entityType === 1
              ? "individuals"
              : entityType === 2
                ? "groups"
                : "organizations"
          }/${entity_username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setEntityData(response.data);
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    const fetchEntity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(`${serverUrl}/entities/entity`, {
          params: {
            entity_username: entity_username,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntity(response.data);
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };

    const fetchEntityReferences = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(`${serverUrl}/references`, {
          params: {
            entity_username: entity_username,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntityReferences(response.data);
      } catch (error) {
        console.error("Error fetching entity references:", error);
      }
    };

    if (entity_username) {
      fetchEditablePage();

      fetchEntityData();

      fetchEntity();

      fetchEntityReferences();
    }
  }, [entity_username]);

  const renderContent = () => {
    if (!entityData || !entity) return null;

    const contentMap: ContentMap = {
      sheets: (
        <Sheets
          entity_username={entity.entity_username}
          isEditablePage={isEditablePage}
        />
      ),
      videos: (
        <Videos
          entity_username={entity.entity_username}
          isEditablePage={isEditablePage}
        />
      ),
      images: (
        <Images
          entity_username={entity.entity_username}
          isEditablePage={isEditablePage}
        />
      ),
    };

    const collectionsComponent =
      entity_collection_id && entity_username ? (
        <Collections
          entity_username={entity_username}
          collection_id={entity_collection_id}
          isEditablePage={isEditablePage}
        />
      ) : null;

    return pageState !== "collections"
      ? contentMap[pageState]
      : collectionsComponent || null;
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-md flex flex-col relative">
      <div
        className="h-5 absolute -top-1 left-0 right-0 mx-8 z-50"
        style={{
          background: `linear-gradient(to bottom, rgba(243, 243, 243, 1) 0%, rgba(243, 243, 243, 0) 100%)`,
          filter: "blur(4px)",
          width: `calc(100% - 4rem)`,
        }}
      ></div>
      <div
        ref={scrollingEntityContainer}
        className="overflow-y-auto w-full pl-9"
        style={{ height: `calc(100% - 2.5rem)`, scrollbarGutter: "stable" }}
      >
        <div className="px-6 my-8 py-8 bg-white rounded-lg">
          {entity_username && (
            <EntityPageHeader
              entity_username={entity_username}
              entityType={entityType}
              entity={entityData}
              entityReferences={entityReferences}
              scrollingEntityContainer={scrollingEntityContainer}
            />
          )}
          <EntityContentNav
            entity_username={entity_username}
            entityType={entityType}
            entity={entityData}
            isEditablePage={isEditablePage}
          />
          {renderContent()}
        </div>
      </div>

      <EntityPageFooter entityType={entityType} entity={entityData} />
    </div>
  );
}
