
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import { Portal } from './Portal';
import { Modifier } from 'react-day-picker/types/common';

export const OrderForm: React.FC = () => {
    const [date, setDate] = useState();
    const monthContainer = useRef(document.querySelector('.field.month'));
    const dayContainer = useRef(document.querySelector('.field.day'));
    const yearContainer = useRef(document.querySelector('.field.year'));
    const monthRef = useRef(document.querySelector('.field-element[data-title=\'Month\']'));
    const dayRef = useRef(document.querySelector('.field-element[data-title=\'Day\']'));
    const yearRef = useRef(document.querySelector('.field-element[data-title=\'Year\']'));

    const submitButton = useRef(document.querySelector('.form-button-wrapper input.button[type=\'submit\']'));

    useEffect(() => {
        if(monthContainer && monthContainer.current) {
            monthContainer.current.classList.add('hidden');
        }
        if(dayContainer && dayContainer.current) {
            dayContainer.current.classList.add('hidden');
        }
        if(yearContainer && yearContainer.current) {
            yearContainer.current.classList.add('hidden');
        }
        if(submitButton && submitButton.current) {
            submitButton.current.classList.add('hidden');
        }
    }, []);
    const onChange = useCallback((date) => {
        const dateVal = dayjs(date);
        if(monthRef && monthRef.current) {
            monthRef.current.setAttribute('value', (dateVal.get('month')+1).toString());
        }
        if(dayRef && dayRef.current) {
            dayRef.current.setAttribute('value', dateVal.get('date').toString());
        }
        if(yearRef && yearRef.current) {
            yearRef.current.setAttribute('value', dateVal.get('year').toString());
        }
        setDate(date);
    }, [setDate]);
    
    const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if(dayjs().day() + 2 >= dayjs(date).day()) {
            event.preventDefault();
            event.stopPropagation();
            alert('invalid day');
        }
    }, [date]);
    const handleSubmit = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        if(dayjs().day() + 2 >= dayjs(date).day()) {
            event.preventDefault();
            event.stopPropagation();
            alert('invalid day');
        }
    }, [date]);
    const alreadyClosed = useMemo(() => {
        const d = dayjs();
        const day = d.day();
        if([0, 6].includes(day) && d.hour()>14) {
            return true;
        } else if (d.hour()>17) {
            return true;
        }
        return false;
    }, []);
    const beforeDisabledDate = useMemo(() => {
        if(alreadyClosed) {
            return dayjs().add(4, 'day');
        } else {
            return dayjs().add(3, 'day');
        }
    }, [alreadyClosed]);
  return (
      <>
    <Portal containerSelector=".form-item.fields.date.required">
    <DayPickerInput 
    format={'MM-DD-YYYY'}
    formatDate={(date) => dayjs(date).format('dddd, MMM D')}
    placeholder={'Pickup date'}
       onDayChange={day => console.log(day)} 
      dayPickerProps={{
        fromMonth: dayjs().toDate(),
        disabledDays: { daysOfWeek: [1], before: beforeDisabledDate.toDate() }
      }}
      
      
    />
        </Portal>
        <Portal  containerSelector=".form-button-wrapper">
            <input className="button sqs-system-button sqs-editable-button" type="submit" value="Add To Cart" onClick={handleClick} onSubmit={handleSubmit}></input>
        </Portal>
        </>
    
  );
}
