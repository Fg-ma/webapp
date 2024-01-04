import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

export function Article({ sheet_id, entity_id}) {

    const [sheet, setSheet] = useState([]);
    const isAuthor = useRef(null);

    useEffect(() => {
        Axios.get(`http://localhost:5042/sheet/${sheet_id}`).then((response) => {
            setSheet(response.data);
        });
    }, [sheet_id]);

    if (sheet[0] && sheet[0].sheet_author_id === entity_id) {
        isAuthor.current = true;
    };

    return (
        <div className="shadow-md rounded flex flex-col justify-center">
            <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
            {sheet[0] && 
                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">
                    {sheet[0].sheet_title}
                </p>
            }
            <p className="text-sm font-K2D text-center mb-3">{isAuthor.current ? "Creator" : "Responseded to"}</p>
        </div>
    );
};

export function Video({ video_id }) {

    const [video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/video/${video_id}`).then((response) => {
            setVideo(response.data);
        });
    }, [video_id]);

    return (
        <div className="flex flex-col justify-center">
            <div className="bg-fg-white-85 w-full aspect-video rounded mx-auto mb-3"></div>
            <div className="flex justify-start items-center mb-2">
                <div className="bg-fg-white-85 w-8 aspect-square rounded-full"></div>
                {video[0] && 
                    <p 
                        className="text-sm font-bold leading-4 text-left h-[2] line-clamp-2 ml-2" 
                        style={{ width: 'calc(100% - 2.5rem)' }}
                    >
                        {video[0].video_title}
                    </p>
                }
            </div>
        </div>
    );
};

export function Image() {
    return (
        <div className="rounded flex flex-col justify-center">
            <div className="bg-fg-white-85 w-full aspect-square rounded-md mb-3 relative mx-2" style={{ width: 'calc(100% - 1rem)'}}>
                <div className="bg-fg-white-95 w-10 aspect-square rounded-full absolute -top-3 -left-3"></div>
            </div>
            <p className="text-base font-bold leading-5 text-left h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
        </div>
    );
};