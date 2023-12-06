import React from "react";
import issues from "../../issues"

export default function NewsCards() {
    const newsCards = issues.map(newsCardInfo => {
        return <NewsCard key={newsCardInfo.id} title={newsCardInfo.title} issueQuestions={newsCardInfo.issueQuestions} affResponses={newsCardInfo.affResponses} />
    })

    return (
        <div id="newsCards" className="h-full mr-3 overflow-scroll">
            {newsCards}
        </div>
    )
}

function NewsCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
            <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                <p>pic</p>
            </div>
            <div className="m-2 w-2/3">
                <p className="font-Josefin text-base font-bold">{props.title}</p>
                <p className="font-Josefin text-xs">{props.issueQuestions}</p>
                <p className="newsAffResponses">Affiliates' responses: {props.affResponses}</p>
            </div>
        </div>
    )
}