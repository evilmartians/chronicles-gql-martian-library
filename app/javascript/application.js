import React from 'react';
import { render } from 'react-dom';
import Library from './components/Library';
import AddItemForm from './components/AddItemForm';
import Provider from './components/Provider';
import UserInfo from './components/UserInfo/index';

render(
  <Provider>
    <UserInfo />
    <AddItemForm />
    <Library />
  </Provider>,
  document.querySelector('#root')
);
