import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { PapersCard } from "./RightSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment ? config.development.serverUrl : config.production.serverUrl;

export default function PapersCards() {

    /* 
        Description:   
            Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */

    const [papers, setPapers] = useState([]);

    useEffect(() => {
        Axios.get(`${serverUrl}/sheets`).then((response) => {
            setPapers(response.data);
        });
    }, []);

    const newsCards = papers.map(paperInfo => {
        return <PapersCard 
                    key={paperInfo.sheet_id} 
                    paper_id={paperInfo.sheet_id}
                    title={paperInfo.sheet_title} 
                    subject={paperInfo.sheet_subject} 
                />
    });

    return (
        <div id="newsCards" className="h-full mr-3 overflow-scroll">
            {newsCards}
        </div>
    )
}