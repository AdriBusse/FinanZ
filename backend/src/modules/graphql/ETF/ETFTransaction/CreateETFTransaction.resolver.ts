import { ETFTransaction } from "../../../../entity/ETFTransaction";
import { ETF } from "../../../../entity/ETF";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../../types/MyContext";
import { isAuth } from "../../../middleware/isAuth";

@Resolver(ETFTransaction)
export class CreateETFTransactionResolver {
  @Mutation(() => ETFTransaction)
  @UseMiddleware(isAuth)
  async createETFTransaction(
    @Arg("etfId") depotId: string,
    @Arg("amount") amount: number,
    @Arg("date", { nullable: true, defaultValue: new Date() }) date: string,
    @Ctx() ctx: MyContext
  ): Promise<ETFTransaction> {
    const user = ctx.res.locals.user;
    const etf = await ETF.findOneOrFail({ id: depotId, user });
    const etfTransaction = new ETFTransaction();
    etfTransaction.amount = amount;
    etfTransaction.etf = etf;
    etfTransaction.createdAt = new Date(date);
    etfTransaction.user = user;

    await etfTransaction.save();
    return etfTransaction;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
