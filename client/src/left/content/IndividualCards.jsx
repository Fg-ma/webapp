import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = isDevelopment ? config.development.apiUrl : config.production.apiUrl;

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
        Axios.get(`${apiUrl}/individuals`).then((response) => {
            setIndividuals(response.data);
        });
    }, []);

    const indCards = individuals.map(indInfo => {
        return <IndividualCard 
                    key={indInfo.individual_id} 
                    id={indInfo.individual_id}
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