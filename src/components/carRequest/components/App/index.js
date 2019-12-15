import React, {Fragment} from 'react';
import {ToastContainer} from 'react-toastify';
import RequestPage from '../RequestPage';
import Header from '../common/Header';
import Notify from '~/components/carRequest/components/Notify';


// import 'react-dadata/dist/react-dadata.css';

const App = () => (
  <Fragment>
    <Header>
    <Notify />
    </Header>
    <RequestPage />
    <ToastContainer />
  </Fragment>
);

// Определяем ширину скроллбара и присваем ее в window.scrollWidth
const div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';
div.style.visibility = 'hidden';
document.body.appendChild(div);
window.scrollWidth = div.offsetWidth - div.clientWidth;
document.body.removeChild(div);

const root = document.querySelector('#root');
root.style.height = `${window.innerHeight}px`;
window.addEventListener('resize', () => {
  root.style.height = `${window.innerHeight}px`;
});

export default App;
