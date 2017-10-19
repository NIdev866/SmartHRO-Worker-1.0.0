import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {change} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';


const renderError = ({ input, meta: { error } }) => (
  <div style={{color: "red", fontSize: '14px', marginBottom: '25px'}}>
    {error ? <span>{error}</span> : ""}
  </div>
)


class PersonalDetailsComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      birthDate: null,
      birthDateFormatted: null,
    }
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }


  formatDate(date){
    return date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate()+1)).slice(-2);
  }
  handleBirthDateChange(event, date){
    this.setState({
      birthDate: date
    }, ()=>{
      this.setState({
        birthDateFormatted: this.formatDate(this.state.birthDate)
      }, ()=>{
        this.props.dispatch(change('personalDetails', 'dob', this.state.birthDateFormatted));
      })
    })
  }

  render(){
  	const { handleSubmit } = this.props;
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const houseFlatChooserStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative",
    }
    const houseStyle = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px"
    }
    const flatStyle = {
      display: "inline-block",
      width: "45px",
      marginLeft: "30px"
    }

    return(
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>

      <h3><u>{this.context.t('Personal Details')}</u></h3>

        <form onSubmit={handleSubmit}>
{/*            <div>
              <div style={{marginTop: '10px'}}>Birth date</div>
                <DatePicker
                  hintText="Birth date"
                  value={this.state.birthDate}
                  onChange={this.handleBirthDateChange}
                  formatDate={this.formatDate}
                  openToYearSelection={true}
                />
            </div>
            <Field name="dob" component={renderError} />*/}
        </form>

      </div>
    )
  }
}

PersonalDetailsComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

PersonalDetailsComponent = reduxForm({
  form: 'personalDetails',
  validate
})(
  connect(null, actions)(
    connect(state => ({
      lang: state.i18nState.lang
    }))(PersonalDetailsComponent)
  )
)


export default PersonalDetailsComponent
