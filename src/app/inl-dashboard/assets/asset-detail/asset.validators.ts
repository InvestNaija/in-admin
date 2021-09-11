export const ValidationMessages  = {
  'type' : {
    'required': 'Please select asset type',
  },
  'name' : {
    'required': 'Asset name is required',
  },
  'anticipatedMinPrice' : {
    'required': 'Min Price is required',
  },
  'anticipatedMaxPrice' : {
    'required': 'Max Price is required',
  },
  'sharePrice' : {
    'required': 'Share price is required',
  },
  'availableShares' : {
    'required': 'Total Available Shares is required',
  },
  'minimumNoOfUnits' : {
    'required': 'Minimum Units is required',
  },
  'description' : {
    'required': 'Description is required',
  },
  'openingDate' : {
    'required': 'Opening Date is required',
  },
  'closingDate' : {
    'required': 'Closing Date is required',
  },
  'allocationDate' : {
    'required': 'Allocation Date is required',
  },
  'fundingDate' : {
    'required': 'Funding Date is required',
  },
  'image' : {
    'required': 'Asset image is required',
  },
  'currency' : {
    'required': 'Asset currency is required',
  },
  'subaccountId' : {
    'required': 'Sub Account ID is required',
  },
  'bankName' : {
    'required': 'Bank details are required',
  },
  'paymentLabel' : {
    'required': 'Payment label are required',
  },
  'subsequentMinAmount' : {
    'required': 'Subsequent Min Amount are required',
  },
};
export let FormErrors = {
  type: '',
  name: '',
  anticipatedMinPrice: '',
  anticipatedMaxPrice: '',
  sharePrice: '',
  availableShares: '',
  description: '',
  openingDate: '',
  closingDate: '',
  allocationDate: '',
  fundingDate: '',
  image: '',
  currency: '',
  subaccountId: '',
  minimumNoOfUnits: '',
  bankName: '',
  paymentLabel: '',
  subsequentMinAmount: '',
};

export interface Asset {
  type: string,
  name: string,
  anticipatedMinPrice: string,
  anticipatedMaxPrice: string,
  sharePrice: string,
  availableShares: string,
  minimumNoOfUnits: string,
  openForPurchase: string,
  description: string,
  openingDate: string,
  closingDate: string,
  allocationDate: string,
  fundingDate: string,
  maturityDate: string,
  image: string,
  currency: string,
  subaccountId: string,
  bankName: string,
  paymentLabel: string,
  paymentLogo: string
  subsequentMinAmount: string
}
