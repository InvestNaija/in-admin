export const ValidationMessages  = {
  'type' : {
    'required': 'Email is required',
  },
  'sharePrice' : {
    'required': 'OTP is required',
  },
  'units' : {
    'required': 'OTP is required',
  },
  'amount' : {
    'required': 'OTP is required',
  }
};
export let FormErrors = {
  type: '',
  sharePrice: '',
  units: '',
  amount: '',
};

export interface IExpression {
  type: string,
  sharePrice: number,
  units: number,
  amount: number,
}
