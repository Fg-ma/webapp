import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Articles from "./content/Articles";
import Videos from "./content/Videos";
import Images from "./content/Images";
import IndividualsPageHeader from "./IndividualsPageHeader";
import IndividualContentNav from "./IndividualContentNav";

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
        switch (individualsPageState) {
            case "articles":
                if (individual[0]) {
                    return <Articles id={individual[0].individual_id} />;
                }
                return;
            case "videos":
                if (individual[0]) {
                    return <Videos id={individual[0].individual_id} />;
                }
                return;
            case "images":
                return <Images />;
            default:
                return <></>;
        }
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden">
            <div className="mr-3" style={{ height: `calc(100% - 2.5rem)`}}>
                <div className="overflow-y-scroll h-full w-full">
                    <div className="ml-8 mr-4 px-6 my-8 py-8 bg-white rounded-lg overflow-hidden">
                        <IndividualsPageHeader individual={individual} individualReferences={individualReferences} />
                        <IndividualContentNav />
                        {renderContent(individual)}
                    </div>
                </div>
            </div>
            <div className="h-10 bg-fg-white-85 flex items-center justify-between">
                <button className="h-10 aspect-square bg-cover bg-no-repeat ml-2" style={{ backgroundImage: 'url("/assets/icons/navigateBack.svg")' }}></button>
                <p className="text-3xl mt-2">{individual[0] && individual[0].individual_name}</p>
                <button className="h-8 aspect-square bg-cover bg-no-repeat mr-4" style={{ backgroundImage: 'url("/assets/icons/moreHorizontal.svg")' }}></button>
            </div>
        </div>
    );
};