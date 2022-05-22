import { UpdateExpenseCategoryResolver } from "./../modules/Expense/Category/UpdateExpenseCategory.resolver";
import { GetExpensesResolver } from "./../modules/Expense/Expense/GetExpenses.resolver";
import { UpdateExpenseTransactionResolver } from "./../modules/Expense/Transaction/UpdateExpenseTransactions.resolver";
import { GetExpenseCategoriesResolver } from "./../modules/Expense/Category/GetCategories.resolver";
import { DeleteExpenseCategoryResolver } from "./../modules/Expense/Category/DeleteExpenseCategory.resolver";
import { CreateExpenseCategoryResolver } from "./../modules/Expense/Category/CreateExpenseCategory.resolver";
import { ExpenseCategoryResolver } from "./../modules/ClassResolver/ExpenseCategory.resolver";
import { CreateExpenseTransactionResolver } from "./../modules/Expense/Transaction/CreateExpenseTransaction.resolver";
import { GetExpenseResolver } from "./../modules/Expense/Expense/GetExpense.resolver";
import { DeleteExpenseResolver } from "./../modules/Expense/Expense/DeleteExpense.resolver";
import { CreateExpenseResolver } from "./../modules/Expense/Expense/CreateExpense.resolver";
import { ExpenseTransactionResolver } from "./../modules/ClassResolver/ExpenseTransaction.resolver";
import { ExpenseResolver } from "./../modules/ClassResolver/Expense.resolver";
import { MeResolver } from "./../modules/User/me";
import { LogoutResolver } from "./../modules/User/logout";
import { SignupResolver } from "./../modules/User/signup";
import { LoginResolver } from "./../modules/User/login";
import { GetUserResolver } from "./../modules/User/getUser";
import { UserResolver } from "./../modules/ClassResolver/User.resolver";
import { UpdateSavingTransactionResolver } from "./../modules/Saving/Transaction/UpdateTransaction.resolver";
import { GetETFResolver } from "./../modules/ETF/ETF/GetETF.resolver";
import { DeleteETFTransactionResolver } from "./../modules/ETF/ETFTransaction/DeleteETFTransaction.resolver";
import { DeleteETFSnapshotResolver } from "./../modules/ETF/ETFSnapshot/DeleteETFSnapshot.resolver";
import { DeleteETFResolver } from "./../modules/ETF/ETF/DeleteETF.resolver";
import { ETFTransactionResolver } from "./../modules/ClassResolver/ETFTransaction.resolver";
import { CreateETFTransactionResolver } from "./../modules/ETF/ETFTransaction/CreateETFTransaction.resolver";
import { CreateETFSnapshotResolver } from "./../modules/ETF/ETFSnapshot/CreateETFSnapshot.resolver";
import { GetETFsResolver } from "./../modules/ETF/ETF/GetETFs.resolver";
import { CreateETFResolver } from "./../modules/ETF/ETF/CreateETF.resolver";
import { ETFSnapshotResolver } from "./../modules/ClassResolver/ETFSnapshot.resolver";
import { ETFResolver } from "./../modules/ClassResolver/ETF.resolver";
import { DeleteSavingTransactionResolver } from "./../modules/Saving/Transaction/DeleteSavingTransaction.resolver";
import { DeleteSavingDepotResolver } from "./../modules/Saving/Depot/DeleteSavingDepot.resolver";
import { GetSavingDepotResolver } from "./../modules/Saving/Depot/GetSavingDepot.resolver";
import { SavingTransactionResolver } from "./../modules/ClassResolver/SavingTransaction.resolver";
import { SavingDepotResolver } from "../modules/ClassResolver/SavingDepot.resolver";
import { CreateSavingTransactionResolver } from "../modules/Saving/Transaction/CreateSavingTransaction.resolver";
import { CreateSavingDepotResolver } from "../modules/Saving/Depot/CreateSavingDepot.resolver";
import { GetSavingDepotsResolver } from "../modules/Saving/Depot/GetSavingDepots.resolver";
import { buildSchema } from "type-graphql";
import { DeleteExpenseTransactionResolver } from "../modules/Expense/Transaction/DeleteExpenseTransaction.resolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [
      UserResolver,
      GetUserResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      SignupResolver,

      SavingDepotResolver,
      SavingTransactionResolver,
      GetSavingDepotsResolver,
      GetSavingDepotResolver,
      CreateSavingDepotResolver,
      DeleteSavingDepotResolver,
      CreateSavingTransactionResolver,
      DeleteSavingTransactionResolver,
      UpdateSavingTransactionResolver,

      ETFResolver,
      ETFSnapshotResolver,
      ETFTransactionResolver,
      CreateETFResolver,
      GetETFsResolver,
      GetETFResolver,
      CreateETFSnapshotResolver,
      CreateETFTransactionResolver,
      DeleteETFResolver,
      DeleteETFSnapshotResolver,
      DeleteETFTransactionResolver,

      ExpenseResolver,
      CreateExpenseResolver,
      DeleteExpenseResolver,
      GetExpenseResolver,
      GetExpensesResolver,

      ExpenseTransactionResolver,
      CreateExpenseTransactionResolver,
      DeleteExpenseTransactionResolver,
      UpdateExpenseTransactionResolver,

      ExpenseCategoryResolver,
      CreateExpenseCategoryResolver,
      DeleteExpenseCategoryResolver,
      GetExpenseCategoriesResolver,
      UpdateExpenseCategoryResolver,
    ],
  });
};
