import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector, change, submit } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import { updateAddressDataOfWorker } from '../../../actions';
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';



class MyTextField extends Component{
  render(){
    return(
      <TextField inputStyle={{textAlign: 'left'}} type="text"

        maxLength='70' style={{width: '50%', marginRight: '0px'}}
        {...this.props.input}
      />
    )
  }
}

class HouseChosen extends Component{
  render(){
    return(
      <div>
        <div style={{marginTop: '15px', marginBottom: '-4px'}}>
        <div>{this.props.context.t('House number')}</div>
        <TextField inputStyle={{textAlign: 'center'}} type="text"
          onBlur={(e) => {
            let bodyForUpdate = {
              address_road1: this.props.personalDataOfWorkerCopy.address_road1,
              address_road2: this.props.personalDataOfWorkerCopy.address_road2,
              address_road3: this.props.personalDataOfWorkerCopy.address_road3,
              postal_code: this.props.personalDataOfWorkerCopy.postal_code,
              house_no: e.target.value,
              flat_no: this.props.personalDataOfWorkerCopy.flat_no,
              town: this.props.personalDataOfWorkerCopy.town,
              county: this.props.personalDataOfWorkerCopy.county,
            }
            this.props.updateAddressDataOfWorker(bodyForUpdate)
            this.props.closeAllEdits()
          }}
          maxLength='5' style={{width: '15%', marginRight: '0px'}}
        />
        </div>
      </div>

    )
  }
}
  
class FlatChosen extends Component{
  render(){
    return(
      <div>
        <div style={{marginTop: '15px', marginBottom: '-4px'}}>
        <div>{this.props.context.t('Flat number')}</div>
        <TextField inputStyle={{textAlign: 'center'}} type="text"
          onBlur={(e) => {
            let bodyForUpdate = {
              address_road1: this.props.personalDataOfWorkerCopy.address_road1,
              address_road2: this.props.personalDataOfWorkerCopy.address_road2,
              address_road3: this.props.personalDataOfWorkerCopy.address_road3,
              postal_code: this.props.personalDataOfWorkerCopy.postal_code,
              house_no: this.props.personalDataOfWorkerCopy.house_no,
              flat_no: e.target.value,
              town: this.props.personalDataOfWorkerCopy.town,
              county: this.props.personalDataOfWorkerCopy.county,
            }
            this.props.updateAddressDataOfWorker(bodyForUpdate)
            this.props.closeAllEdits()
          }}
          maxLength='5' style={{width: '15%', marginRight: '0px'}}
        />
        </div>
      </div>

    )
  }
}

