export interface IGetExpense {
  getExpense: IExpense;
}

interface IExpense {
  id: string;
  title: string;
  sum: number;
  createdAt: string;
  transactions: ITransactions[];
  ExpenseByCategory: IExpenseByCategory[];
}

interface ITransactions {
  id: string;
  describtion: string;
  amount: number;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}
interface IExpenseByCategory {
  name: string;
  amount: number;
}
