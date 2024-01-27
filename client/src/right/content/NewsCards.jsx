import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { NewsCard } from "./RightSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = isDevelopment ? config.development.apiUrl : config.production.apiUrl;

export default function NewsCards() {

    /* 
        Description:   
            Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */

    const [sheets, setSheets] = useState([]);

    useEffect(() => {
        Axios.get(`${apiUrl}/sheets`).then((response) => {
            setSheets(response.data);
        });
    }, []);

    const newsCards = sheets.map(issueInfo => {
        return <NewsCard 
                    key={issueInfo.sheet_id} 
                    sheet_id={issueInfo.sheet_id}
                    title={issueInfo.sheet_title} 
                    subject={issueInfo.sheet_subject} 
                /> //affResponses={issueInfo.affResponses} />
    });

    return (
        <div id="newsCards" className="h-full mr-3 overflow-scroll">
            {newsCards}
        </div>
    )
}