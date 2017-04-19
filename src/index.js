import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import Contacts from './contacts'

ReactDOM.render(
  <App list={Contacts} tableHeaders={['', 'name', 'email', 'phone']}/>,
  document.getElementById('root')
);
