import React, { useState, useEffect } from "react";
import { IndividualCard } from "./LeftSpaceCards";
import Axios from "axios";

export default function IndividualCards() {

    /* 
        Description:   
            Gets individual data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            N/A
    */
   
    const [individuals, setIndividuals] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5042/individuals").then((response) => {
            setIndividuals(response.data);
        });
    }, []);

    const indCards = individuals.map(indInfo => {
        return <IndividualCard 
                    key={indInfo.individual_id} 
                    name={indInfo.individual_name} 
                    currentIssue={indInfo.individual_currentIssue} 
                />
    });

    return (
        <div id="individualCards" className="h-full mr-3 overflow-scroll">
            {indCards}
        </div>
    )
}