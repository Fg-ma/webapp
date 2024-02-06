import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import config from "@config";
import Sheets from "./content/Sheets";
import Videos from "./content/Videos";
import Images from "./content/Images";
import Collections from "./content/Collections";
import EntityPageHeader from "./EntityPageHeader";
import EntityContentNav from "./EntityContentNav";
import EntityPageFooter from "./EntityPageFooter";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function EntityPage({ entityType }) {
    /* 
        Description:   
            Creates an entity's page based on information retrieved(or not retrieved) 
            from the database. Content also varies by what state the pageState 
            is currently. 
        Unique Properties:
            N/A
    */

    const pageState = useSelector(
        (state) => state.page[entityType].pagePayload.pageState
    );
    const entity_collection_id = useSelector(
        (state) => state.page[entityType].pagePayload.ids.collection_id
    );
    let entity_id;
    if (entityType === "individuals") {
        entity_id = useSelector(
            (state) => state.page.main.pagePayload.ids.individual_id
        );
    } else if (entityType === "groups") {
        entity_id = useSelector(
            (state) => state.page.main.pagePayload.ids.group_id
        );
    } else if (entityType === "organizations") {
        entity_id = useSelector(
            (state) => state.page.main.pagePayload.ids.organization_id
        );
    }
    const [entityData, setEntityData] = useState([]);
    const [entityReferences, setEntityReferences] = useState([]);
    const [entity, setEntity] = useState([]);

    // Get data from database
    useEffect(() => {
        const fetchEntityData = async () => {
            try {
                const response = await Axios.get(
                    `${serverUrl}/${entityType}/${entity_id}`
                );
                setEntityData(response.data);
            } catch (error) {
                console.error("Error fetching entity data:", error);
            }
        };

        const fetchEntity = async () => {
            try {
                const response = await Axios.get(
                    `${serverUrl}/entities/entity`,
                    {
                        params: {
                            id: entity_id,
                            type: entityType,
                        },
                    }
                );
                setEntity(response.data);
            } catch (error) {
                console.error("Error fetching entity:", error);
            }
        };

        const fetchEntityReferences = async () => {
            try {
                const response = await Axios.get(`${serverUrl}/references`, {
                    params: {
                        entity_id: entity_id,
                        type: entityType,
                    },
                });
                setEntityReferences(response.data);
            } catch (error) {
                console.error("Error fetching entity references:", error);
            }
        };

        if (entity_id) {
            fetchEntityData();

            fetchEntity();

            fetchEntityReferences();
        }
    }, [entity_id]);

    const renderContent = (entityData) => {
        if (entityData) {
            if (pageState === "sheets" && entity[0]) {
                return (
                    <Sheets
                        entity_id={entity[0].entity_id}
                        author_id={entityData.individual_id}
                    />
                );
            } else if (pageState === "videos" && entity[0]) {
                return <Videos entity_id={entity[0].entity_id} />;
            } else if (pageState === "images" && entity[0]) {
                return <Images entity_id={entity[0].entity_id} />;
            } else if (pageState === "collections") {
                return (
                    <Collections
                        entity_id={
                            entityData[entityType.slice(0, -1).concat("_id")]
                        }
                        collection_id={entity_collection_id}
                    />
                );
            }
        }
    };

    return (
        <div className='h-full w-full rounded-xl overflow-hidden'>
            <div className='mr-3' style={{ height: `calc(100% - 2.5rem)` }}>
                <div className='overflow-y-auto h-full w-full'>
                    <div className='ml-8 mr-5 px-6 my-8 py-8 bg-white rounded-lg overflow-hidden'>
                        <EntityPageHeader
                            entityType={entityType}
                            entity={entityData}
                            entityReferences={entityReferences}
                        />
                        <EntityContentNav
                            entityType={entityType}
                            entity={entityData}
                        />
                        {renderContent(entityData)}
                    </div>
                </div>
            </div>
            <EntityPageFooter entityType={entityType} entity={entityData} />
        </div>
    );
}
