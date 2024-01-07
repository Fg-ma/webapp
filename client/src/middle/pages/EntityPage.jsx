import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Sheets from "./content/Sheets";
import Videos from "./content/Videos";
import Images from "./content/Images";
import Collections from "./content/Collections";
import EntityPageHeader from "./EntityPageHeader";
import EntityContentNav from "./EntityContentNav";
import EntityPageFooter from "./EntityPageFooter";

export default function EntityPage({ entityType }) {

    /* 
        Description:   
            Creates an entity's page based on information retrieved(or not retrieved) 
            from the database. Content also varies by what state the pageState 
            is currently. 
        Unique Properties:
            N/A
    */

    const pageState = useSelector((state) => state.page[entityType].pagePayload.pageState);
    const entity_collection_id = useSelector((state) => state.page[entityType].pagePayload.ids.collection_id);
    let entity_id;
    if (entityType === "individuals") {
        entity_id = useSelector((state) => state.page.main.pagePayload.ids.individual_id);
    } else if (entityType === "groups") {
        entity_id = useSelector((state) => state.page.main.pagePayload.ids.group_id);
    } else if (entityType === "organizations") {
        entity_id = useSelector((state) => state.page.main.pagePayload.ids.organization_id);
    };
    const [entityData, setEntityData] = useState([]);
    const [individualReferences, setIndividualReferences] = useState([]);
    const [entity, setEntity] = useState([]);
    
    // Get data from database
    useEffect(() => {
        if (entityType === "individuals") {
            Axios.get(`http://localhost:5042/individual/${entity_id}`).then((response) => {
                setEntityData(response.data);
            });
        } else if (entityType === "groups") {
            Axios.get(`http://localhost:5042/group/${entity_id}`).then((response) => {
                setEntityData(response.data);
            });
        } else if (entityType === "organizations") {
            Axios.get(`http://localhost:5042/organization/${entity_id}`).then((response) => {
                setEntityData(response.data);
            });
        };

        Axios.get(`http://localhost:5042/entity`, {
            params: {
                id: entity_id,
                type: entityType,
            }
        }).then((response) => {
            setEntity(response.data);
        });

        Axios.get(`http://localhost:5042/references/${entity_id}`).then((response) => {
            setIndividualReferences(response.data);
        });
    }, [entity_id]);

    const renderContent = (entityData) => {
        if (entityData[0]) {
            switch (entityType) {
                case "individuals": {
                    switch (pageState) {
                        case "sheets":
                            if (entity[0]) {
                                return <Sheets entity_id={entity[0].entity_id} author_id={entityData[0].individual_id} />;
                            };
                        case "videos":
                            if (entity[0]) {
                                return <Videos entity_id={entity[0].entity_id} />;
                            };
                        case "images":
                            if (entity[0]) {
                                return <Images entity_id={entity[0].entity_id} />;
                            };
                        case "collections":
                            return <Collections entity_id={entityData[0].individual_id} collection_id={entity_collection_id} />;
                        default:
                            return <></>;
                    };
                }
                case "groups": {
                    switch (pageState) {
                        case "sheets":
                            if (entity[0]) {
                                return <Sheets entity_id={entity[0].entity_id} author_id={entityData[0].group_id} />;
                            };
                        case "videos":
                            if (entity[0]) {
                                return <Videos entity_id={entity[0].entity_id} />;
                            };
                        case "images":
                            if (entity[0]) {
                                return <Images entity_id={entity[0].entity_id} />;
                            };
                        case "collections":
                            return <Collections entity_id={entityData[0].group_id} collection_id={entity_collection_id} />;
                        default:
                            return <></>;
                    };
                }
                case "organizations": {
                    switch (pageState) {
                        case "sheets":
                            if (entity[0]) {
                                return <Sheets entity_id={entity[0].entity_id} author_id={entityData[0].organization_id} />;
                            };
                        case "videos":
                            if (entity[0]) {
                                return <Videos entity_id={entity[0].entity_id} />;
                            };
                        case "images":
                            if (entity[0]) {
                                return <Images entity_id={entity[0].entity_id} />;
                            };
                        case "collections":
                            return <Collections entity_id={entityData[0].organization_id} collection_id={entity_collection_id} />;
                        default:
                            return <></>;
                    };
                }
                default:
                    return <></>;
            };
        };
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden">
            <div className="mr-3" style={{ height: `calc(100% - 2.5rem)`}}>
                <div className="overflow-y-auto h-full w-full">
                    <div className="ml-8 mr-5 px-6 my-8 py-8 bg-white rounded-lg overflow-hidden">
                        <EntityPageHeader entityType={entityType} entity={entityData} individualReferences={individualReferences} />
                        <EntityContentNav entityType={entityType} entity={entityData} />
                        {renderContent(entityData)}
                    </div>
                </div>
            </div>
            <EntityPageFooter entityType={entityType} entity={entityData} />
        </div>
    );
};