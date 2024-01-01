import React, { useState } from "react";
import { format } from 'date-fns';
import { useNavigation } from 'react-day-picker';
import CaptionDropdown from "./CaptionDropdown";

const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"));
const years = Array.from({ length: new Date().getFullYear() - 1999 + 1 }, (_, i) => 1999 + i);

export default function DateCenteredCaption(props) {

    /* 
        Description:   
            Creates the caption for the caption for the date range dropdown. Places the date centered 
            between the forward and back arrows.
        Unique Properties:
            Utilizes the month and year arrays for option choices.
    */

    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    const [selectedMonth, setSelectedMonth] = useState(props.displayMonth.getMonth());
    const [selectedYear, setSelectedYear] = useState(props.displayMonth.getFullYear());

    const handleDropMonthChange = (newMonthIndex) => {
        props.updateRangeStyles();
        setSelectedMonth(newMonthIndex);
        const newDate = new Date(selectedYear, newMonthIndex);
        goToMonth(newDate);
    };

    const handleDropYearChange = (newYearIndex) => {
        props.updateRangeStyles();
        const newYear = years[newYearIndex];
        setSelectedYear(newYear);
        const newDate = new Date(newYear, selectedMonth);
        goToMonth(newDate);
    };

    const handleBackMonth = () => {
        props.updateRangeStyles();
        const previousMonthDate = new Date(props.displayMonth);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
        setSelectedMonth(previousMonthDate.getMonth());
        setSelectedYear(previousMonthDate.getFullYear());
        goToMonth(previousMonthDate);
    };

    const handleForwardMonth = () => {
        props.updateRangeStyles();
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
                    dateRangeCaptionDropdownRef={props.dateRangeCaptionDropdownRef}
                />
                <CaptionDropdown
                    options={years}
                    value={selectedYear}
                    onChange={handleDropYearChange}
                    type={'year'}
                    dateRangeCaptionDropdownRef={props.dateRangeCaptionDropdownRef}
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
