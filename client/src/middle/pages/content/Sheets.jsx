import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Sheet } from "./Cards";

export default function Sheets({ id }) {

    /* 
        Description:   
            Queries the database to get the sheets that the passed in entity is related 
            to then sends the appropriate data to the Sheet card component.
        Unique Properties:
            N/A
    */
    
    const [sheetsData, setSheetsData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/individuals_sheets/${id}`).then((response) => {
            setSheetsData(response.data);
        });
    }, [id]);

    const sheets = sheetsData.map(sheet => {
        return <Sheet 
                    key={sheet.individuals_sheets_id} 
                    sheet_id={sheet.sheet_id} 
                    entity_id={sheet.individual_id}
                />
    });

    return (
        <div className="grid grid-cols-3 gap-6">
            {sheets}
        </div>
    );
};