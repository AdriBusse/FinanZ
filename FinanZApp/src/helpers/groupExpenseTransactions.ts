import {ITransactions} from './../queries/types/IGetExpense';

export const groupExpenseTransactions = (
  transactions: ITransactions[],
): {title: string; data: ITransactions[]}[] => {
  let result: {[key: string]: {title: string; data: ITransactions[]}} = {};
  transactions.forEach(transaction => {
    if (result[transaction.createdAt]) {
      result[transaction.createdAt].data.push(transaction);
    } else {
      result[transaction.createdAt] = {
        title: transaction.createdAt,
        data: [transaction],
      };
    }
  });
  const parsedarray = Object.keys(result).map(key => {
    return result[key];
  });

  return parsedarray;
};
