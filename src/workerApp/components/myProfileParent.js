import React, { Component } from "react"
import Paper from 'material-ui/Paper';
import AddressComponent from './myProfileSubmittedComponents/addressComponent'
import BankDetailsComponent from './myProfileSubmittedComponents/bankDetailsComponent'
import TaxComponent from './myProfileSubmittedComponents/taxComponent'
import PersonalDetailsComponent from './myProfileSubmittedComponents/personalDetailsComponent'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { fetchPersonalDataOfWorker } from '../../actions'


class MyProfileParent extends Component{


  constructor(props){
    super(props)

    this.state = {
      width: '0'
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth});
  }




componentWillMount(){
  this.props.fetchPersonalDataOfWorker()
}

  render(){

    let cardStyle = {
      margin: '10px 20px',
      textAlign: 'center',
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden'
    }

    let windowStyle = {
      margin: '0', 
      width: '100vw', 
      height: 'calc(100vh - 45px'
    }

    if(this.state.width > 900){
      cardStyle = {
        ...cardStyle,
        height: 'calc(50vh - 45px)',
        width: "calc(50% - 40px)",
      }
      windowStyle = {
        ...windowStyle,
        overflow: 'hidden', 
      }
    }
    if(this.state.width <= 900 && this.state.width > 550){
      cardStyle = {
        ...cardStyle,
        height: '350px',
        width: "500px",
      }
    }
    if(this.state.width <= 550){
      cardStyle = {
        ...cardStyle,
        height: '350px',
        width: 'calc(' + this.state.width + 'px - 60px)',
      }
    }



    return(
      <div style={windowStyle}>

        {!this.props.authenticated ?
          <Redirect to="/login"/>
          :
          <div>
          <div>
            <Paper style={cardStyle} zDepth={2} rounded={false}>
              <PersonalDetailsComponent />
            </Paper>
            <Paper style={cardStyle} zDepth={2} rounded={false}>
              <AddressComponent />
            </Paper>
          </div>
          <div>
            <Paper style={cardStyle} zDepth={2} rounded={false}>
              <BankDetailsComponent />
            </Paper>
            <Paper style={cardStyle} zDepth={2} rounded={false}>
              <TaxComponent />
            </Paper>
          </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { fetchPersonalDataOfWorker })(MyProfileParent)
