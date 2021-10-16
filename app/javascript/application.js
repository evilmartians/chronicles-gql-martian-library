import React from 'react';
import { render } from 'react-dom';
import Library from './components/Library';
import Provider from './components/Provider';

render(
  <Provider>
    <Library />
  </Provider>,
  document.querySelector('#root')
);
