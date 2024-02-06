import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { OrganizationCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

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
        const fetchOrganizationData = async () => {
            try {
                const response = await Axios.get(`${serverUrl}/organizations`);
                setOrganizations(response.data);
            } catch (error) {
                console.error("Error fetching organization data:", error);
            }
        };

        fetchOrganizationData();
    }, []);

    const orgCards = organizations.map((orgInfo) => {
        return (
            <OrganizationCard
                key={orgInfo.organization_id}
                id={orgInfo.organization_id}
                name={orgInfo.organization_name}
                currentIssue={orgInfo.organization_currentIssue}
                stances={orgInfo.organization_stances}
            />
        );
    });

    return (
        <div id='organizationCards' className='h-full mr-3 overflow-scroll'>
            {orgCards}
        </div>
    );
}
