import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();