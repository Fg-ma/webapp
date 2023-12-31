import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function RelatedIssues() {
    
    /* 
        Description:   
            Gets related issues data from a data base then extracts the id and title to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliates responses to the related issue.
    */

    const [coverSheet, setCoverSheet] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5042/sheets").then((response) => {
            setCoverSheet(response.data);
        });
    }, []);
        
    const relIssues = coverSheet.map(relIssuesInfo => {
        return <RelatedIssuesCard 
                    key={relIssuesInfo.sheet_id} 
                    title={relIssuesInfo.sheet_title} 
                /> //affResponses={issueInfo.affResponses} />
    });

    return (
        <div id="individualRecs" className="mr-3 h-full overflow-scroll">
            {relIssues}
        </div>
    )
}

function RelatedIssuesCard({ title, affResponses = null }) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-24 flex items-center rounded-md">
            <div className="w-16 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                <p>pic</p>
            </div>
            <div className="m-5 w-full truncate">
                <p className="font-Josefin text-xl font- truncate">{title}</p>
                <p className="font-K2D text-sm text-fg-black-30 truncate">Affiliates' responses: {affResponses}</p>
            </div>
        </div>
    )
}