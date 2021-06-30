export const ValidationMessages  = {
  'email' : {
    'required': 'Email is required',
    'email': 'The email field must be a valid email',
  },
  'password' : {
      'required': 'Password is required',
  }
};
export let FormErrors = {
  email: '',
  password: '',
};

export interface User {
  email: string,
  password: string,
}
