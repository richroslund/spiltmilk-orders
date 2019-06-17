
import React, { useState, useCallback } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

export const DateSelector: React.FC<{onChange: (date: any) => void, date: Date | null | undefined}> = ({onChange, date}) => {
  return (
    <DatePicker
        selected={date}
        onChange={onChange}
        minDate={dayjs().add(3, 'day').toDate()}
        placeholderText="Select a date"
        />
  );
}
