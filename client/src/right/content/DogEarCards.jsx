import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { DogEarCard } from "./RightSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment ? config.development.serverUrl : config.production.serverUrl;

export default function DogEarCards() {

    /* 
        Description:   
            Gets dogEars data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */


    const [coverSheet, setCoverSheet] = useState([]);

    useEffect(() => {
        const fetchCoverSheetData = async () => {
            try {
                const response = await Axios.get(`${serverUrl}/sheets`);
                setCoverSheet(response.data);
            } catch (error) {
                console.error('Error fetching cover sheet data:', error);
            };
        };
      
        fetchCoverSheetData();
    }, []);
    
    const dogEarCards = coverSheet.map(issueInfo => {
        return <DogEarCard 
                    key={issueInfo.sheet_id} 
                    title={issueInfo.sheet_title} 
                    subject={issueInfo.sheet_subject} 
                /> //affResponses={issueInfo.affResponses} />
    });

    return (
        <div id="dogEarCards" className="h-full mr-3 overflow-scroll">
            {dogEarCards}
        </div>
    )
}