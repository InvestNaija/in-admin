export const ValidationMessages  = {
  'firstname' : {
    'required': 'First name is required',
  },
  'lastname' : {
    'required': 'Last name is required',
  },
  'email' : {
    'required': 'Email is required',
  },
  'phone' : {
    'required': 'Phone is required',
  },
  'dob' : {
    'required': 'Date of Birth is required',
  },
  'roles' : {
    'required': 'You must select at least one role',
  },
};
export let FormErrors = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  dob: '',
  roles: '',
};

export interface User {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  dob: string,
  roles: any
}
