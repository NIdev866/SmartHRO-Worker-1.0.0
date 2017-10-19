import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser, clearAuthError } from '../../actions';
import renderField from '../renderField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Dialog from 'material-ui/Dialog';
import loginSubmit from './loginSubmit'


class Signin extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(formProps) {
    this.props.signinUser(formProps)
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div style={{color: "red"}}>
          <strong>{this.context.t('Oops!')}</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  componentDidMount(){
    this.props.clearAuthError()
  }
  render() {
    let worker_id = localStorage.getItem('worker_id')

    const { handleSubmit } = this.props;
    return (
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <div style={{marginRight: "15px", marginLeft: "15px"}}>
          {this.props.authenticated ?
            <Redirect to={`${worker_id}/myprofile`} />
            :
            <Dialog
              style={{marginTop: "-200px"}}
              modal={true}
              overlayStyle={{opacity: "0.6"}}
              open={true}
            >
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="email"
                type="text"
                component={renderField}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label={this.context.t('Password')}
              />
              {this.renderAlert()}
              <RaisedButton
                type="submit"
                label={this.context.t('LOGIN')}
                primary={true}
              />
            </form>
          </Dialog>
          }
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }else if(formProps.email.length > 30) {
    errors.email = 'Input too long'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

Signin.contextTypes = {
  t: PropTypes.func.isRequired
}


export default reduxForm({
  form: 'signin',
  validate
})(
  connect(mapStateToProps, { signinUser, clearAuthError })(Signin)
);
