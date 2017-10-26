import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import * as actions from '../../actions';
import renderField from '../renderField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'


import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';


class SignupComponent extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount(){
    this.props.dispatch(change('signup', 'jobseeker_id', this.props.match.params.worker_id))
    this.props.clearAuthError()
  }
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
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


  render() {

    let worker_id = localStorage.getItem('worker_id')

    const { handleSubmit } = this.props;
    return (
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
          <div style={{marginRight: "15px", marginLeft: "15px"}}>
            {this.props.authenticated ?
              <Redirect to={`createprofile`} />
              :
              <Dialog
                style={{marginTop: "-200px"}}
                modal={true}
                overlayStyle={{opacity: "0.6"}}
                open={true}
              >
              <div>
                {!this.props.signingUpUser && !this.props.signingUpSuccessful &&
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
                    <Field
                      name="confirm_password"
                      type="password"
                      component={renderField}
                      label={this.context.t('Confirm Password')}
                    />

                    <RaisedButton
                      type="submit"
                      label={this.context.t('SIGN UP')}
                      primary={true}
                    />
                  </form>
                }
              </div>
              <div>
                {this.props.signingUpUser && 
                  <div style={{height: '100px'}}>
                    <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
                      Signing up...
                    </div>
                    <div style={{width: '49%', display: 'inline-block'}}>
                      <CircularProgress size={80}  thickness={7}/>
                    </div>
                  </div>
                }
              </div>
              <div>
                {this.props.signingUpSuccessful && 
                  <div style={{height: '100px'}}>
                    <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
                      Your password has been successfully created. Now just fill in your details (you can do it later)
                    </div>
                    <div>
                      <FlatButton
                        label="Now"
                        onClick={()=> this.props.confirmedToCreateProfileAfterSignup()}
                      />
                    </div>
                  </div>
                }
              </div>
            </Dialog>
            }
          </div>
      </div>

    )//return
  }//render
}//compo

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
  }else if (formProps.password !== formProps.confirm_password) {
    errors.confirm_password = 'Passwords don\'t match'
  }else if(!formProps.password) {
    errors.confirm_password = ''}
  if(errors.password === "Required" && errors.confirm_password === "Passwords don\'t match"){
    errors.confirm_password = ""
  }

  return errors;
}



SignupComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    signingUpUser: state.main.signingUpUser,
    signingUpSuccessful: state.main.signingUpSuccessful
  };
}


export default reduxForm({
  form: 'signup',
  validate
})(
  connect(mapStateToProps, actions )(SignupComponent)
);
