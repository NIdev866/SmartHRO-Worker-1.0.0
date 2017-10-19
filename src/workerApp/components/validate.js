const validate = values => {
  const errors = {}


  if (values.NI_number) {
    console.log('ninumerror')
    if(!/[A-Z]/g.test(values.NI_number.substring(0,1)) && values.NI_number.substring(0,1) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[A-Z]/g.test(values.NI_number.substring(1,2)) && values.NI_number.substring(1,2) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(2,3)) && values.NI_number.substring(2,3) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(3,4)) && values.NI_number.substring(3,4) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(4,5)) && values.NI_number.substring(4,5) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(5,6)) && values.NI_number.substring(5,6) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(6,7)) && values.NI_number.substring(6,7) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[0-9]/g.test(values.NI_number.substring(7,8)) && values.NI_number.substring(7,8) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if(!/[A-Z]/g.test(values.NI_number.substring(8,9)) && values.NI_number.substring(8,9) !== ''){
      errors.NI_number = 'Invalid NI number'
    }
    else if (values.NI_number.length !== 9) {
      errors.NI_number = 'Full NI number required'
    }
  }

  if (!values.sort_code) {
    errors.sort_code = 'Full sortcode required'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(0,1)) && values.sort_code.substring(0,1) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(1,2)) && values.sort_code.substring(1,2) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(2,3)) && values.sort_code.substring(2,3) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(3,4)) && values.sort_code.substring(3,4) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(4,5)) && values.sort_code.substring(4,5) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if(!/[0-9]/g.test(values.sort_code.substring(5,6)) && values.sort_code.substring(5,6) !== ''){
    errors.sort_code = 'Invalid sortcode'
  }
  else if (values.sort_code.length !== 6) {
    errors.sort_code = 'Full sortcode required'
  }





  if (!values.address_road1) {
    errors.address_road1 = 'Address line 1 required'
  }
  else if (values.address_road1.length > 25) {
    errors.address_road1 = 'Address line too long'
  }
  else if (values.address_road1.match(/[0-9]/g)){
    errors.address_road1 = 'Invalid Address'
  }

  if (values.address_road2 && values.address_road2.length > 25) {
    errors.address_road2 = 'Address line too long'
  }
  else if (values.address_road2 && values.address_road2.match(/[0-9]/g)){
    errors.address_road2 = 'Invalid Address'
  }

  if (values.address_road3 && values.address_road3.length > 25) {
    errors.address_road3 = 'Address line too long'
  }
  else if (values.address_road3 && values.address_road3.match(/[0-9]/g)){
    errors.address_road3 = 'Invalid Address'
  }

  if (values.town && values.town.length > 15) {
    errors.town = 'Address line too long'
  }
  else if (values.town && values.town.match(/[0-9]/g)){
    errors.town = 'Invalid Address'
  }

  if (values.county && values.county.length > 15) {
    errors.county = 'Address line too long'
  }
  else if (values.county && values.county.match(/[0-9]/g)){
    errors.county = 'Invalid Address'
  }

  if (!values.postal_code) {
    errors.postal_code = 'Postal code required'
  }
  else if (values.postal_code.length < 5 || values.postal_code.length > 7) {
    errors.postal_code = 'Invalid postcode length'
  }

  if (!values.house_or_flat) {
    errors.house_or_flat = 'House or flat required'
  }
  if (!values.house_no) {
    errors.house_no = 'House number required'
  }
  else if (values.house_no.length < 1 || values.house_no.length > 5) {
    errors.house_no = 'House number too long'
  }

  if (!values.flat_no) {
    errors.flat_no = 'Flat number required'
  }
  else if (values.flat_no.length < 1 || values.flat_no.length > 5) {
    errors.flat_no = 'Flat number too long'
  }






  if(!values.acc_no){
    errors.acc_no = 'Bank account number required'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(0,1)) && values.acc_no.substring(0,1) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(1,2)) && values.acc_no.substring(1,2) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(2,3)) && values.acc_no.substring(2,3) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(3,4)) && values.acc_no.substring(3,4) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(4,5)) && values.acc_no.substring(4,5) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(5,6)) && values.acc_no.substring(5,6) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(5,6)) && values.acc_no.substring(6,7) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(!/[0-9]/g.test(values.acc_no.substring(5,6)) && values.acc_no.substring(7,8) !== ''){
    errors.acc_no = 'Invalid bank account number'
  }
  else if(values.acc_no.length !== 8){
    errors.acc_no = 'Bank account number required'
  }



  if (!values.dob) {
    errors.dob = 'Birth date required'
  }













/*  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }else if(formProps.email.length > 30) {
    errors.email = 'Input too long'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }*/

  return errors
}

export default validate
