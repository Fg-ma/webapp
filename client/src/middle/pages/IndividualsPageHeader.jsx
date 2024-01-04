import React from "react";
import ReferenceLinks from "../../components/referenceLinks/ReferenceLinks";

export default function IndividualsPageHeader({ individual, individualReferences }) {

    /* 
        Description:   
            Creates an individual's page header from information retrieved(or not retrieved)
            from the inputted individual data.
        Unique Properties:
            N/A
    */

    return (
        <>
            <div className="flex items-center">
                <div className="w-24 aspect-square rounded-full bg-fg-white-85 mr-8"></div>
                <div className="h-fit">
                    <p className="text-4xl mb-1">{individual[0] && individual[0].individual_name}</p>
                    <div className="flex space-x-6">
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-lg"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-sm"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-lg"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                        <div className="h-8 aspect-square bg-fg-white-85 rounded-sm"></div>
                    </div>
                </div>
            </div>
            <p className="text-xl mt-4">{individual[0] && individual[0].individual_userName}</p>
            <p className="text-2xl font-bold mt-2">{individual[0] && individual[0].individual_currentIssue}</p>
            {individual[0] && individual[0].individual_roles && 
                <p className="text-xl font-K2D line-clamp-2 mt-1">{individual[0].individual_roles}</p>
            }
            {individual[0] && individual[0].individual_description &&
                <p className="text-base font-K2D mt-4">{individual[0].individual_description}</p>
            }
            <ReferenceLinks references={individualReferences} />
            <div className="space-x-6 font-K2D mt-6 flex items-center justify-center">
                <button className="w-1/5 h-9 rounded-md bg-fg-primary text-white">Affiliate with</button>
                <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Message</button>
                <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Email</button>
                <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Contact</button>
            </div>
        </>
    )
}
