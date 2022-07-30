import { Expense } from "../../../../entity/Expense";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";
import { MyContext } from "../../../../types/MyContext";

@Resolver(Expense)
export class CreateExpenseResolver {
  @Mutation(() => Expense)
  @UseMiddleware(isAuth)
  async createExpense(
    @Arg("title") title: string,
    @Arg("currency", { nullable: true }) currency: string,
    @Ctx() ctx: MyContext
  ): Promise<Expense> {
    const user = ctx.res.locals.user;

    const expense = new Expense();
    expense.title = title;
    expense.currency = currency;
    expense.user = user;

    await expense.save();
    return expense;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
