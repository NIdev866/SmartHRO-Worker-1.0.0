import {SubmissionError} from 'redux-form'
import axios from 'axios'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'


function submit(values){

      delete values.emailCopy
      document.write(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)


	axios.post(`http://localhost:3000/jobseeker/signup`, values)
		.then(response => {
          //window.location.replace("/submittionSuccess");
	      })
	    .catch((err)=>{
        //window.location.replace("/submittionFailure");
	    })
}


export default submit