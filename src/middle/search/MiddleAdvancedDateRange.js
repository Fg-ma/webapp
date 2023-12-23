import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const bookedDays = [new Date(2023, 12, 22), new Date(2023, 12, 23)];
const bookedStyle = { border: '2px solid currentColor' };

export default function MiddleAdvancedDateRange(props) {
    const { position, dateRangeRef } = props;
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

    const handleDayClick = (day) => {
      if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
        setSelectedRange({ from: day, to: null });
      } else {
        setSelectedRange({ ...selectedRange, to: day });
      }
    };

    return createPortal(
        <div 
            className="bg-white absolute z-50" 
            style={position !== null ? { top: `${position.top}px`, left: `${position.left}px` } : null}
            ref={dateRangeRef}
        >
            <DayPicker 
                showOutsideDays
                selected={selectedRange}
                mode="range"
                onDayClick={handleDayClick}
                className="custom-picker" 
                modifiers={{ booked: bookedDays }}
                modifiersStyles={{ booked: bookedStyle }}
            />
            </div>,
        document.body
    );
}





//{selectedRange.from && (
//    <p>
//        Selected range: {selectedRange.from.toLocaleDateString()} -{' '}
//        {selectedRange.to ? selectedRange.to.toLocaleDateString() : 'Select end date'}
//    </p>
//)}