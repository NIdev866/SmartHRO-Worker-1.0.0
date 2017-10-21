import React, { Component, PropTypes } from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class Nav extends Component{

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


  render(){
    return(
      <div style={{height: "45px", width: "100%", backgroundColor: "rgb(0,188,212)", boxShadow: "0px 0px 7px 1px #CCCCCC"}}>
        <div style={{position: 'relative', margin: "0 auto", maxWidth: "800px", width: "100%", height: "45px"}}>
{/*          <div style={{fontSize: "14px", float: "left", display: "inline-block", width: "170px", height: "39px"}}>
            <div style={{position: "relative", borderLeft: "1px solid rgb(202,202,202)", borderRight: "1px solid rgb(202,202,202)", marginTop: "2px", display: "inline-block", width: "49%", height: "39px"}}>
              <div style={{position: "absolute", paddingTop: "13px", textAlign: "center", width:"100%"}}>
                <NavLink style={{textDecoration: "none", color: "black"}} to="/:worker_id/progress" activeStyle={{color: "#00BCD4", textDecoration: "none"}}>{this.context.t('PROGRESS')}</NavLink>
              </div>
            </div>
            <div style={{position: "relative", borderRight: "1px solid rgb(202,202,202)", marginTop: "2px", display: "inline-block", width: "49%", height: "39px"}}>
              <div style={{position: "absolute", paddingTop: "13px", textAlign: "center", width:"100%"}}>
                <NavLink style={{textDecoration: "none", color: "black"}} to="/:worker_id/jobs" activeStyle={{color: "#00BCD4", textDecoration: "none"}}>{this.context.t('JOBS')}</NavLink>
              </div>
            </div>
          </div>*/}


          <div style={{width: "190px", height: '100%'}}>
            <div style={{width: "70%", height: "100%", display: 'inline-block', verticalAlign: 'top', marginTop: '13px'}}>
              <NavLink style={{textDecoration: "none", color: "white"}} to="/:worker_id/myprofile">{this.context.t('MY PROFILE')}</NavLink>
            </div>
            <div style={{width: "50px", height: "100%", display: 'inline-block'}}>

              <SelectField labelStyle={{color: 'white'}} selectedMenuItemStyle={{color: 'rgb(0,188,212)'}} autoWidth={true} underlineStyle={{display: 'none'}} style={{width: '50px', marginTop: '-3px', left: '30px'}} value={this.props.lang} onChange={this.props.onChangeLang}>
                {this.props.languages.map(lang => <MenuItem value={lang} primaryText={lang} />)}
              </SelectField>

            </div>
          </div>

          {this.state.width > 600 ? 
            <div style={{color: 'white', paddingTop: '13px', top: 0, right: '15px', position: 'absolute'}}>{this.context.t('TEAM SUPPORTER WORKER APP')}</div>
            :
            <div style={{color: 'white', paddingTop: '13px', top: 0, right: '15px', position: 'absolute'}}>{this.context.t('WORKER APP')}</div>

          }

{/*          <div style={{fontSize: "14px", float: "right", display: "inline-block", width: "120px", height: "39px"}}>
            <div style={{position: "relative", marginTop: "2px", display: "inline-block", width: "49%", height: "39px"}}>
              <div style={{position: "absolute", paddingTop: "13px", textAlign: "center", width:"100%"}}>
                <NavLink style={{textDecoration: "none", color: "black"}} to="/:worker_id/jobs" activeStyle={{color: "#00BCD4", textDecoration: "none"}}>{this.context.t('JOBS')}</NavLink>
              </div>
            </div>

          <div style={{width: "50px", height: "50px", backgroundColor: 'red', display: 'inline-block', marginTop: '30px'}}>

          </div>

            <div style={{position: "relative", borderLeft: "1px solid rgb(202,202,202)", borderRight: "1px solid rgb(202,202,202)", marginTop: "2px", display: "inline-block", width: "60%", height: "39px"}}>
              <div style={{position: "absolute", paddingTop: "13px", textAlign: "center", width:"100%"}}>
                <NavLink style={{textDecoration: "none", color: "black"}} to="/logout" activeStyle={{color: "#00BCD4", textDecoration: "none"}}>LOGOUT</NavLink>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    )
  }
}

Nav.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(null, null)(
  connect(state => ({
    lang: state.i18nState.lang
  }))(Nav)
);
