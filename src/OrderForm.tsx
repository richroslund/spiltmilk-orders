
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';
import { Portal } from './Portal';
import { Modifier } from 'react-day-picker/types/common';

const alreadyClosed = (date: dayjs.Dayjs) => {
    const day = date.day();
    if([0, 6].includes(day) && date.hour()>14) {
        return true;
    } else if (date.hour()>17) {
        return true;
    }
    return false;
};

    
const beforeDisabledDate = () => {
    if(alreadyClosed(dayjs())) {
        return dayjs().add(4, 'day');
    } else {
        return dayjs().add(3, 'day');
    }
};

export const OrderForm: React.FC = () => {
    const [dateError, setDateError] = useState();
    const dateErrorElement = useRef(document.createElement('div'));
    const fieldWrapper = useRef(document.querySelector('fieldset.form-item.fields.date.required'));
    const monthRef = useRef<HTMLInputElement>(document.querySelector('.field-element[data-title=\'Month\']'));
    const dayRef = useRef<HTMLInputElement>(document.querySelector('.field-element[data-title=\'Day\']'));
    const yearRef = useRef<HTMLInputElement>(document.querySelector('.field-element[data-title=\'Year\']'));
    const submitButton = useRef<HTMLInputElement>(document.querySelector('.form-button-wrapper input.button[type=\'submit\']'));

    const getSelectedDate = () => {
        const month = monthRef.current ? parseInt(monthRef.current.value || '-1') : -1;
        const day = dayRef.current ?  parseInt(dayRef.current.value || '-1') : -1;
        const year = yearRef.current ? parseInt(yearRef.current.value || '-1') : -1;
        const selectedDate = dayjs().set('year', year).month(month-1).date(day);
        return selectedDate;
    }

    const validate = useCallback((event: React.SyntheticEvent<any, any> | React.MouseEvent | MouseEvent | Event) => {
        
        const selectedDate = getSelectedDate();
        
        const isMonday = selectedDate.day() ===1;
        const beforeDisabled = beforeDisabledDate();
        const isTooSoon = selectedDate.isBefore(beforeDisabled);
        console.debug('validating', selectedDate.format('dddd, MMM D, YYYY'), beforeDisabled.format('dddd, MMM D, YYYY'));
        if(isTooSoon) {
            event.preventDefault();
            event.stopPropagation();
            //alert('invalid day');
            console.debug('invalid date', 'isSoonerThanTwoDaysFromNow', selectedDate, beforeDisabled, selectedDate);
            setDateError(`Earliest pickup date is ${beforeDisabled.format('dddd, MMM D')}`);
        } else if(isMonday) {
            event.preventDefault();
            event.stopPropagation();
            //alert('invalid day');
            console.debug('invalid date', 'isMonday');
            setDateError('Mondays are unavailable.');
        }
         else {
            console.debug('valid date', selectedDate);
            setDateError(null);
        }
    }, [setDateError]);
    const handleClickOrSubmit = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>|MouseEvent | Event | React.FormEvent<HTMLInputElement>) => {
        validate(event);
    }, [validate]);
    useEffect(() => {
        if(submitButton && submitButton.current) {
            submitButton.current.addEventListener('click',  handleClickOrSubmit);
            submitButton.current.addEventListener('submit',  handleClickOrSubmit);
            submitButton.current.addEventListener('touch', handleClickOrSubmit);
            
        } 
        return () => {
            if(submitButton && submitButton.current) {
                submitButton.current.removeEventListener('click',  handleClickOrSubmit);
                submitButton.current.removeEventListener('submit',  handleClickOrSubmit);
                submitButton.current.removeEventListener('touch', handleClickOrSubmit);
                
            }       
        }
    },[handleClickOrSubmit]);
    
    useEffect(() => {
        if(dateError && fieldWrapper && fieldWrapper.current) {
             if(dateErrorElement.current) {
                dateErrorElement.current.innerText=dateError;
                dateErrorElement.current.className='field-error';
                fieldWrapper.current.insertBefore(dateErrorElement.current, fieldWrapper.current.childNodes[0])
                
             }
            
        } else if (!dateError && fieldWrapper && fieldWrapper.current && dateErrorElement.current) {
            dateErrorElement.current.innerText='';
            dateErrorElement.current.className='';
            
        }
    }, [dateError]);
    
  return (
      <>
    <Portal containerSelector=".form-item.fields.date.required" className="field">
    {/* <DayPickerInput 
    value={date}
    format={'dddd, MMM D, YYYY'}
    parseDate={(val, format) => {return dayjs(val).toDate()}}
    placeholder={'pickup date...'}
       onDayChange={day => onChange(day)} 
      dayPickerProps={{
        fromMonth: dayjs().toDate(),
        disabledDays: [{ daysOfWeek: [1]},{ before: beforeDisabledDate.toDate() }]
      }}
      
      
    /> */}
        </Portal>
        {/* <Portal containerSelector=".form-button-wrapper">
            <input className="button sqs-system-button sqs-editable-button" type="submit" value="Add To Cart" onClick={handleClick} onSubmit={handleSubmit}></input>
        </Portal> */}
        </>
    
  );
}
