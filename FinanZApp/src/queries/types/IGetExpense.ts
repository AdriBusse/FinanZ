export interface IGetExpense {
  getExpense: IExpense;
}

interface IExpense {
  id: string;
  title: string;
  sum: number;
  transactions: ITransactions[];
  ExpenseByCategory: IExpenseByCategory[];
}

interface ITransactions {
  id: string;
  describtion: string;
  amount: number;
  createdAt: string;
}
interface IExpenseByCategory {
  name: string;
  amount: number;
}
