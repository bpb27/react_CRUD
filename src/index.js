import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';

// framework would make a get request and then call ReactDOM.render
var contacts = [
  {name: 'Brendan', email: 'brendan@hotmail.com', phone: '818-555-5555'},
  {name: 'Billy', email: 'billy@hotmail.com', phone: '8185555555'},
  {name: 'Bob', email: 'bob@hotmail.com', phone: '(818) 555-5555'},
  {name: 'Burt', email: 'burt@hotmail.com', phone: '818-555-5555'},
  {name: 'Bertrand', email: 'bertrand@hotmail.com', phone: '818-555-5555'}
];

ReactDOM.render(
  <App list={contacts} tableHeaders={['', 'name', 'email', 'phone']}/>,
  document.getElementById('root')
);
