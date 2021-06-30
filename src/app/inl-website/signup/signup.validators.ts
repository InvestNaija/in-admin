export const ValidationMessages  = {
  'nin' : {
      'required': 'NIN is required',
  },
  'firstName' : {
      'required': 'First Name is required',
  },
  'lastName' : {
      'required': 'Surname is required',
  }
};
export let FormErrors = {
  nin: '',
  firstName: '',
  lastName: '',
};

export interface KYCDetail {
  nin: string,
  firstName: string,
  lastName: string,
}
