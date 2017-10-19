import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect, withRouter } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin'
import Progress from "./workerApp/components/progress"
import CreateProfile from "./workerApp/components/createProfileParent"

import MyProfile from './workerApp/components/myProfileParent'

import Jobs from "./workerApp/components/jobs"
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import WorkerParent from "./workerApp/workerParent"
import Signin from './workerApp/auth/signin'
import SignupComponent from './workerApp/signup/signupComponent'
import RequireAuth from './workerApp/auth/require_auth'


import I18n from "redux-i18n"

import {translations} from "./translations"

import App from './app'

import Nav from "./workerApp/Nav"


injectTapEventPlugin();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));


  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch({ type: AUTH_USER });
  }



ReactDOM.render(
    <App store={store}/>,
  document.getElementById('root')
);


  //
