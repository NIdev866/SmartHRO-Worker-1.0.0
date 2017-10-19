import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router"

export default function(ComposedComponent) {

  class Authentication extends Component {
    
    componentWillMount() {
      console.log(this.props.authenticated)
      if (!this.props.authenticated) {
        return(
        <div>
          <Redirect to="/login"/>
        </div>
        )
      }
    }
    
    componentWillReceiveProps(nextProps) {
      console.log(this.props.authenticated)
      if (!nextProps.authenticated) {
                return(
        <div>
          <Redirect to="/login"/>
        </div>
        )
      }
    }
    
    render() {

      return <ComposedComponent {...this.props} />;
    }
  }
  
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  
  return connect(mapStateToProps)(Authentication);
}
