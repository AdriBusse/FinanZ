import { Expense } from "../../../entity/Expense";
import {
  Arg,
  FieldResolver,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import {
  compareTransactionASC,
  compareTransactionDESC,
} from "../../../utils/compareTransaction";
import { User } from "../../../entity/User";
import { ExpenseTransaction } from "../../../entity/ExpenseTransaction";
import ExpenseByCategory from "src/entity/gql/ExpenseByCategory";

@Resolver(() => Expense)
export class ExpenseResolver implements ResolverInterface<Expense> {
  @FieldResolver()
  async transactions(
    @Root() expense: Expense,
    @Arg("order", { defaultValue: "DESC" }) order: "DESC" | "ASC"
  ): Promise<ExpenseTransaction[]> {
    const expenseTransactions = await ExpenseTransaction.find({
      where: { expense },
    });

    if (order === "DESC") {
      return expenseTransactions.sort(compareTransactionDESC);
    }

    return expenseTransactions.sort(compareTransactionASC);
  }
  @FieldResolver()
  async user(@Root() expense: Expense): Promise<User> {
    const expenseRec = await Expense.findOneOrFail(
      { id: expense.id },
      { relations: ["user"] }
    );

    return expenseRec.user;
  }

  @FieldResolver()
  async sum(@Root() expense: Expense): Promise<number> {
    let sum = 0;

    const expenseTransactions = await ExpenseTransaction.find({
      where: { expense },
    });

    expenseTransactions.forEach((expenseTransaction) => {
      sum += expenseTransaction.amount;
    });

    return sum;
  }

  @FieldResolver()
  async expenseByCategory(
    @Root() expense: Expense
  ): Promise<ExpenseByCategory[]> {
    const exp = await Expense.findOneOrFail(expense.id, {
      relations: ["transactions", "transactions.category"],
    });

    let byCategory: any = {
      default: 0,
    };
    console.log(exp.transactions);

    exp.transactions.forEach((transaction) => {
      if (transaction.category === null) {
        //Wenn keine Kategorie vorhanden ist, dann zu Default
        byCategory.default += transaction.amount;
      } else {
        if (byCategory[transaction.category.name]) {
          // wenn es den eintrag schon gibt dann zu den einträgen hinzufügen
          byCategory[transaction.category.name] += transaction.amount;
        } else {
          // wenn es den eintrag noch nicht gibt dann eintrag erstellen
          byCategory[transaction.category.name] = transaction.amount;
        }
      }
    });

    let byCategoryArray: ExpenseByCategory[] = [];
    Object.keys(byCategory).forEach((key) => {
      byCategoryArray.push({
        name: key,
        amount: byCategory[key],
      });
    });
    return byCategoryArray;
  }
}
