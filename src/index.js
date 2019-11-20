require("babel-core/register");
require("babel-polyfill");
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from "~/components/App";
import './assets/css/global.css';
import configureStore from '~/store/configureStore';


const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);