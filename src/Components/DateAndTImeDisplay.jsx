import React from 'react';

function DateTimeDisplay({ dateTime ,value}) {
  
const [datePart, timePart] = dateTime.split('T');

// Parse the time part
const [hour, minute] = timePart.split(':');
let formattedTime = '';
if (parseInt(hour) >= 12) {
  formattedTime = `${parseInt(hour) - 12}:${minute} PM`;
} else {
  formattedTime = `${hour}:${minute} AM`;
}

  return (
    <div className="date-time-display">
      <span className="icon">{value} :</span>
      <span className="date">{datePart}</span>
      <span className="icon">,</span>
      <span className="time">{formattedTime}</span>
      <span className="icon">⏰</span>
    </div>
  );
}

export default DateTimeDisplay;
