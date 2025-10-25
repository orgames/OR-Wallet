export type Currency = {
  code: string;
  name: string;
  symbol: string;
  balance: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  type: 'sent' | 'received' | 'conversion' | 'deposit';
  status: 'Completed' | 'Pending' | 'Failed';
};

const BtcIcon = (props: React.ComponentProps<'svg'>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.23 10.32a4.34 4.34 0 0 0-.82-1.92V6.2h-2.1v2.12a4.4 4.4 0 0 0-1.2.5l-.48-.48L10.2 7l-2.7 2.7.48.48a4.34 4.34 0 0 0-.5 1.14H5.4v2.1h2.1a4.34 4.34 0 0 0 0 2.28H5.4v2.1h2.1a4.34 4.34 0 0 0 .5 1.14l-.48.48L10.2 19l2.7-2.7-.48-.48a4.4 4.4 0 0 0 1.2-.5v2.12h2.1v-2.2a4.34 4.34 0 0 0 .82-1.92h2.1v-2.1h-2.1a4.34 4.34 0 0 0 0-2.28h2.1v-2.1h-2.1ZM12 15.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z"/></svg>
);

const EthIcon = (props: React.ComponentProps<'svg'>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM12 17.5l-6.25-3.75L12 22.25l6.25-8.5L12 17.5z"/></svg>
);

const UsdIcon = (props: React.ComponentProps<'svg'>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15,11H12V9h3M15,13H12v2h3M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" /></svg>
);

const EurIcon = (props: React.ComponentProps<'svg'>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15,15.5C15,18.5 12.5,21 9.5,21C6,21 4,18 4,18V16.5H6V18C6,18 7.5,19.5 9.5,19.5C11.5,19.5 13,18 13,15.5C13,13.5 12,12.5 10,12V11.5C12,11 13,10 13,8C13,6 11,4.5 9,4.5C7.5,4.5 6,5.5 6,5.5V7H4V6C4,6 5.5,3 9,3C12,3 15,5 15,8C15,10.5 13.5,11.5 12,12.5C13,13.5 15,14 15,15.5M20,6H18V17H20V6Z" /></svg>
);

export const InrIcon = (props: React.ComponentProps<'svg'>) => (
    <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 20v-16"></path><path d="M17 5v14"></path><path d="M7 12h10"></path></svg>
);

export const OraIcon = (props: React.ComponentProps<'svg'>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
);


export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', balance: 0, icon: UsdIcon },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', balance: 0, icon: BtcIcon },
  { code: 'EUR', name: 'Euro', symbol: '€', balance: 0, icon: EurIcon },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', balance: 0, icon: EthIcon },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', balance: 0, icon: InrIcon },
  { code: 'ORA', name: 'ORA Coin', symbol: 'ORA', balance: 0, icon: OraIcon },
];

export const transactions: Transaction[] = [];

export const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com'
};
