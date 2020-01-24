// require("babel-core/register");
// require("babel-polyfill");
import React from 'react';
import {render} from 'react-dom';

import './assets/css/global.css';

import AppEntryPoint from "./components/App";


render(
    <AppEntryPoint />,
  document.getElementById('root')
);
