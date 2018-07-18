import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider>
    <App />,
    document.getElementById('app')
  <Provider />
);
