import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { DayPicker, useNavigation } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setDateRange } from "../../redux/filters/filterActions";
import { useDispatch } from "react-redux";

const css = `
    .custom-picker {
        font-family: K2D, sans;
    }

    .selected:not([disabled]) { 
        position: relative;
        font-weight: bold;
        color: white;
        background-color: #2C92F5;
    }

    .selected:hover:not([disabled]) {
        color: black;
    }

    .today { 
        font-weight: bold;
        font-size: 110%; 
        color: #F56114;
    }

    .custom-picker .selected,
    .custom-picker .rdp-day_range_middle {
        position: relative;
        font-weight: bold;
        color: white;
        background-color: #2C92F5;
        box-sizing: border-box;
        border: 2px solid white;
    }

    .custom-picker .rdp-day_range_start,
    .custom-picker .rdp-day_range_end {
        position: relative;
        font-weight: bold;
        color: white;
        background-color: #2C92F5;
        box-sizing: border-box;
        border: 2px solid white;
        border-radius: 50%;
    }

    .custom-picker .rdp-day_range_start:not(.rdp-day_range_end) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .custom-picker .rdp-day_range_end:not(.rdp-day_range_start) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;




const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"));
const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i);

function DateCenteredCaption(props) {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    const [selectedMonth, setSelectedMonth] = useState(props.displayMonth.getMonth());
    const [selectedYear, setSelectedYear] = useState(props.displayMonth.getFullYear());

    const handleDropMonthChange = (newMonthIndex) => {
        setSelectedMonth(newMonthIndex);
        const newDate = new Date(selectedYear, newMonthIndex);
        goToMonth(newDate);
    };

    const handleDropYearChange = (newYearIndex) => {
        const newYear = years[newYearIndex];
        setSelectedYear(newYear);
        const newDate = new Date(newYear, selectedMonth);
        goToMonth(newDate);
    };

    const handleBackMonth = () => {
        const previousMonthDate = new Date(props.displayMonth);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
        setSelectedMonth(previousMonthDate.getMonth());
        setSelectedYear(previousMonthDate.getFullYear());
        goToMonth(previousMonthDate);
    };

    const handleForwardMonth = () => {
        const previousMonthDate = new Date(props.displayMonth);
        previousMonthDate.setMonth(previousMonthDate.getMonth() + 1);
        setSelectedMonth(previousMonthDate.getMonth());
        setSelectedYear(previousMonthDate.getFullYear());
        goToMonth(previousMonthDate);
    };

    return (
        <div className="w-full flex items-center justify-between">
            <button
                disabled={!previousMonth}
                onClick={handleBackMonth}
                className="h-8 aspect-square bg-125 bg-no-repeat bg-center"
                style={{ backgroundImage: "url('assets/icons/navigateBack.svg')" }}
            ></button>
            <div className="flex items-center justify-center">
                <CaptionDropdown
                    options={months}
                    value={selectedMonth}
                    onChange={handleDropMonthChange}
                    type={'month'}
                />
                <CaptionDropdown
                    options={years}
                    value={selectedYear}
                    onChange={handleDropYearChange}
                    type={'year'}
                />
            </div>
            <button
                disabled={!nextMonth}
                onClick={handleForwardMonth}
                className="h-8 aspect-square bg-125 bg-no-repeat bg-center"
                style={{ backgroundImage: "url('assets/icons/navigateForward.svg')" }}
            ></button>
        </div>
    );
}








const CaptionDropdown = ({ options, value, onChange, type }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="h-8 px-3 bg-125 text-black font-Josefin text-xl leading-5"
            >
                {type === 'month' ? options[value] : value}
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1 pr-2 bg-white rounded shadow-md z-50 left-1/2 transform -translate-x-1/2">
                    <div className="h-48 overflow-scroll">
                        <ul className="py-1">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-1 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSelect(index)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
















export default function MiddleAdvancedDateRange(props) {
    const dispatch = useDispatch()
    const { position, dateRangeRef, selectedRange, setSelectedRange } = props;

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
                    Caption: DateCenteredCaption,
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