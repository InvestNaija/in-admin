export const ValidationMessages  = {
  'oldPassword' : {
    'required': 'Password is required',
    'minlength': 'Old Password must be at least 6 characters',
  },
  'newPassword' : {
      'required': 'Password is required',
      'minlength': 'New Password must be at least 6 characters',
  },
  'confirmNewPassword' : {
      'required': 'Confirm Password is required',
      'minlength': 'Confirm Password must be at least 6 characters',
      'mustMatch': 'Password  and Confirm passord fields do not match',
  }
};
export let FormErrors = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export interface User {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}
