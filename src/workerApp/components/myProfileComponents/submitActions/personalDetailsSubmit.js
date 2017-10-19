import {SubmissionError} from 'redux-form'
import axios from 'axios'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'


function AddressSubmit(values){

  console.log(values)

  const worker_id = localStorage.getItem('worker_id');

  axios.put(`http://ec2-54-77-236-165.eu-west-1.compute.amazonaws.com:3000/worker/add-personaltaxdata/${worker_id}`, values)
}


export default AddressSubmit
