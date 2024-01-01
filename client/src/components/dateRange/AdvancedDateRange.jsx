import React from "react";
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { motion } from "framer-motion";
import { setDateRange } from "../../redux/filters/filterActions";
import { useDispatch } from "react-redux";
import DateCenteredCaption from "./DateCenterCaption";

const css = `
    .custom-picker {
        font-family: K2D, sans;
    }

    .selected:hover:not([disabled]) {
        color: black;
    }

    .today { 
        font-weight: bold;
        font-size: 110%; 
        color: #F56114;
    }

    .custom-picker .selected {
        position: relative;
        font-weight: bold;
        color: white;
        background-color: #2C92F5;
        box-sizing: border-box;
        border: 1px solid white;
    }
`;

const dateRangeVar = {
    middleInit: {
        opacity: 0, 
        y: "-1vh" 
    },
    rightInit: {
        opacity: 0, 
        y: "1vh" 
    },
    animate: { 
        opacity: 1, 
        y: 0 
    },
    transition: { 
        duration: 0.25, 
        ease: "easeOut", 
        delay: 0.275 
    }
};

export default function AdvancedDateRange({ filter, position, selectedRange, setSelectedRange, updateRangeStyles, refs }) {
    
    /* 
        Description:   
            Creates the date range dropdown via create portal with the date range picker in it.
        Unique Properties:
            I don't know why but the only way to apply css styles was by using the style element.
    */

    const dispatch = useDispatch()

    const toDateString = (date) => {
        const inputDateString = String(date).substring(4, 15);
        // Create a Date object from the input string
        const dateObject = new Date(inputDateString);

        // Check if the dateObject is a valid date
        if (isNaN(dateObject.getTime())) {
            console.error("Invalid date string");
            return null;
        }

        // Extract the month, day, and year
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const year = dateObject.getFullYear();

        // Create the formatted date string
        const formattedDateString = `${month}.${day}.${year}`;

        return formattedDateString;
    };

    const handleDayClick = (day) => {
        if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
            setSelectedRange({ from: day, to: '' });
            dispatch(setDateRange(filter, toDateString(day), ''))
        } else {
            if (day < selectedRange.from) {
                setSelectedRange({ from: day, to: selectedRange.from });
                dispatch(setDateRange(filter, toDateString(day), toDateString(selectedRange.from)))
            } else {
                setSelectedRange({ ...selectedRange, to: day });
                dispatch(setDateRange(filter, toDateString(selectedRange.from), toDateString(day)))
            }
        };
    };

    return createPortal(
        <motion.div 
            className="bg-white absolute z-50 rounded-md select-none" 
            style={position !== null ? (filter == "middle") ? { top: `${position.top}px`, left: `${position.left}px` } : { bottom: `${position.bottom}px`, left: `${position.left}px` } : null}
            ref={refs.dateRange}
            variants={dateRangeVar}
            initial={filter === "middle" ? "middleInit" : "rightInit"}
            animate="animate"
            exit={filter === "middle" ? "middleInit" : "rightInit"}
            transition="transition"
        >
            <style>{css}</style>
            <DayPicker
                selected={selectedRange}
                components={{
                    Caption: ({  ...props }) => (
                        <DateCenteredCaption {...props} updateRangeStyles={updateRangeStyles} dateRangeCaptionDropdownRef={refs.dateRangeCaptionDropdown} />
                    ),
                }}
                mode="range"
                onDayClick={handleDayClick}
                className="custom-picker" 
                modifiersClassNames={{
                    selected: 'selected',
                    today: 'today',
                }}
            />
        </motion.div>,
        document.body
    );
}