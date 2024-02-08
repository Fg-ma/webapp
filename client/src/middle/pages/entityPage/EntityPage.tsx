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

interface EntityPageProps {
    entityType: string;
}

interface EntityPageState {
    page: {
        [key: string]: {
            pagePayload: {
                pageState: string;
                ids: {
                    individual_id: number | null;
                    group_id: number | null;
                    organization_id: number | null;
                    collection_id: number | null;
                };
            };
        };
    };
}

interface EntityData {
    individual_id?: number;
    individual_name?: string;
    individual_userName?: string;
    individual_roles?: string;
    individual_currentIssue?: string;
    individual_description?: string;
    group_id?: number;
    group_name?: string;
    group_handle?: string;
    group_stances?: string;
    group_currentIssue?: string;
    group_description?: string;
    organization_id?: number;
    organization_name?: string;
    organization_handle?: string;
    organization_stances?: string;
    organization_currentIssue?: string;
    organization_description?: string;
}

interface EntityReferences {
    reference_id: number;
    individual_id: number | null;
    group_id: number | null;
    organization_id: number | null;
    title: string;
    author: string;
    url: string;
}

interface Entity {
    entity_id: number;
    individual_id: number | null;
    group_id: number | null;
    organization_id: number | null;
}

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
        (state: EntityPageState) => state.page[entityType].pagePayload.pageState
    );
    const entity_collection_id = useSelector(
        (state: EntityPageState) =>
            state.page[entityType].pagePayload.ids.collection_id
    );
    const entity_id = useSelector((state: EntityPageState) => {
        if (entityType === "individuals")
            return state.page["main"].pagePayload.ids.individual_id;
        else if (entityType === "groups")
            return state.page["main"].pagePayload.ids.group_id;
        else if (entityType === "organizations")
            return state.page["main"].pagePayload.ids.organization_id;
    });

    const [entityData, setEntityData] = useState<EntityData | null>(null);
    const [entityReferences, setEntityReferences] = useState<
        EntityReferences[]
    >([]);
    const [entity, setEntity] = useState<Entity | null>(null);

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

                setEntity(response.data[0]);
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

    const renderContent = () => {
        if (entityData) {
            if (pageState === "sheets" && entity) {
                return (
                    <Sheets
                        entity_id={entity.entity_id}
                        author_id={entityData.individual_id}
                    />
                );
            } else if (pageState === "videos" && entity) {
                return <Videos entity_id={entity.entity_id} />;
            } else if (pageState === "images" && entity) {
                return <Images entity_id={entity.entity_id} />;
            } else if (pageState === "collections") {
                if (entityType === "individuals") {
                    return (
                        <Collections
                            entity_id={entityData["individual_id"]}
                            collection_id={entity_collection_id}
                        />
                    );
                } else if (entityType === "groups") {
                    return (
                        <Collections
                            entity_id={entityData["group_id"]}
                            collection_id={entity_collection_id}
                        />
                    );
                } else if (entityType === "organizations") {
                    return (
                        <Collections
                            entity_id={entityData["organization_id"]}
                            collection_id={entity_collection_id}
                        />
                    );
                }
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
                        {renderContent()}
                    </div>
                </div>
            </div>
            <EntityPageFooter entityType={entityType} entity={entityData} />
        </div>
    );
}
