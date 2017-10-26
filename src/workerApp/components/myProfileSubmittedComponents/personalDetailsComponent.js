import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';



import Cropper from 'react-crop';

import "babel-core/register";
import "babel-polyfill";








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



      image: null,
      previewImage: null
    }
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this)
    this.formatDate = this.formatDate.bind(this)

    this.onPictureSelection = this.onPictureSelection.bind(this)
    this.crop = this.crop.bind(this)
    this.clear = this.clear.bind(this)
  }



  onPictureSelection(evt) {
        this.setState({
            image: evt.target.files[0]
        }, ()=>{
          console.log(this.state.image)
        })
    }

  async crop() {
    let image = await this.refs.crop.cropImage()


    this.props.dispatch(change('personalDetails', 'pic_url', this.state.image));


    this.setState({
        previewUrl: window.URL.createObjectURL(image),
        image: null
    })
  }

  clear() {
      this.refs.file.value = null
      this.setState({
          previewUrl: null,
          image: null
      })
  }
 
  imageLoaded(img) {
      if (img.naturalWidth && img.naturalWidth < 262 &&
          img.naturalHeight && img.naturalHeight < 147) {
          this.crop()
      }
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
    let personalDataOfWorkerCopy = {}
    if(this.props.personalDataOfWorker){
      personalDataOfWorkerCopy = {...this.props.personalDataOfWorker[0]}
    }



    if(this.props.pic_url){
      console.log({pic_url: this.props.pic_url})
    }
    else{
      console.log('no pic url')
    }

    let raisedButtonStyle = {      
      minWidth: '41px', 
      height: '17px',
      fontSize: '15px',
    }


    return(
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <h3><u>{this.context.t('Personal Details')}</u></h3>
        <form onSubmit={handleSubmit}>
          <div style={{float: 'left', width: '55%', height: '220px'}}>

                {!this.state.image && !this.state.previewUrl &&
                  <img height="200" width="200" src="https://mcmprodaaas.s3.amazonaws.com/s3fs-public/styles/adaptive/public/profile-placeholder.png?itok=FCDqaoiV"/>
                }
 
                {this.state.image &&
                  <div>
                    <div style={{height: '200px', overflow: 'hidden'}}>
                      <Cropper
                          ref='crop'
                          image={this.state.image}
                          width={200}
                          height={200}
                          onImageLoaded={this.imageLoaded}
                      />
                    </div>

                    <RaisedButton style={raisedButtonStyle} primary={true} label="CROP" onClick={this.crop}/>
                    <RaisedButton style={raisedButtonStyle} primary={true} label="CLEAR" onClick={this.clear}/>
                   
                  </div>
                }
                {this.state.previewUrl && !this.state.image &&
                  <img src={this.state.previewUrl} />
                }


                <div>
            <RaisedButton style={raisedButtonStyle} label="EDIT" primary={true}>
              <input style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '0',
              bottom: '0',
              right: '0',
              left: '0',
              width: '100%',
              height: '100%',
              opacity: '0',
              zIndex: 2
              }} 
              accept=".png,.jpg" ref='file' type='file' onChange={this.onPictureSelection} />
            </RaisedButton>
            </div>









          </div>
          <div style={{float: 'right', width: '45%', height: '100%'}}>
            <div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.first_name && 
                  <div style={{textAlign: 'center', position: 'relative'}}>
                    <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('First Name')}</div>
                    <span>{personalDataOfWorkerCopy.first_name}</span>
                  </div>
                }
              </div>
              <div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.last_name && 
                  <div style={{textAlign: 'center', position: 'relative'}}>
                    <div style={{marginTop: '10px', textDecoration: 'underline'}}>{this.context.t('Last Name')}</div>
                    <span>{personalDataOfWorkerCopy.last_name}</span>
                  </div>
                }
              </div>
          </div>
        </form>

      </div>
    )
  }
}

PersonalDetailsComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

PersonalDetailsComponent = connect(null, actions)(
    connect(state => ({
      lang: state.i18nState.lang
    }))(PersonalDetailsComponent)
  )

function mapStateToProps(state) {
  return {
    personalDataOfWorker: state.main.personalDataOfWorker,
    allFormDatas: state.form
  };
}

PersonalDetailsComponent = reduxForm({
  form: 'personalDetails',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(PersonalDetailsComponent)

const selector = formValueSelector('personalDetails') // <-- same as form name
PersonalDetailsComponent = connect(
  state => {
    const pic_url = selector(state, 'pic_url')
    return {
      pic_url
    }
  }
)(PersonalDetailsComponent)

export default connect(mapStateToProps)(PersonalDetailsComponent)