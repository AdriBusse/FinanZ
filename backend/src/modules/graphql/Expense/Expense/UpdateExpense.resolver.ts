import { Expense } from "./../../../../entity/Expense";
import { isAuth } from "../../../middleware/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../../types/MyContext";

@Resolver(Expense)
export class UpdateExpenseResolver {
  @Mutation(() => Expense)
  @UseMiddleware(isAuth)
  async updateExpense(
    @Arg("id", { nullable: false }) id: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("currency", { nullable: true }) currency: string,
    @Arg("archived", { nullable: true }) archived: boolean,
    @Ctx() ctx: MyContext
  ): Promise<Expense> {
    const user = ctx.res.locals.user;
    const expense = await Expense.findOne({
      id,
      user,
    });
    if (!expense) {
      throw new Error("Cannot find Expense!");
    }
    if (title) {
      expense.title = title;
    }
    if (currency) {
      expense.currency = currency;
    }
    if (archived) {
      expense.archived = archived;
    }

    await expense.save();
    return expense;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
