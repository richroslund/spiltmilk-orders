import React, { useEffect, useCallback } from 'react';
import logo from './logo.svg';
import { DateSelector } from './DatePicker';
import { Portal } from './Portal';
import { OrderForm } from './OrderForm';
import { useElementExists } from './useElementExists';




const App: React.FC = () => {

  const elementQuery = window.spiltmilkorders && window.spiltmilkorders.query ? window.spiltmilkorders.query : 'div[data-item-id=\'5ce59590c83025bb4337ee56\']';
  const saveButtonQuery = window.spiltmilkorders && window.spiltmilkorders.submitButtonQuery ? window.spiltmilkorders.submitButtonQuery : '.form-button-wrapper input.button[type=\'submit\']';
  const {exists, element, restart} = useElementExists<HTMLDivElement>(elementQuery, {maxAttempts: 10, interval: 250});
  const formElement = useElementExists<HTMLInputElement>(saveButtonQuery, {maxAttempts: 10, interval: 250});
  const onClick = useCallback(() => {
    formElement.restart();
  }, [formElement]);
  
  useEffect(() => {
    if(element&&element.current) {
      element.current.addEventListener('click', onClick);
      element.current.addEventListener('touch', onClick);
      return () => {
        if(element&&element.current) {
          element.current.removeEventListener('click', onClick);
          element.current.removeEventListener('touch', onClick);
        }
      }
    }
  }, [element]);
  useEffect(() => {if(exists===false) {
    console.log('couldnt find element via query:',elementQuery);
  }}, [exists]);
  return (
    <>
      {formElement.exists && <OrderForm />}
    </>
  );
}

export default App;
