export interface IGetETFDetails {
  getETF: {
    id: string;
    name: string;
    short: string;
    worth: number;
    deposited: number;
    transactions: Array<Transactions>;
    snapshots: Array<Snapshots>;
  };
}

interface Transactions {
  id: string;
  amount: number;
  createdAt: string;
}

interface Snapshots {
  id: string;
  value: number;
  createdAt: string;
}
