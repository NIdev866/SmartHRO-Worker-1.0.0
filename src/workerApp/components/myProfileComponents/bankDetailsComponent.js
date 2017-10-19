import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector, hasSubmitSucceeded } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {change, submit} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import bankDetailsSubmit from "./submitActions/bankDetailsSubmit"
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem'

import CircularProgress from 'material-ui/CircularProgress';
import {startSubmit, stopSubmit} from 'redux-form';
import { bindActionCreators } from 'redux'



class renderError extends Component{
  render(){
    return(
      <div style={{color: "red", fontSize: '14px', marginBottom: '25px'}}>
        {this.props.meta.error && this.props.meta.error == "Full sortcode required" ? <span>{this.context.t('Full sortcode required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Bank account number required" ? <span>{this.context.t('Bank account number required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Invalid bank account number" ? <span>{this.context.t('Invalid bank account number')}</span> : ""}
      </div>
    )
  }
}

renderError.contextTypes = {
  t: PropTypes.func.isRequired
}






class LoadingIcon extends Component{
  render(){
    return(
      <div>
        <div>
        {this.props.meta.submitting &&
          <div style={{width: '125px', height: '25px', position: 'absolute', right: '30px', top: '10px'}}>
            Submitting... <CircularProgress size={20} />
          </div>
        }
      </div>
      <div>
        {this.props.submitSucceeded && !this.props.meta.submitting &&
          <div style={{width: '165px', height: '25px', position: 'absolute', right: '30px', top: '10px', color: 'green'}}>
            Submit succeeded <i className="material-icons">done</i>
          </div>
        }
      </div>
      </div>
    )
  }
}

LoadingIcon = connect(
  state => ({
    submitSucceeded: hasSubmitSucceeded('bankDetails')(state),
  })
)(LoadingIcon)









class BankDetailsComponent extends Component{
  constructor(props){
    super(props)
    this.sortcodeOnChange = this.sortcodeOnChange.bind(this)
    this.bankAccountNumberOnChange = this.bankAccountNumberOnChange.bind(this)
    this.state = {
      'sortcode11':'',
      'sortcode12':'',
      'sortcode13':'',
      'bank_account_number31':'',
      'bank_account_number32':'',
      'bank_account_number33':'',
      'bank_account_number34':'',
      'bank_account_number35':'',
      'bank_account_number36':'',
      'bank_account_number37':'',
      'bank_account_number38':'',
    }
  }
  sortcodeOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    if (event.target.value.length === event.target.maxLength && event.target.id !== '14') {
      if (event.target.value.length === event.target.maxLength && event.target.id !== '13') {
        this.refs[parseInt(event.target.id, 10) + 1].focus();
      }
      let stateToChange = `sortcode${event.target.id}`
      this.setState({[stateToChange]: event.target.value}, ()=>{
        let allSortocodeBoxes = []
        for(let i = 10; i < 13; i++){
          allSortocodeBoxes.push(this.state[`sortcode${i+1}`])
        }
        let allSortocodeBoxesJoined = allSortocodeBoxes.join('')
        this.props.dispatch(change('bankDetails', 'sort_code', allSortocodeBoxesJoined))
      })
    }
  }
  sortcodeFields(){
    let result = []
    let ref = 11
    for(let i = 10; i < 13; i++){
      let refStringified = ref.toString()
      if(i < 12){
        result.push(
          <span>
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
              onBlur={() => this.props.dispatch(submit('bankDetails'))}
          maxLength='2' ref={refStringified} style={{width: '12%', marginRight: '0px'}}name=""
          onChange={this.sortcodeOnChange}/>
            &mdash;
          </span>
        )
      }
      else{
        result.push(
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
              onBlur={() => this.props.dispatch(submit('bankDetails'))}
          maxLength='2' ref={refStringified} style={{width: '12%', marginRight: '0px'}}name=""
          onChange={this.sortcodeOnChange}/>
        )
      }
      ref++
    }
    return <div>{result}</div>
  }
  bankAccountNumberOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    if (event.target.value.length === event.target.maxLength && event.target.id !== '39') {
      if (event.target.value.length === event.target.maxLength && event.target.id !== '38') {
        this.refs[parseInt(event.target.id, 10) + 1].focus();
      }
      let stateToChange = `bank_account_number${event.target.id}`
      this.setState({[stateToChange]: event.target.value}, ()=>{
        let allBank_account_numbers = []
        for(let i = 30; i < 38; i++){
          allBank_account_numbers.push(this.state[`bank_account_number${i+1}`])
        }
        let allBank_account_numbersJoined = allBank_account_numbers.join('')
        this.props.dispatch(change('bankDetails', 'acc_no', allBank_account_numbersJoined))
      })
    }
  }
  bankAccountNumberFields(){
    let result = []
    let ref = 31
    for(let i = 30; i < 38; i++){
      let refStringified = ref.toString()
      result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
              onBlur={() => this.props.dispatch(submit('bankDetails'))}
        maxLength='1' ref={refStringified} style={{width: '9%', marginRight: '8px'}}name=""
        onChange={this.bankAccountNumberOnChange}/>)
      ref++
    }
    return <div>{result}</div>
  }



  handleSubmit(e) {
      e.preventDefault();
      this.props.setSubmittingState('bankDetails', true);
      this.props.actions.submitForm()
          .then((response) => {
              this.props.setSubmittingState('bankDetails', false);
              console.log('FINISHEDDDDD')
          })
          .catch((e)=>console.log(e))
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

      <h3><u>{this.context.t('Bank Details')}</u></h3>

        <form handleSubmit={this.handleSubmit.bind(this)}   >
          <div style={{marginTop: '15px', marginBottom: '-4px'}}>

        <Field name="loadingIcon" component={LoadingIcon} />


            <div>sortcode</div>
              {this.sortcodeFields()}
          </div>
          <Field name="sort_code" component={renderError} />
          <div>
            <div>Bank account number</div>
              {this.bankAccountNumberFields()}
          </div>
          <Field name="acc_no" component={renderError} />
        </form>

      </div>
    )
  }
}

BankDetailsComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

BankDetailsComponent = reduxForm({
  form: 'bankDetails',
  validate,
  onSubmit: bankDetailsSubmit
})(
  connect(state => ({
    lang: state.i18nState.lang
  }))(BankDetailsComponent)
)

BankDetailsComponent = connect(
  state => ({
    submitSucceeded: hasSubmitSucceeded('bankDetails')(state),
  })
)(BankDetailsComponent)


function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators(actions, dispatch),
        setSubmittingState: (form, isSubmitting) => {
            if (isSubmitting === true) {
                dispatch(startSubmit(form))
            } else if (isSubmitting === false) {
                dispatch(stopSubmit(form))
            }
        }
    })
}

export default connect(null, mapDispatchToProps)(BankDetailsComponent)
