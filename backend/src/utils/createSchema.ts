import { UpdateExpenseCategoryResolver } from "../modules/graphql/Expense/Category/UpdateExpenseCategory.resolver";
import { GetExpensesResolver } from "../modules/graphql/Expense/Expense/GetExpenses.resolver";
import { UpdateExpenseTransactionResolver } from "../modules/graphql/Expense/Transaction/UpdateExpenseTransactions.resolver";
import { GetExpenseCategoriesResolver } from "../modules/graphql/Expense/Category/GetCategories.resolver";
import { DeleteExpenseCategoryResolver } from "../modules/graphql/Expense/Category/DeleteExpenseCategory.resolver";
import { CreateExpenseCategoryResolver } from "../modules/graphql/Expense/Category/CreateExpenseCategory.resolver";
import { ExpenseCategoryResolver } from "../modules/graphql/ClassResolver/ExpenseCategory.resolver";
import { CreateExpenseTransactionResolver } from "../modules/graphql/Expense/Transaction/CreateExpenseTransaction.resolver";
import { GetExpenseResolver } from "../modules/graphql/Expense/Expense/GetExpense.resolver";
import { DeleteExpenseResolver } from "../modules/graphql/Expense/Expense/DeleteExpense.resolver";
import { CreateExpenseResolver } from "../modules/graphql/Expense/Expense/CreateExpense.resolver";
import { ExpenseTransactionResolver } from "../modules/graphql/ClassResolver/ExpenseTransaction.resolver";
import { ExpenseResolver } from "../modules/graphql/ClassResolver/Expense.resolver";
import { MeResolver } from "../modules/graphql/User/me";
import { LogoutResolver } from "../modules/graphql/User/logout";
import { SignupResolver } from "../modules/graphql/User/signup";
import { LoginResolver } from "../modules/graphql/User/login";
import { GetUserResolver } from "../modules/graphql/User/getUser";
import { UserResolver } from "../modules/graphql/ClassResolver/User.resolver";
import { UpdateSavingTransactionResolver } from "../modules/graphql/Saving/Transaction/UpdateTransaction.resolver";
import { GetETFResolver } from "../modules/graphql/ETF/ETF/GetETF.resolver";
import { DeleteETFTransactionResolver } from "../modules/graphql/ETF/ETFTransaction/DeleteETFTransaction.resolver";
import { DeleteETFSnapshotResolver } from "../modules/graphql/ETF/ETFSnapshot/DeleteETFSnapshot.resolver";
import { DeleteETFResolver } from "../modules/graphql/ETF/ETF/DeleteETF.resolver";
import { ETFTransactionResolver } from "../modules/graphql/ClassResolver/ETFTransaction.resolver";
import { CreateETFTransactionResolver } from "../modules/graphql/ETF/ETFTransaction/CreateETFTransaction.resolver";
import { CreateETFSnapshotResolver } from "../modules/graphql/ETF/ETFSnapshot/CreateETFSnapshot.resolver";
import { GetETFsResolver } from "../modules/graphql/ETF/ETF/GetETFs.resolver";
import { CreateETFResolver } from "../modules/graphql/ETF/ETF/CreateETF.resolver";
import { ETFSnapshotResolver } from "../modules/graphql/ClassResolver/ETFSnapshot.resolver";
import { ETFResolver } from "../modules/graphql/ClassResolver/ETF.resolver";
import { DeleteSavingTransactionResolver } from "../modules/graphql/Saving/Transaction/DeleteSavingTransaction.resolver";
import { DeleteSavingDepotResolver } from "../modules/graphql/Saving/Depot/DeleteSavingDepot.resolver";
import { GetSavingDepotResolver } from "../modules/graphql/Saving/Depot/GetSavingDepot.resolver";
import { SavingTransactionResolver } from "../modules/graphql/ClassResolver/SavingTransaction.resolver";
import { SavingDepotResolver } from "../modules/graphql/ClassResolver/SavingDepot.resolver";
import { CreateSavingTransactionResolver } from "../modules/graphql/Saving/Transaction/CreateSavingTransaction.resolver";
import { CreateSavingDepotResolver } from "../modules/graphql/Saving/Depot/CreateSavingDepot.resolver";
import { GetSavingDepotsResolver } from "../modules/graphql/Saving/Depot/GetSavingDepots.resolver";
import { buildSchema } from "type-graphql";
import { DeleteExpenseTransactionResolver } from "../modules/graphql/Expense/Transaction/DeleteExpenseTransaction.resolver";

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
