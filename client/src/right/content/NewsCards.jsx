import React, { useState, useEffect } from "react";
import { NewsCard } from "./RightSpaceCards";
import Axios from "axios";

export default function NewsCards() {

    /* 
        Description:   
            Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */

    const [coverSheet, setCoverSheet] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5042/sheets").then((response) => {
            setCoverSheet(response.data);
        });
    }, []);

    const newsCards = coverSheet.map(issueInfo => {
        return <NewsCard 
                    key={issueInfo.sheet_id} 
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