import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Nav from "./components/nav"
import Progress from "./components/progress"
import Contents from './contents'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import * as actions from '../actions';

import {setLanguage} from 'redux-i18n'

class WorkerParent extends Component {
  render(){
    return(
      <div>
        <Contents url={this.props.match.url} />
      </div>
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
  }))(WorkerParent)
);
