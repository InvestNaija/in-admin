export const ValidationMessages  = {
  'facebook' : {
    'pattern': 'Pattern does not match a URL',
  },
  'linkedIn' : {
    'pattern': 'Pattern does not match a URL',
  },
  'twitter' : {
    'pattern': 'Pattern does not match a URL',
  },
  'website' : {
    'pattern': 'Pattern does not match a URL',
  },
  'youtube' : {
    'pattern': 'Pattern does not match a URL',
  },
};
export let FormErrors = {
  facebook: '',
  linkedIn: '',
  twitter: '',
  website: '',
  youtube: '',
};

export interface Social {
  facebook: string,
  linkedIn: string,
  twitter: string,
  website: string,
  youtube: string,
}
