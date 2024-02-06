import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function IndividualRecs() {
    /* 
        Description:   
            Gets individual data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            N/A
    */

    const [individuals, setIndividuals] = useState([]);

    useEffect(() => {
        const fetchIndividualData = async () => {
            try {
                const response = await Axios.get(`${serverUrl}/individuals`);
                setIndividuals(response.data);
            } catch (error) {
                console.error("Error fetching individual data:", error);
            }
        };

        fetchIndividualData();
    }, []);

    const indRecs = individuals.map((indInfo) => {
        return (
            <IndividualCard
                key={indInfo.individual_id}
                id={indInfo.individual_id}
                name={indInfo.individual_name}
                currentIssue={indInfo.individual_currentIssue}
            />
        );
    });

    return (
        <div id='individualRecs' className='mr-3 h-full overflow-scroll'>
            {indRecs}
        </div>
    );
}
