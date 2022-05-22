import { Expense } from "./../../entity/Expense";
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
} from "../../utils/compareTransaction";
import { User } from "../../entity/User";
import { ExpenseTransaction } from "../../entity/ExpenseTransaction";

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
}
