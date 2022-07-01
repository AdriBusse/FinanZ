import { Expense } from "../../../../entity/Expense";
import { MyContext } from "../../../../types/MyContext";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";

@Resolver()
export class GetExpensesResolver {
  @Query(() => [Expense])
  @UseMiddleware(isAuth)
  async getExpenses(
    @Ctx() ctx: MyContext,
    @Arg("order", { defaultValue: "DESC" }) orderType: "ASC" | "DESC"
  ): Promise<Expense[]> {
    const user = ctx.res.locals.user;
    const order = orderType ? { ["createdAt"]: orderType } : {};

    const expenses = await Expense.find({ where: { user }, order });
    return expenses;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
