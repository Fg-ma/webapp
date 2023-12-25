import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setDateRange } from "../../../redux/filters/filterActions";
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

export default function MiddleAdvancedDateRange({ position, dateRangeRef, selectedRange, setSelectedRange, updateRangeStyles, isCaptionDropOpen, setIsCaptionDropOpen, dropdownRef }) {
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
            dispatch(setDateRange('middle', toDateString(day), ''))
        } else {
            if (day < selectedRange.from) {
                setSelectedRange({ from: day, to: selectedRange.from });
                dispatch(setDateRange('middle', toDateString(day), toDateString(selectedRange.from)))
            } else {
                setSelectedRange({ ...selectedRange, to: day });
                dispatch(setDateRange('middle', toDateString(selectedRange.from), toDateString(day)))
            }
        }
    };

    return createPortal(
        <div 
            className="bg-white absolute z-50" 
            style={position !== null ? { top: `${position.top}px`, left: `${position.left}px` } : null}
            ref={dateRangeRef}
        >
            <style>{css}</style>
            <DayPicker
                selected={selectedRange}
                components={{
                    Caption: ({  ...props }) => (
                        <DateCenteredCaption updateRangeStyles={updateRangeStyles} {...props} />
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
        </div>,
        document.body
    );
}