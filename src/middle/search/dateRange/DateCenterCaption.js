import React, { useState } from "react";
import { format } from 'date-fns';
import { useNavigation } from 'react-day-picker';
import CaptionDropdown from "./CaptionDropdown";

const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"));
const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i);

export default function DateCenteredCaption(props) {
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
