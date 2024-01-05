import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Sheets from "./content/Sheets";
import Videos from "./content/Videos";
import Images from "./content/Images";
import Collections from "./content/Collections";
import IndividualsPageHeader from "./IndividualsPageHeader";
import IndividualsContentNav from "./IndividualsContentNav";
import IndividualsPageFooter from "./IndividualsPageFooter";

export default function IndividualsPage() {

    /* 
        Description:   
            Creates an individual's page based on information retrieved(or not retrieved) 
            from the database. Content also varies by what state the individualsPageState 
            is currently. 
        Unique Properties:
            N/A
    */

    const individualsPageState = useSelector((state) => state.page.individuals.pagePayload.pageState);
    const individual_id = useSelector((state) => state.page.main.pagePayload.ids.individual_id);
    const individual_collection_id = useSelector((state) => state.page.individuals.pagePayload.ids.collection_id);
    const [individual, setIndividual] = useState([]);
    const [individualReferences, setIndividualReferences] = useState([]);
    
    // Get data from database
    useEffect(() => {
        Axios.get(`http://localhost:5042/individual/${individual_id}`).then((response) => {
            setIndividual(response.data);
        });
        Axios.get(`http://localhost:5042/references/${individual_id}`).then((response) => {
            setIndividualReferences(response.data);
        });
    }, [individual_id]);

    const renderContent = (individual) => {
        if (individual[0]) {
            switch (individualsPageState) {
                case "sheets":
                    return <Sheets id={individual[0].individual_id} />;
                case "videos":
                    return <Videos id={individual[0].individual_id} />;
                case "images":
                    return <Images id={individual[0].individual_id} />;
                case "collections":
                    return <Collections entity_id={individual[0].individual_id} collection_id={individual_collection_id} />;
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
                        <IndividualsPageHeader individual={individual} individualReferences={individualReferences} />
                        <IndividualsContentNav individual={individual} />
                        {renderContent(individual)}
                    </div>
                </div>
            </div>
            <IndividualsPageFooter individual={individual} />
        </div>
    );
};