class renderError extends Component{
  render(){
    return(
      <div style={{color: "red", fontSize: '14px', marginBottom: '25px'}}>
        {this.props.meta.error && this.props.meta.error == "Address line 1 required" ? <span>{this.context.t('Address line 1 required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Postal code required" ? <span>{this.context.t('Postal code required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "House or flat required" ? <span>{this.context.t('House or flat required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "House number required" ? <span>{this.context.t('House number required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Flat number required" ? <span>{this.context.t('Flat number required')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Address line too long" ? <span>{this.context.t('Address line too long')}</span> : ""}
        {this.props.meta.error && this.props.meta.error == "Invalid Address" ? <span>{this.context.t('Invalid Address')}</span> : ""}
      </div>
    )
  }
}

renderError.contextTypes = {
  t: PropTypes.func.isRequired
}

class AddressComponent extends Component{
  constructor(props){
    super(props)
    this.postal_codeOnChange = this.postal_codeOnChange.bind(this)
    this.state = {
      'postal_code21':'',
      'postal_code22':'',
    }
    this.closeAllEdits = this.closeAllEdits.bind(this)
  }
  postal_codeOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    let stateToChange = `postal_code${event.target.id}`
    this.setState({[stateToChange]: event.target.value}, ()=>{
      let allPostal_codeBoxes = []
      for(let i = 20; i < 22; i++){
        allPostal_codeBoxes.push(this.state[`postal_code${i+1}`])
      }
      let allPostal_codeBoxesJoined = allPostal_codeBoxes.join('')
      this.props.dispatch(change('addressDetails', 'postal_code', allPostal_codeBoxesJoined))
    })
  }
  postal_codeFields(personalDataOfWorkerCopy){
    let result = []
    let ref = 21
    for(let i = 20; i < 22; i++){
      let refStringified = ref.toString()
      if(i < 21){
        result.push(
          <span>
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
            &mdash;
          </span>
        )
      }
      else{
        result.push(
          <TextField
            id={refStringified}
            inputStyle={{textAlign: 'center'}} type="text"
            onBlur={(e) => {
              let allPostal_codeBoxes = []
              for(let i = 20; i < 22; i++){
                allPostal_codeBoxes.push(this.state[`postal_code${i+1}`])
              }
              let allPostal_codeBoxesJoined = allPostal_codeBoxes.join('')
              let bodyForUpdate = {
                address_road1: personalDataOfWorkerCopy.address_road1,
                address_road2: personalDataOfWorkerCopy.address_road2,
                address_road3: personalDataOfWorkerCopy.address_road3,
                postal_code: allPostal_codeBoxesJoined,
                house_no: personalDataOfWorkerCopy.house_no,
                flat_no: personalDataOfWorkerCopy.flat_no,
                town: personalDataOfWorkerCopy.town,
                county: personalDataOfWorkerCopy.county,
              }
              this.props.updateAddressDataOfWorker(bodyForUpdate)
              this.closeAllEdits()
            }}
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
        )
      }
      ref++
    }
    return <div>
      {result}
      <Field name="postal_code" component={renderError} />
    </div>
  }
  handleSubmit(e) {
      e.preventDefault();
      this.props.setSubmittingState('addressDetails', true);
      this.props.actions.submitForm()
          .then((response) => {
              this.props.setSubmittingState('addressDetails', false);
              console.log('FINISHEDDDDD')
          })
          .catch((e)=>console.log(e))
  }
  editAddress1(proxy){
    proxy.preventDefault()
    this.setState({editingAddress1: true})
  }
  editAddress2(proxy){
    proxy.preventDefault()
    this.setState({editingAddress2: true})
  }
  editAddress3(proxy){
    proxy.preventDefault()
    this.setState({editingAddress3: true})
  }
  editPostalCode(proxy){
    proxy.preventDefault()
    this.setState({editingPostalCode: true})
  }
  editHouseNo(proxy){
    proxy.preventDefault()

    this.setState({editingHouseFlatNo: true})
  }
  editTown(proxy){
    proxy.preventDefault()
    this.setState({editingTown: true})
  }
  editCounty(proxy){
    proxy.preventDefault()
    this.setState({editingCounty: true})
  }
  closeAllEdits(){
    this.setState({
      editingAddress1: false,
      editingAddress2: false,
      editingAddress3: false,
      editingPostalCode: false,
      editingHouseFlatNo: false,
      editingTown: false,
      editingCounty: false
    })
  }
  render(){
  	const { handleSubmit } = this.props;
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "100%",
      marginTop: "30px",
    }
    const houseFlatChooserStyle = {
      display: "inline-block",
      width: "100%",
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


    let houseOrFlatNumExists = false
    let IfHouseThenHouseIfFlatThenFlat = ''
    let personalDataOfWorkerCopy = {}
    if(this.props.personalDataOfWorker){
      personalDataOfWorkerCopy = {...this.props.personalDataOfWorker[0]}
      if(this.props.personalDataOfWorker[0].house_no || this.props.personalDataOfWorker[0].flat_no){
        houseOrFlatNumExists = true
        if(this.props.personalDataOfWorker[0].house_no){
          IfHouseThenHouseIfFlatThenFlat = this.context.t('House no: ')
        }
        else if(this.props.personalDataOfWorker[0].flat_no){
          IfHouseThenHouseIfFlatThenFlat = this.context.t('Flat no: ')
        }
      }
    }
    return(
      <div style={{position: 'absolute', width: '100%', height: '100%', padding: 0}}>
        <div style={{height: '30px', margin: 0}}>
        <h3 style={{margin: 0, padding: 0, paddingTop: '10px'}}><u>{this.context.t('Address')}</u></h3>
        </div>
        <div style={{position: 'relative', display: 'inline-block', width: '100%', height: 'calc(100% - 30px)'}}>
          <form handleSubmit={this.handleSubmit.bind(this)}>
            <div style={{float: 'left', width: '50%', height: '100%', }}>
              <div>
                <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('Address line 1')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road1 && !this.state.editingAddress1 ?
                  <div style={{textAlign: 'center', position: 'relative'}}>
                    <span>
                      {personalDataOfWorkerCopy.address_road1}
                    </span>
                      <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editAddress1.bind(this)}/>
                  </div>
                  :
                  <div>
                    <Field
                      onBlur={(e) => {
                        let bodyForUpdate = {
                          address_road1: e.target.value,
                          address_road2: personalDataOfWorkerCopy.address_road2,
                          address_road3: personalDataOfWorkerCopy.address_road3,
                          postal_code: personalDataOfWorkerCopy.postal_code,
                          house_no: personalDataOfWorkerCopy.house_no,
                          flat_no: personalDataOfWorkerCopy.flat_no,
                          town: personalDataOfWorkerCopy.town,
                          county: personalDataOfWorkerCopy.county,
                        }
                        this.props.updateAddressDataOfWorker(bodyForUpdate)
                        this.closeAllEdits()
                        this.props.dispatch(submit('addressDetails'))
                      }}
                      name="address_road1"
                      type="text"
                      component={MyTextField}
                    />
                    <Field name="address_road1" component={renderError} />
                  </div>
                }
              </div>
              <div>
                <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('Address line 2')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road2 && !this.state.editingAddress2 ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{personalDataOfWorkerCopy.address_road2}</span>
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editAddress2.bind(this)}/>
                  </div>
                  :
                  <div>
                    <Field
                      onBlur={(e) => {
                        let bodyForUpdate = {
                          address_road1: personalDataOfWorkerCopy.address_road1,
                          address_road2: e.target.value,
                          address_road3: personalDataOfWorkerCopy.address_road3,
                          postal_code: personalDataOfWorkerCopy.postal_code,
                          house_no: personalDataOfWorkerCopy.house_no,
                          flat_no: personalDataOfWorkerCopy.flat_no,
                          town: personalDataOfWorkerCopy.town,
                          county: personalDataOfWorkerCopy.county,
                        }
                        this.props.updateAddressDataOfWorker(bodyForUpdate)
                        this.closeAllEdits()
                        this.props.dispatch(submit('addressDetails'))
                      }}
                      name="address_road2"
                      type="text"
                      component={MyTextField}
                    />
                    <Field name="address_road2" component={renderError} />
                  </div>
                }
              </div>
              <div>
                <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('Address line 3')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road3 && !this.state.editingAddress3 ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{personalDataOfWorkerCopy.address_road3}</span>
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editAddress3.bind(this)}/>
                  </div>
                  :
                  <div>
                    <Field
                      onBlur={(e) => {
                        let bodyForUpdate = {
                          address_road1: personalDataOfWorkerCopy.address_road1,
                          address_road2: personalDataOfWorkerCopy.address_road2,
                          address_road3: e.target.value,
                          postal_code: personalDataOfWorkerCopy.postal_code,
                          house_no: personalDataOfWorkerCopy.house_no,
                          flat_no: personalDataOfWorkerCopy.flat_no,
                          town: personalDataOfWorkerCopy.town,
                          county: personalDataOfWorkerCopy.county,
                        }
                        this.props.updateAddressDataOfWorker(bodyForUpdate)
                        this.closeAllEdits()
                        this.props.dispatch(submit('addressDetails'))
                      }}
                      name="address_road3"
                      type="text"
                      component={MyTextField}
                    />
                    <Field name="address_road3" component={renderError} />
                  </div>
                }
              </div>
              <div style={{marginTop: '15px', marginBottom: '-4px'}}>
                <div style={{textDecoration: 'underline'}}>{this.context.t('Postal code')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.postal_code && !this.state.editingPostalCode ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{personalDataOfWorkerCopy.postal_code}</span>
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editPostalCode.bind(this)}/>
                  </div>
                  :
                  this.postal_codeFields(personalDataOfWorkerCopy)
                }
              </div>
            </div>
            <div style={{float: 'right', width: 'calc(50% - 10px)', height: '100%', paddingRight: '10px'}}>
              {personalDataOfWorkerCopy && houseOrFlatNumExists && !this.state.editingHouseFlatNo ?
                <div>
                  <div><div style={{textDecoration: 'underline'}}>{IfHouseThenHouseIfFlatThenFlat}</div>
                    <div style={{position: 'relative'}}>
                      {personalDataOfWorkerCopy.house_no ? personalDataOfWorkerCopy.house_no : personalDataOfWorkerCopy.flat_no}
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editHouseNo.bind(this)}/>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div style={{marginBottom: "-30px", textDecoration: 'underline'}}>{this.context.t('Do you live in a house or a flat?')}</div>
                  <div style={radiosParentDiv}>



                    <RadioButtonGroup name="house_or_flat" 
                      style={houseFlatChooserStyle} 
                      onChange={(event, value)=>{this.setState({house_or_flat: value})}}
                    >



                      <RadioButton disableTouchRipple style={houseStyle} value='house'/>
                      <RadioButton disableTouchRipple style={flatStyle} value='flat'/>
                    </RadioButtonGroup>
                    <div style={{...houseFlatChooserStyle, marginLeft: "-10px"}}>
                      <span style={{marginRight: "72px"}}>{this.context.t('House')}</span><span>{this.context.t('Flat')}</span>
                    </div>
                    <div>
                      {this.state.house_or_flat == 'house' &&
                        <HouseChosen
                          closeAllEdits={this.closeAllEdits}
                          dispatch={this.props.dispatch}
                          context={this.context}
                          updateAddressDataOfWorker={this.props.updateAddressDataOfWorker}
                          personalDataOfWorkerCopy={personalDataOfWorkerCopy}
                        />
                      }
                    </div>
                    <div>
                      {this.state.house_or_flat == 'flat' &&
                        <FlatChosen
                          closeAllEdits={this.closeAllEdits}
                          dispatch={this.props.dispatch}
                          context={this.context}
                          updateAddressDataOfWorker={this.props.updateAddressDataOfWorker}
                          personalDataOfWorkerCopy={personalDataOfWorkerCopy}
                        />
                      }
                    </div>
                  </div>
                </div>
              }
              <div>
                <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('Town')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.town && !this.state.editingTown ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{personalDataOfWorkerCopy.town}</span>
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editTown.bind(this)}/>
                  </div>
                  :
                  <div>
                    <Field
                      onBlur={(e) => {
                        let bodyForUpdate = {
                          address_road1: personalDataOfWorkerCopy.address_road1,
                          address_road2: personalDataOfWorkerCopy.address_road2,
                          address_road3: personalDataOfWorkerCopy.address_road3,
                          postal_code: personalDataOfWorkerCopy.postal_code,
                          house_no: personalDataOfWorkerCopy.house_no,
                          flat_no: personalDataOfWorkerCopy.flat_no,
                          town: e.target.value,
                          county: personalDataOfWorkerCopy.county,
                        }
                        this.props.updateAddressDataOfWorker(bodyForUpdate)
                        this.closeAllEdits()
                      }}
                      name="town"
                      type="text"
                      component={MyTextField}
                    />
                    <Field name="town" component={renderError} />
                  </div>
                }
              </div>
              <div>
                <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('County')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.county && !this.state.editingCounty ?
                  <div style={{textAlign: 'center', position: 'relative'}}><span>{personalDataOfWorkerCopy.county}</span>
                    <RaisedButton label='EDIT' style={editButtonStyle} primary={true} onClick={this.editCounty.bind(this)}/>
                  </div>
                  :
                  <div>
                    <Field
                      onBlur={(e) => {
                        let bodyForUpdate = {
                          address_road1: personalDataOfWorkerCopy.address_road1,
                          address_road2: personalDataOfWorkerCopy.address_road2,
                          address_road3: personalDataOfWorkerCopy.address_road3,
                          postal_code: personalDataOfWorkerCopy.postal_code,
                          house_no: personalDataOfWorkerCopy.house_no,
                          flat_no: personalDataOfWorkerCopy.flat_no,
                          town: personalDataOfWorkerCopy.town,
                          county: e.target.value,
                        }
                        this.props.updateAddressDataOfWorker(bodyForUpdate)
                        this.closeAllEdits()
                      }}
                      name="county"
                      type="text"
                      component={MyTextField}
                    />
                    <Field name="county" component={renderError} />
                  </div>
              }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

AddressComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

AddressComponent = reduxForm({
  form: 'addressDetails',
  validate,
})(AddressComponent)

const selector = formValueSelector('addressDetails') // <-- same as form name
AddressComponent = connect(
  state => {
    const house_or_flat = selector(state, 'house_or_flat')
    return {
      house_or_flat
    }
  }
)(
  connect(state => ({
    lang: state.i18nState.lang
  }))(AddressComponent)
)

function mapStateToProps(state) {
  return {
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { updateAddressDataOfWorker })(AddressComponent)