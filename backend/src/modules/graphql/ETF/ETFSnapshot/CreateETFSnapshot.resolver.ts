import { ETFSnapshot } from "../../../../entity/ETFSnapshot";
import { ETF } from "../../../../entity/ETF";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";
import { MyContext } from "../../../../types/MyContext";
import { LemonAPI } from "../../../Services/LemonAPI";

@Resolver(ETFSnapshot)
export class CreateETFSnapshotResolver {
  @Mutation(() => ETFSnapshot)
  @UseMiddleware(isAuth)
  async createETFSnapshot(
    @Arg("etfId") depotId: string,
    @Arg("date", { nullable: true, defaultValue: new Date() }) date: string,
    @Ctx() ctx: MyContext
  ): Promise<ETFSnapshot> {
    const user = ctx.res.locals.user;
    const etf = await ETF.findOneOrFail(
      { id: depotId, user },
      { relations: ["transactions"] }
    );
    const amount = etf.transactions.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    const etfQuote = await LemonAPI.lastQuotes(etf.isin);
    if (!etfQuote) {
      throw new Error(
        "Something went wrong while creating the ETFSnapshot (external API error"
      );
    }
    const etfSnapshot = new ETFSnapshot();
    etfSnapshot.value = amount * etfQuote.a;
    etfSnapshot.amount = amount;
    etfSnapshot.etf = etf;
    etfSnapshot.createdAt = new Date(date);
    etfSnapshot.user = user;

    await etfSnapshot.save();
    return etfSnapshot;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
