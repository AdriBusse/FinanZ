import { Expense } from "./../../../entity/Expense";
import { MyContext } from "./../../../types/MyContext";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class GetExpensesResolver {
  @Query(() => [Expense])
  @UseMiddleware(isAuth)
  async getExpenses(@Ctx() ctx: MyContext): Promise<Expense[]> {
    const user = ctx.res.locals.user;
    const expenses = await Expense.find({ user });
    return expenses;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
