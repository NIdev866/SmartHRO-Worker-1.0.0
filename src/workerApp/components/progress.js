import React, { Component, PropTypes } from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import * as actions from '../../actions';
import { Redirect } from "react-router"

import {setLanguage} from 'redux-i18n'

class Progress extends Component{
  constructor(props) {
    super(props)
    this.languages = ['pl', 'en']
  }

  componentWillMount() {
    console.log(this.props.lang)
    this.props.dispatch(setLanguage('en'))
  }

  render(){


    const worker_id = localStorage.getItem('worker_id');

    const actions = [
    <Link to={`/${worker_id}/createprofile`}>
      <FlatButton
        label={this.context.t('Go to my profile')}
        primary={true}
      />
    </Link>
    ]


    if(!this.props.authenticated){
      return <Redirect to="/login"/>
    }
    else if(this.props.match.url !== `/${worker_id}/progress`){
      return <Redirect to={`/${worker_id}/progress`}/>
    }

    return(
      <div style={{maxWidth: "800px", margin: "0 auto"}}>
        <div>
          <Dialog
            style={{marginTop: "-120px"}}
            actions={actions}
            modal={true}
            overlayStyle={{opacity: "0.6"}}
            open={!this.props.bankDetailsSubmitted}
            onRequestClose={this.handleClose}
          >
            {this.context.t('You have to enter your details first')}
          </Dialog>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
          <div>PROGRESS HERE</div>
        </div>
      </div>
    )
  }
}

Progress.contextTypes = {
  t: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{
    bankDetailsSubmitted: state.main.bankDetailsSubmitted,
    authenticated: state.auth.authenticated

  }
}

export default connect(mapStateToProps, actions)(
  connect(state => ({
    lang: state.i18nState.lang
  }))(Progress)
);
