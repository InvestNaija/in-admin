export const ValidationMessages  = {
  'fullName' : {
    'required': 'Full Name is required',
  },
  'MaidenName' : {
    'required': 'Mother\'s Maiden Name is required',
  },
  'City' : {
    'required': 'City is required',
  },
  'Country' : {
    'required': 'Country is required',
  },
  'Citizen' : {
    'required': 'Nationality is required',
  },
  'PostalCode' : {
    'required': 'Postal Code is required',
  }
};
export let FormErrors = {
  fullName: '',
  MaidenName: '',
  City: '',
  Country: '',
  Citizen: '',
  PostalCode: '',
};

export interface ICSCS {
  fullName: string,
  MaidenName: string,
  City: string,
  Country: string,
  Citizen: string
  PostalCode: string
}
