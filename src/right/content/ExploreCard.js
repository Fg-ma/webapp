import React from "react";
import { explore } from "../../data"
import { IndividualCard, GroupCard, OrganizationCard } from "../../left/content/LeftSpaceCards"
import { NewsCard } from "./RightSpaceCards"

export default function ExploreCards() {
    const exploreCards = explore.map(exploreInfo => {
        switch (exploreInfo.cardType) {
            case "issue":
                return <NewsCard key={exploreInfo.id} title={exploreInfo.title} issueQuestions={exploreInfo.issueQuestions} affResponses={exploreInfo.affResponses} />;
            case "individual":
                return <IndividualCard key={exploreInfo.id} name={exploreInfo.name} currentIssue={exploreInfo.currentIssue} />;
            case "group":
                return <GroupCard key={exploreInfo.id} name={exploreInfo.name} currentIssue={exploreInfo.currentIssue} affInCommon={exploreInfo.affInCommon} />;
            case "organization":
                return <OrganizationCard key={exploreInfo.id} name={exploreInfo.name} currentIssue={exploreInfo.currentIssue} stances={exploreInfo.stances} />;
            default:
                throw "Invalid Card Type";
        }
    })

    return (
        <div id="exploreCards" className="h-full mr-3 overflow-scroll">
            {exploreCards}
        </div>
    )
}