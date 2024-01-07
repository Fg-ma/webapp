import React, { useState, useEffect } from "react";
import { OrganizationCard } from "./LeftSpaceCards";
import Axios from "axios";

export default function OrganizationCards() {

    /* 
        Description:   
            Gets organization data from a database then extracts the id, name, currentIssue, and stances to 
            be mapped into cards.
        Unique Properties:
            N/A
    */
   

    const [organizations, setOrganizations] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:5042/organizations").then((response) => {
            setOrganizations(response.data);
        });
    }, []); 

    const orgCards = organizations.map(orgInfo => {
        return <OrganizationCard 
                    key={orgInfo.organization_id} 
                    id={orgInfo.organization_id}
                    name={orgInfo.organization_name} 
                    currentIssue={orgInfo.organization_currentIssue} 
                    stances={orgInfo.organization_stances} 
                />
    });

    return (
        <div id="organizationCards" className="h-full mr-3 overflow-scroll">
            {orgCards}
        </div>
    )
}