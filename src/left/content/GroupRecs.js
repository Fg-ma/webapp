import React from "react";
import { groups } from "../../data";

export default function GroupRecs() {
    const grpRecs = groups.map(grpInfo => {
        return <GroupRec key={grpInfo.id} name={grpInfo.name} currentIssue={grpInfo.currentIssue} affInCommon={grpInfo.affInCommon} />
    })

    return (
        <div id="groupRecs" className="mr-3 h-full overflow-scroll">
            {grpRecs}
        </div>
    )
}

function GroupRec(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-28 py-2.5 flex items-center rounded-md">
            <div className="w-20 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2">
                <p className="font-Josefin text-xl">{props.name}</p>
                <p className="font-K2D text-sm text-fg-black-30">{props.currentIssue}</p>
                <p className="groupAffliliates">Affiliates in this group: {props.affInCommon}</p>
            </div>
        </div>
    )
}