import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, Transition, Variants } from "framer-motion";
import {
    setPageState,
    setIds,
} from "../../../redux/pageState/pageStateActions";
import CollectionButtons from "./CollectionButtons";

const indNavButtonsVar: Variants = {
    init: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(44, 146, 245, 0)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "8px",
    },
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
        fontSize: "1.375rem",
        lineHeight: "1.875rem",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
    },
};

const transition: Transition = {
    transition: {
        ease: "easeOut",
        duration: 0.1,
    },
};

interface EntityContentNavProps {
    entityType: string;
    entity: Entity | null;
}

interface Entity {
    [key: string]: any;
    individual_id?: number;
    individual_name?: string;
    individual_userName?: string;
    individual_roles?: string;
    individual_currentIssue?: string;
    individual_description?: string;
    group_id?: number;
    group_name?: string;
    group_handle?: string;
    group_stances?: string;
    group_currentIssue?: string;
    group_description?: string;
    organization_id?: number;
    organization_name?: string;
    organization_handle?: string;
    organization_stances?: string;
    organization_currentIssue?: string;
    organization_description?: string;
}

interface PageState {
    page: {
        [entityType: string]: {
            pagePayload: {
                pageState: string;
            };
        };
    };
}

export default function EntityContentNav({
    entityType,
    entity,
}: EntityContentNavProps) {
    /* 
        Description:   
            Creates the content nav containing the sheets, videos, and images buttons
            to swtich the entities's pageState and the entity's collections.
        Unique Properties:
            N/A
    */

    const dispatch = useDispatch();
    const pageState = useSelector(
        (state: PageState) => state.page[entityType].pagePayload.pageState
    );

    const deactiveStyles: React.CSSProperties = {};
    const activeStyles: React.CSSProperties = {
        textDecorationColor: "#F56114",
    };
    const pageStyles: Record<string, React.CSSProperties> = {
        sheets: deactiveStyles,
        videos: deactiveStyles,
        images: deactiveStyles,
    };
    pageStyles[pageState] = { ...activeStyles };

    const navItems = ["sheets", "videos", "images"];

    function swapPageState(newState: string) {
        dispatch(setPageState(entityType, newState));
        dispatch(setIds(entityType, "collection_id", null));
    }

    return (
        <>
            <div className='mt-6 mb-1 flex items-center justify-center'>
                {navItems.map((navItem) => (
                    <div
                        key={navItem}
                        className='w-1/3 flex items-center justify-center font-bold'
                    >
                        <motion.div
                            key={navItem}
                            className='h-8 flex cursor-pointer'
                            variants={indNavButtonsVar}
                            initial='init'
                            whileHover='hover'
                            transition={transition}
                            onClick={() => swapPageState(navItem)}
                        >
                            <button
                                style={pageStyles[navItem]}
                                className='underline decoration-2 underline-offset-8 decoration-transparent'
                            >
                                {navItem.charAt(0).toUpperCase() +
                                    navItem.slice(1)}
                            </button>
                        </motion.div>
                    </div>
                ))}
            </div>
            <div className='h-0.5 w-full bg-fg-black-25 rounded-full mb-2'></div>
            {entity && (
                <CollectionButtons
                    entityType={entityType}
                    entity_id={entity[`${entityType.slice(0, -1)}_id`]}
                />
            )}
        </>
    );
}
