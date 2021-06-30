export const ValidationMessages  = {
  'firstName' : {
    'required': 'Password is required',
  },
  'lastName' : {
    'required': 'Password is required',
  },
  'country' : {
    'required': 'Password is required',
  },
  'email' : {
    'required': 'Password is required',
  },
  'dob' : {
    'required': 'Password is required',
  },
  'phone' : {
    'required': 'Password is required',
  },
};
export let FormErrors = {
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  dob: '',
  phone: '',
};

export interface Social {
  firstName: string,
  lastName: string,
  country: string,
  email: string,
  dob: string,
  phone: string,
}
