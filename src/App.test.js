import React from 'react';
import ReactDOM from 'react-dom';
import {App, ContactInfo, EditableInfo, StaticInfo} from './App';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App
    list={[]}
    tableHeaders={[]}
  />, div);
});

it('ContactInfo renders without crashing', () => {
  const table = document.createElement('tbody');
  ReactDOM.render(<ContactInfo
    info={{}}
    key={0}
    num={0}
    remove={() => null}
    update={() => null}
  />, table);
});

it('EditableInfo renders without crashing', () => {
  const table = document.createElement('tbody');
  ReactDOM.render(<EditableInfo
    info={{}}
    num={0}
    toggleIsEditing={() => null}
    updateAndClose={() => null}
  />, table);
});

it('StaticInfo renders without crashing', () => {
  const table = document.createElement('tbody');
  ReactDOM.render(<StaticInfo
    info={{}}
    num={0}
    toggleIsEditing={() => null}
    remove={() => null}
  />, table);
});
