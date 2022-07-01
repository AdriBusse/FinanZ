import { isAuth } from "../../../middleware/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../../types/MyContext";
import { ExpenseCategory } from "../../../../entity/ExpenseCategory";

@Resolver(ExpenseCategory)
export class UpdateExpenseCategoryResolver {
  @Mutation(() => ExpenseCategory)
  @UseMiddleware(isAuth)
  async updateExpenseCategory(
    @Arg("catId", { nullable: false }) catId: string,
    @Arg("name", { nullable: true }) name: string,
    @Ctx() ctx: MyContext
  ): Promise<ExpenseCategory> {
    const user = ctx.res.locals.user;
    const cat = await ExpenseCategory.findOne({
      id: catId,
      user,
    });
    if (!cat) {
      throw new Error("Cannot find Category!");
    }
    if (name) {
      cat.name = name;
    }

    await cat.save();
    return cat;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
