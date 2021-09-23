export const ValidationMessages  = {
  'firstName' : {
      'required': 'Firstname is required',
  },
  'lastName' : {
      'required': 'Lastname is required',
  },
  'gender' : {
      'required': 'Gender is required',
  },
  'phone' : {
      'required': 'Phone is required',
  },
  'dob' : {
      'required': 'Date of Birt is required',
  },
  'email' : {
      'required': 'Email is required',
      'email': 'The email field must be a valid email',
  },
  'bvn' : {
      'required': 'BVN is required',
  },
  'mothersMaidenName' : {
      'required': 'Mother Maiden Name is required',
  },
  'placeOfBirth' : {
      'required': 'Place Of Birth is required',
  },
  'password' : {
    'required': 'Password is required',
    'minlength': 'Must be minimum of 6 characters',
    'oneDigit': 'Must contain one digit',
    'oneLowerCase': 'Must contain one lowercase letter',
    'oneUpperCase': 'Must contain one uppercase letter',
  },
  'confirmPassword' : {
    'required': 'Confirm Password is required',
    'mustMatch': 'Password  and Confirm passord fields do not match',
  },
  'accept' : {
      'requiredTrue': 'Accept terms and conditions to proceed',
  },
};
export let FormErrors = {
  firstName: '',
  lastName: '',
  middleName: '',
  gender: '',
  phone: '',
  dob: '',
  email: '',
  bvn: '', mothersMaidenName: '', placeOfBirth: '',
  address: '',
  signature: '',
  password: '',
  confirmPassword: '',
  accept: ''
};

export interface Customer {
  firstName: string,
  lastName: string,
  middleName: string,
  gender: string,
  phone: string,
  dob: string,
  residence: {
    address1: string,
    lga: string,
    state: string
  },
  residentialAddress: string,
  address: string,
  email: string,
  photo: string,
  nin: number,
  bvn: number, mothersMaidenName: string, placeOfBirth: string,
  signature: string,
  zanibalId: string
}
