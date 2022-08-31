import { ExpenseCategory } from "../../../../entity/ExpenseCategory";
import { ExpenseTransaction } from "../../../../entity/ExpenseTransaction";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";
import { MyContext } from "../../../../types/MyContext";
import { Expense } from "../../../../entity/Expense";

@Resolver(ExpenseTransaction)
export class CreateExpenseTransactionResolver {
  @Mutation(() => ExpenseTransaction)
  @UseMiddleware(isAuth)
  async createExpenseTransaction(
    @Arg("describtion") describtion: string,
    @Arg("amount") amount: number,
    @Arg("expenseId") expenseId: string,
    @Arg("categoryId", { nullable: true }) categoryId: string,
    @Arg("date", { nullable: true }) date: number,
    @Ctx() ctx: MyContext
  ): Promise<ExpenseTransaction> {
    const user = ctx.res.locals.user;

    const expense = await Expense.findOne({ id: expenseId, user });
    if (!expense) {
      throw new Error("Cannot find Expense!");
    }
    const newTransaction = new ExpenseTransaction();

    if (categoryId) {
      const cat = await ExpenseCategory.findOne({ id: categoryId, user });
      if (cat) {
        newTransaction.category = cat;
      }
    }

    newTransaction.describtion = describtion;
    newTransaction.amount = amount;
    newTransaction.expense = expense;
    newTransaction.createdAt = date ? new Date(date) : new Date();

    newTransaction.user = user;

    await newTransaction.save();
    return newTransaction;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
