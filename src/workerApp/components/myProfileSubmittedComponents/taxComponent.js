import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import { updateTaxDataOfWorker } from '../../../actions';
import {change, submit} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';




class renderError extends Component{
  render(){
    return(
      <div style={{color: "red", fontSize: '14px', marginBottom: '25px'}}>
        {this.props.meta.error && this.props.meta.error == "Birth date required" ? <span>{this.context.t('Birth date required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == 'Invalid NI number' ? <span>{this.context.t('Invalid NI number')}</span> : ""}
      </div>
    )
  }
}

renderError.contextTypes = {
  t: PropTypes.func.isRequired
}

class TaxComponent extends Component{
  constructor(props){
    super(props)
    this.NIonChange = this.NIonChange.bind(this)
    this.state = {
      'NI1':'',
      'NI2':'',
      'NI3':'',
      'NI4':'',
      'NI5':'',
      'NI6':'',
      'NI7':'',
      'NI8':'',
      'NI9':'',
      birthDate: null,
      birthDateFormatted: null,
    }
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }
  NIonChange(event) {
    event.target.value = event.target.value.toUpperCase()
    if (event.target.value.length === event.target.maxLength && event.target.id !== '10') {
      if (event.target.value.length === event.target.maxLength && event.target.id !== '9') {
        this.refs[parseInt(event.target.id, 10) + 1].focus();
      }
      let stateToChange = `NI${event.target.id}`
      this.setState({[stateToChange]: event.target.value}, ()=>{
        let allNInumbers = []
        for(let i = 0; i < 9; i++){
          allNInumbers.push(this.state[`NI${i+1}`])
        }
        let allNInumbersJoined = allNInumbers.join('')
        this.props.dispatch(change('taxDetails', 'ni_number', allNInumbersJoined))
      })
    }
  }
  NIfields(){
    let result = []
    let ref = 1
    for(let i = 0; i < 9; i++){
      let refStringified = ref.toString()
      if(i < 8){
        result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          maxLength='1' ref={refStringified} style={{width: '8%', marginRight: '8px'}}name=""
          onChange={this.NIonChange}/>)
      }
      else{
        result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          maxLength='1' ref={refStringified} style={{width: '8%', marginRight: '8px'}}name=""
            onBlur={(e) => {
              let allNInumbers = []
              for(let i = 0; i < 9; i++){
                allNInumbers.push(this.state[`NI${i+1}`])
              }
              let allNInumbersJoined = allNInumbers.join('')

              let bodyForUpdate = {
                ni_number: allNInumbersJoined,
                dob: this.personalDataOfWorkerCopy.dob,
              }
              this.props.updateTaxDataOfWorker(bodyForUpdate)
              this.closeAllEdits()
            }}
          onChange={this.NIonChange}/>)
      }
      ref++
    }
    return (
      <div>
      {result}
      <Field name="ni_number" component={renderError} />
    </div>)
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
              let bodyForUpdate = {
                ni_number: this.personalDataOfWorkerCopy.ni_number,
                dob: this.state.birthDateFormatted,
              }
              this.props.updateTaxDataOfWorker(bodyForUpdate)
              this.closeAllEdits()
            }
      )
    })
  }
  handleEdit(e,){
    e.preventDefault()
    console.log({e})
  }
  editNInumber(proxy){
    proxy.preventDefault()
    this.setState({editingNInumber: true})
  }
  editDob(proxy){
    proxy.preventDefault()
    this.setState({editingDob: true})
  }
  closeAllEdits(){
    this.setState({
      editingNInumber: false,
      editingDob: false
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
    const editButtonStyle = {
      minWidth: '41px', 
      height: '17px',
      fontSize: '15px',
      top: 0, 
      right: 0, 
      position: 'absolute', 
    }
    let personalDataOfWorkerCopy = {}
    if(this.props.personalDataOfWorker){
      this.personalDataOfWorkerCopy = {...this.props.personalDataOfWorker[0]}
    }
    return(
      <div style={{position: 'relative', width: '70%', height: '100%', margin: '0 auto'}}>
      <h3><u>{this.context.t('Tax')}</u></h3>
          <form onSubmit={handleSubmit}>
              <div>
                <div style={{textDecoration: 'underline'}}>{this.context.t('National Insurance number')}</div>
                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].ni_number && !this.state.editingNInumber ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{this.props.personalDataOfWorker[0].ni_number}</span>
                  <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editNInumber.bind(this)}/>
                  </div>
                  :
                  this.NIfields(this.personalDataOfWorkerCopy)
                }
              </div>


            <div style={{marginTop: '20px', textDecoration: 'underline'}}>{this.context.t('Birth date')}</div>


            {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].dob && !this.state.editingDob ?
              <div style={{textAlign: 'center', position: 'relative'}}><span>{this.props.personalDataOfWorker[0].dob.substring(0, this.props.personalDataOfWorker[0].dob.indexOf('T'))}</span>
                <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editDob.bind(this)}/>
              </div>
              :


              <div>
                  <DatePicker
                    value={this.state.birthDate}
                    onChange={this.handleBirthDateChange}
                    formatDate={this.formatDate}
                    openToYearSelection={true}
                  />
              </div>

            }


        </form>

      </div>
    )
  }
}

TaxComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

TaxComponent = reduxForm({
  form: 'taxDetails',
  validate,
})(
  connect(null)(
    connect(state => ({
      lang: state.i18nState.lang
    }))(TaxComponent)
  )
)

function mapStateToProps(state) {
  return {
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { updateTaxDataOfWorker })(TaxComponent)
