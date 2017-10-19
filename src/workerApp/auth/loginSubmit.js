// import {SubmissionError} from 'redux-form'
// import axios from 'axios'
// import React, { Component } from 'react'
// import { Route, Redirect } from 'react-router'
// import { authUser } from '../../actions';
// import { connect } from 'react-redux'
//
// const ROOT_URL = 'http://localhost:3000';
//
// function submit({ email, password }){
//
//     axios.post(`${ROOT_URL}/worker/login`, { email, password })
//       .then(response => {
//         this.props.authUser();
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('worker_id', response.data.id);
//       })
//       .catch((err) => {
//         //dispatch(authError('Bad Sign-in Information'));
//         console.log(err)
//       });
// }
//
//
// export default connect(null, { authUser })(submit)
