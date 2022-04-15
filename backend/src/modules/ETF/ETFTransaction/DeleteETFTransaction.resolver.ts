import { MyContext } from "./../../../types/MyContext";
import { ETFTransaction } from "./../../../entity/ETFTransaction";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middleware/isAuth";

@Resolver(ETFTransaction)
export class DeleteETFTransactionResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteETFTransaction(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const user = ctx.res.locals.user;
    const etfTransaction = await ETFTransaction.findOneOrFail({ id, user });

    if (!etfTransaction) {
      throw new Error("Transaction not found");
    }

    await etfTransaction.remove();
    return true;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
