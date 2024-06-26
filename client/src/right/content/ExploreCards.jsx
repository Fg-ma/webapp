import React from "react";
import { explore } from "../../data";
import { IndividualCard } from "../../left/content/IndividualCard";
import { GroupCard } from "../../left/content/GroupCard";
import { OrganizationCard } from "../../left/content/OrganizationCard";
import { NewsCard } from "./NewsCard";

export default function ExploreCards() {
  /* 
    Description:   
      Gets expolore data from a database then extracts the necessary data to be mapped
      into cards.
    Unique Properties:
      N/A
  */

  const exploreCards = explore.map((exploreInfo) => {
    switch (exploreInfo.cardType) {
      case "issue":
        return (
          <NewsCard
            key={exploreInfo.id}
            title={exploreInfo.title}
            subject={exploreInfo.issueQuestions}
            affResponses={exploreInfo.affResponses}
          />
        );
      case "individual":
        return (
          <IndividualCard
            key={exploreInfo.id}
            name={exploreInfo.name}
            current_issue={exploreInfo.currentIssue}
          />
        );
      case "group":
        return (
          <GroupCard
            key={exploreInfo.id}
            name={exploreInfo.name}
            current_issue={exploreInfo.currentIssue}
            affInCommon={exploreInfo.affInCommon}
          />
        );
      case "organization":
        return (
          <OrganizationCard
            key={exploreInfo.id}
            name={exploreInfo.name}
            current_issue={exploreInfo.currentIssue}
            stances={exploreInfo.stances}
          />
        );
      default:
        throw "Invalid Card Type";
    }
  });

  return (
    <div className="h-full my-4 ml-9 flex flex-col space-y-4">
      {exploreCards}
    </div>
  );
}
