import './style/style.css';
import React, { Component, PropTypes } from 'react';
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
import Nav from "./workerApp/Nav"

import {setLanguage} from 'redux-i18n'

import { connect } from 'react-redux';
import * as actions from './actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));


  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch({ type: AUTH_USER });
  }





class App extends Component {
  constructor(props) {
    super(props)
    this.languages = ['pl', 'en']
  }

  componentWillMount() {
    this.props.dispatch(setLanguage('en'))
  }


  onChangeLang = (e) => {
    this.props.dispatch(setLanguage(e.target.value))
  }


  render() {
    return (
      <Provider store={this.props.store}>
        <I18n translations={translations}>
          <MuiThemeProvider>
            <BrowserRouter>
              <div>
                <Nav onChangeLang={this.onChangeLang} languages={this.languages} />
                  <Switch>
                    <Route path='/:worker_id/signup' component={SignupComponent} />
                    <Route path="/:worker_id/jobs" component={RequireAuth(Jobs)}/>
                    <Route path="/:worker_id/progress" component={RequireAuth(Progress)}/>
                    <Route path="/:worker_id/createprofile" component={RequireAuth(CreateProfile)}/>
                    <Route path="/:worker_id/myprofile" component={RequireAuth(MyProfile)}/>
                    <Route path='/login' component={Signin} />
                    <Redirect from='/' to='/login'/>
                  </Switch>
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
        </I18n>
      </Provider>
    )
  }
}

function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated,
  }
}

WorkerParent.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(
  connect(state => ({
    lang: state.i18nState.lang
  }))(App)
);
