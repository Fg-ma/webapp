import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import { Sheet } from "./Cards";

export default function Sheets({ entity_id, author_id}) {

    /* 
        Description:   
            Queries the database to get the sheets that the passed in entity is related 
            to then sends the appropriate data to the Sheet card component.
        Unique Properties:
            N/A
    */
    
    const [sheetsData, setSheetsData] = useState([]);
    const sheetSocketRef = useRef(null);

    // Connect socket
    useEffect(() => {
        sheetSocketRef.current = io.connect("http://localhost:5041");

        return () => {
            sheetSocketRef.current.disconnect();
        };
    }, []);

    // Sorts the sheet data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
    const sortData = (data) => {
        const pinnedRows = data.filter((item) => item.pinned === 1);
        const notPinnedRows = data.filter((item) => item.pinned === 0);
    
        const parseDate = (dateString) => new Date(dateString);
    
        pinnedRows.sort((a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned));
        notPinnedRows.sort((a, b) => parseDate(b.date_added) - parseDate(a.date_added));
    
        return [...pinnedRows, ...notPinnedRows];
    };

    // Gets sheet data and connects to socket
    useEffect(() => {   
        // Connects to the socket to get the new data when pinned is updated
        sheetSocketRef.current.on("pinnedUpdated", ({ relation, relation_id, pinned, date_pinned }) => {
            setSheetsData((prevData) => {
                const updatedData = prevData.map((sheet) => {
                    if (sheet.entities_sheets_id === relation_id) {
                        return { ...sheet, pinned: pinned, date_pinned: date_pinned };
                    }
                    return sheet;
                });
    
                const sortedData = sortData(updatedData);
                
                return sortedData;
            });
        });

        // Gets original sheet data
        Axios.get(`http://localhost:5042/entities/entity_sheets/${entity_id}`).then((response) => {
            setSheetsData(sortData(response.data));
        });
    }, [entity_id]);

    const sheets = sheetsData.map(sheet => {
        return <Sheet 
            key={`sheet_${sheet.sheet_id}`} 
            type={"entity"} 
            sheet_id={sheet.sheet_id} 
            author_id={author_id}
            pinned={sheet.pinned}
            relation_id={sheet.entities_sheets_id}
            socket={sheetSocketRef.current}
        />
    });

    return (
        <div className="mt-4 grid grid-cols-3 gap-6">
            {sheets}
        </div>
    );
};