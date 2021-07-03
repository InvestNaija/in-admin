export const ValidationMessages  = {
  'email' : {
    'required': 'Email is required',
    'pattern': 'The email field must be a valid email',
  },
  'password' : {
    'required': 'Password is required',
    'minlength': 'Must be minimum of 6 characters',
    'oneDigit': 'Must contain one digit',
    'oneLowerCase': 'Must contain one lowercase letter',
    'oneUpperCase': 'Must contain one uppercase letter',
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
