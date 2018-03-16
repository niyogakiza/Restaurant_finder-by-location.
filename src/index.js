import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';
import { Provider } from 'react-redux';

const store = config();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();


// // ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>,
//     document.getElementById('root'));


