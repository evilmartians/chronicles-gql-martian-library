import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';
import Library from '../components/Library';
import UserInfo from '../components/UserInfo';

render(
  <Provider>
    <UserInfo />
    <Library />
  </Provider>,
  document.querySelector('#root')
);
