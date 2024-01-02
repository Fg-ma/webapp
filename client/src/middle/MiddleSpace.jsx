import React, { useRef, useState } from "react";
import "./middleSpace.css";
import MiddleVerticalSplitPane from "./MiddleVerticalSplitPane";
import MiddleDrop from "./search/MiddleDrop";

export default function MiddleSpace({ middleSpaceContainerRef }) {

    /* 
    
        Description:   
            Container for everything that happens in the middle space section including 
            MiddleDrop and MiddleVerticalSplitPane.
        Unique Properties:
            N/A
    */

    const middleSpaceRef = useRef(null);
    const [middleSpaceState, setMiddleSpaceState] = useState('individuals')
    
    return (
        <div ref={middleSpaceRef} id="middleSpace" className="rounded-xl h-4/5 w-full relative drop-shadow-md overflow-hidden">
            {middleSpaceState === "home" && 
                <div className="h-full">
                    <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 z-10 -top-6 h-fit">
                        <MiddleDrop middleSpaceContainerRef={middleSpaceContainerRef} middleSpaceRef={middleSpaceRef} />
                    </div>
                    <div className="overflow-hidden rounded-xl h-full w-full">
                        <MiddleVerticalSplitPane />
                    </div>
                </div>
            }
            {middleSpaceState === "individuals" && 
                <div className="h-full w-full">
                    <div className="mr-3" style={{ height: `calc(100% - 2.5rem)`}}>
                        <div className="overflow-y-scroll h-full w-full">
                            <div className="ml-10 mr-8 overflow-hidden">
                                <div className="mt-14 flex items-center">
                                    <div className="w-24 aspect-square rounded-full bg-fg-white-85 mr-8"></div>
                                        <div className="h-fit">
                                            <p className="text-4xl mb-1">Paula Anderson</p>
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
                                <p className="text-xl mt-4">paula_anderson123</p>
                                <p className="text-2xl font-bold mt-2">How do we Address the World Burning?</p>
                                <p className="text-xl font-K2D line-clamp-2 mt-1">Chairperson for PETA, Lobbyist on Capital Hill, President of Local Chapter of the National Pet Alliance</p>
                                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                            </div>
                        </div>
                    </div>
                    <div className="h-10 bg-fg-white-85">
                        
                    </div>
                </div>
            }
        </div>
    )
}