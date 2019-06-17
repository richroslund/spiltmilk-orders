import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DateSelector } from './DatePicker';
import { Portal } from './Portal';
import { OrderForm } from './OrderForm';

const App: React.FC = () => {
  return (
    <>
      <OrderForm />
    </>
  );
}

export default App;
