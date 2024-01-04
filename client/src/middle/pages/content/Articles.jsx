import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Article } from "./Cards";

export default function Articles({ id }) {
    
    const [individualsSheets, setIndividualsSheets] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/individuals_sheets/${id}`).then((response) => {
            setIndividualsSheets(response.data);
        });
    }, [id]);

    const articles = individualsSheets.map(sheet => {
        return <Article 
                    key={sheet.individuals_sheets_id} 
                    sheet_id={sheet.sheet_id} 
                    entity_id={sheet.individual_id}
                />
    });

    return (
        <div className="grid grid-cols-3 gap-6">
            {articles}
        </div>
    );
};