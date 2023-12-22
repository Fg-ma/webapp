import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

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
                selected={selectedRange}
                mode="range"
                onDayClick={handleDayClick}
                className="custom-picker" 
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