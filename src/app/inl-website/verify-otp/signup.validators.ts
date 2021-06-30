export const ValidationMessages  = {
  'email' : {
    'required': 'Email is required',
    'email': 'The email field must be a valid email',
  },
  'otp' : {
    'required': 'OTP is required',
    'minlength': 'The OTP field must be at least 6 characters',
  }
};
export let FormErrors = {
  email: '',
  otp: '',
};

export interface KYCDetail {
  email: string,
  otp: string,
}
