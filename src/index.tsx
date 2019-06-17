import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById(''));
//const container = document.querySelector('.form-item.fields.date.required');
const container = document.createElement('div')
document.getElementsByTagName('body')[0].appendChild(container);
if(container) {
    ReactDOM.render(<App />, container);
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
